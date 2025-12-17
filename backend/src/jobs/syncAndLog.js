import "dotenv/config";
import { pool } from "../db/pool.js";
import { getAuthTokenWithPassword } from "../cbw/auth.js";
import { getDevices } from "../cbw/devices.js";
import { getDeviceDataLogText } from "../cbw/deviceLog.js";
import { replaceDevices, upsertDeviceLogLatest } from "../db/cbwRepo.js";

async function main() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Daily job: get fresh token
    const token = await getAuthTokenWithPassword({
      baseUrl: process.env.CBW_BASE_URL,
      username: process.env.CBW_USERNAME,
      password: process.env.CBW_PASSWORD,
    });

    const accountId = Number(process.env.CBW_ACCOUNT_ID || token.account_id);

    // 1) Get device list
    const devices = await getDevices({
      baseUrl: process.env.CBW_BASE_URL,
      accountId,
      accessToken: token.access_token,
    });

    // Refresh devices table
    await replaceDevices(client, devices);

    // 2) Fetch and store device logs (.txt)
    for (const d of devices) {
      const logText = await getDeviceDataLogText({
        baseUrl: process.env.CBW_BASE_URL,
        accountId: d.account_id,
        deviceId: d.device_id,
        accessToken: token.access_token,
      });

      await upsertDeviceLogLatest(client, {
        device_id: d.device_id,
        account_id: d.account_id,
        log_text: logText,
      });
    }

    await client.query("COMMIT");
    console.log(`CBW sync complete: ${devices.length} devices`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err?.response?.data || err);
    process.exitCode = 1;
  } finally {
    client.release();
  }
}

main();

import "dotenv/config";
import { pool } from "../db/pool.js";
import { getAuthTokenWithPassword } from "../cbw/auth.js";
import { getDeviceDataLogText } from "../cbw/deviceLog.js";
import { extractHeaderLine } from "../cbw/parseLogText.js";
import { upsertDeviceLogRaw } from "../db/cbwRepo.js";

const TEST_DEVICE_ID = Number(process.env.CBW_TEST_DEVICE_ID); 

async function main() {
  if (!TEST_DEVICE_ID) {
    throw new Error("Missing env var: CBW_TEST_DEVICE_ID");
  }

  const client = await pool.connect();
  try {
    // 1) Get token
    const token = await getAuthTokenWithPassword({
      baseUrl: process.env.CBW_BASE_URL,
      username: process.env.CBW_USERNAME,
      password: process.env.CBW_PASSWORD,
    });

    const accountId = Number(process.env.CBW_ACCOUNT_ID || token.account_id);

    // 2) Fetch raw log text (.txt)
    const rawText = await getDeviceDataLogText({
      baseUrl: process.env.CBW_BASE_URL,
      accountId,
      deviceId: TEST_DEVICE_ID,
      accessToken: token.access_token,
    });

    // 3) Extract header line
    const headerLine = extractHeaderLine(rawText);
    if (!headerLine) throw new Error("Header line not found in rawText");

    // 4) Upsert into DB
    await client.query("BEGIN");
    await upsertDeviceLogRaw(client, {
      device_id: TEST_DEVICE_ID,
      account_id: accountId,
      header_line: headerLine,
      raw_text: rawText,
    });
    await client.query("COMMIT");

    // 5) Verify in DB
    const { rows } = await client.query(
      `SELECT device_id, account_id, length(raw_text) AS raw_len, updated_at
       FROM public.cbw_device_logs_raw
       WHERE device_id = $1`,
      [TEST_DEVICE_ID]
    );

    console.log("✅ Inserted/Updated cbw_device_logs_raw:");
    console.log(rows[0]);
    console.log("\n✅ Header line:");
    console.log(headerLine);
  } catch (err) {
    try { await client.query("ROLLBACK"); } catch {}
    console.error(err?.response?.data || err);
    process.exitCode = 1;
  } finally {
    client.release();
  }
}

main();

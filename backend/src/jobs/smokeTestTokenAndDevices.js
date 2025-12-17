import "dotenv/config";
import { pool } from "../db/pool.js";
import { getAuthTokenWithPassword } from "../cbw/auth.js";
import { getDevices } from "../cbw/devices.js";
import { upsertToken, replaceDevices } from "../db/cbwRepo.js";


async function main() {
  const client = await pool.connect();
  const info = await client.query(`
    select
        current_database() as db,
        current_user as usr,
        inet_server_addr() as server_ip,
        inet_server_port() as server_port;
    `);
    console.log("DB INFO:", info.rows[0]);

    const tbl = await client.query(`
    select table_schema, table_name
    from information_schema.tables
    where table_schema='public' and table_name='cbw_auth_tokens';
    `);
    console.log("HAS cbw_auth_tokens?", tbl.rows);


  try {
    console.log("1) Requesting auth token...");
    const token = await getAuthTokenWithPassword({
      baseUrl: process.env.CBW_BASE_URL,
      username: process.env.CBW_USERNAME,
      password: process.env.CBW_PASSWORD,
    });

    console.log("   ✅ got token. expires_at =", token.expires_at, "account_id =", token.account_id);

    console.log("2) Saving token to Postgres (public.cbw_auth_tokens)...");
    await upsertToken(client, token);
    console.log("   ✅ token saved.");

    console.log("3) Fetching devices...");
    const accountId = Number(process.env.CBW_ACCOUNT_ID || token.account_id);

    const devices = await getDevices({
      baseUrl: process.env.CBW_BASE_URL,
      accountId,
      accessToken: token.access_token,
    });

    console.log(`   ✅ fetched ${devices.length} devices from API.`);

    console.log("4) Refreshing public.cbw_devices...");
    await client.query("BEGIN");
    await replaceDevices(client, devices);
    await client.query("COMMIT");
    console.log("   ✅ devices saved.");

    console.log("5) Verifying DB counts...");
    const t = await client.query("SELECT account_id, expires_at, updated_at FROM public.cbw_auth_tokens WHERE id=1");
    const d = await client.query("SELECT COUNT(*)::int AS count FROM public.cbw_devices");
    console.log("   Tokens row:", t.rows[0]);
    console.log("   Devices count:", d.rows[0].count);

    // show a few devices
    const sample = await client.query(`
      SELECT device_id, account_id, serial_number, modelnumber_id, connected, updated_at
      FROM public.cbw_devices
      ORDER BY device_id
      LIMIT 5
    `);
    console.log("   Sample devices:", sample.rows);

    console.log("\n✅ Smoke test passed.");
  } catch (err) {
    try { await client.query("ROLLBACK"); } catch {}
    console.error("\n❌ Smoke test failed:");
    console.error(err?.response?.data || err);
    process.exitCode = 1;
  } finally {
    client.release();
  }
}

main();

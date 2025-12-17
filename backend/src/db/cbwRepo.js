/**
 * CBW Repository
 */

/**
 * Save or update the single auth token row
 */
export async function upsertToken(client, token) {
  await client.query(
    `
    INSERT INTO public.cbw_auth_tokens
      (id, account_id, username, account_name, access_token, refresh_token, expires_in, expires_at)
    VALUES
      (1, $1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO UPDATE SET
      account_id    = EXCLUDED.account_id,
      username      = EXCLUDED.username,
      account_name  = EXCLUDED.account_name,
      access_token  = EXCLUDED.access_token,
      refresh_token = EXCLUDED.refresh_token,
      expires_in    = EXCLUDED.expires_in,
      expires_at    = EXCLUDED.expires_at
    `,
    [
      token.account_id,
      token.username ?? null,
      token.account_name ?? null,
      token.access_token,
      token.refresh_token,
      token.expires_in,
      token.expires_at,
    ]
  );
}


/**
 * Replace ALL devices (Get Devices API)
 * This table is fully refreshed each daily run
 */
export async function replaceDevices(client, devices) {
  await client.query("TRUNCATE TABLE public.cbw_devices");

  for (const d of devices) {
    await client.query(
      `
      INSERT INTO public.cbw_devices
        (device_id, account_id, serial_number, modelnumber_id, connected)
      VALUES
        ($1, $2, $3, $4, $5)
      `,
      [
        d.device_id,
        d.account_id,
        d.serial_number ?? null,
        d.modelnumber_id ?? null,
        d.connected ?? null,
      ]
    );
  }
}

/**
 * Insert parsed device log rows (time-series data)
 * Called AFTER parsing the .txt CSV
 */
export async function insertDeviceLogs(client, deviceId, accountId, rows) {
  if (!rows || rows.length === 0) return;

  const sql = `
    INSERT INTO public.cbw_device_log
      (device_id, account_id, datetime_utc, log_date, log_time,
       vin_v, set_temp_f, kw, kwh_import, frequency_hz)
    VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    ON CONFLICT DO NOTHING
  `;

  for (const r of rows) {
    await client.query(sql, [
      deviceId,
      accountId,
      r.datetime_utc,
      r.log_date,
      r.log_time,
      r.vin_v,
      r.set_temp_f,
      r.kw,
      r.kwh_import,
      r.frequency_hz,
    ]);
  }
}

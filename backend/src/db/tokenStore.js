export async function upsertToken(client, token) {
  await client.query(
    `
    INSERT INTO public.cwb_tokens
      (id, account_id, username, account_name, access_token, refresh_token, expires_in, expires_at, )
    VALUES
      (1, $1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (id) DO UPDATE SET
      account_id   = EXCLUDED.account_id,
      access_token = EXCLUDED.access_token,
      refresh_token= EXCLUDED.refresh_token,
      expires_in   = EXCLUDED.expires_in,
      expires_at   = EXCLUDED.expires_at,
      username     = EXCLUDED.username,
      account_name = EXCLUDED.account_name,
      updated_at   = now()
    `,
    [
      token.account_id,
      token.access_token,
      token.refresh_token,
      token.expires_in,
      token.expires_at,
      token.username ?? null,
      token.account_name ?? null,
    ]
  );
}

/** Replace-all refresh behavior (your requirement) */
export async function replaceDevices(client, rows) {
  await client.query("TRUNCATE TABLE public.cwb_devices");
  for (const r of rows) {
    await client.query(
      `
      INSERT INTO public.cwb_devices
        (device_id, account_id, serial_number, modelnumber_id, connected, updated_at)
      VALUES
        ($1, $2, $3, $4, $5, now())
      `,
      [r.device_id, r.account_id, r.serial_number, r.modelnumber_id, r.connected]
    );
  }
}

/** Replace-all refresh behavior (your requirement) */
export async function replaceDeviceInfo(client, rows) {
  await client.query("TRUNCATE TABLE public.cwb_device_info");
  for (const r of rows) {
    await client.query(
      `
      INSERT INTO public.cwb_device_info
        (device_id, account_id, raw, updated_at)
      VALUES
        ($1, $2, $3::jsonb, now())
      `,
      [r.device_id, r.account_id ?? null, JSON.stringify(r.raw)]
    );
  }
}

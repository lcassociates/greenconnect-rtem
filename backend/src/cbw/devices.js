import axios from "axios";
import { bearerHeader } from "./auth.js";

export async function getDevices({ baseUrl, accountId, accessToken }) {
  const url = `${baseUrl}/v1/accounts/${accountId}/devices`;

  const { data } = await axios.get(url, {
    headers: { ...bearerHeader(accessToken), Accept: "application/json" },
    timeout: 30_000,
  });

  return data.map((d) => ({
    device_id: Number(d.device_id),
    account_id: Number(d.account_id),
    serial_number: d.serial_number ?? null,
    modelnumber_id: d.modelNumber_id ?? d.modelnumber_id ?? null,
    connected: d.connected ?? null,
  }));
}

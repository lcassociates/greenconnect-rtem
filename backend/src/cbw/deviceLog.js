import axios from "axios";
import { bearerHeader } from "./auth.js";

export async function getDeviceDataLogText({ baseUrl, accountId, deviceId, accessToken }) {
  const url = `${baseUrl}/v1/accounts/${accountId}/devices/${deviceId}/log.txt`;

  const resp = await axios.get(url, {
    headers: { ...bearerHeader(accessToken), Accept: "text/plain" },
    timeout: 120_000, // logs can be large/slow
    responseType: "text",
    transformResponse: (r) => r, // keep raw text
  });

  return resp.data; // plain text
}

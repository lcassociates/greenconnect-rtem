import axios from "axios";

function formBody(params) {
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) body.set(k, String(v));
  return body;
}

function normalizeTokenResponse(data) {
  // data includes: token_type, expires_in, access_token, refresh_token, account_id ...import axios from "axios";
  const expires_at = new Date(Date.now() + Number(data.expires_in) * 1000).toISOString();

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    token_type: data.token_type,     // "Bearer"
    expires_in: data.expires_in,     // 86400
    expires_at,                      // computed
    // Optional extra fields (handy for logging):
    account_id: data.account_id,
    username: data.username,
    account_name: data.account_name,
  };
}

export async function loginWithPassword({ baseUrl, username, password }) {
  const url = `${baseUrl}/v1/auth/token`;

  const { data } = await axios.post(
    url,
    formBody({ grant_type: "password", username, password }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      timeout: 30_000,
    }
  );

  return normalizeTokenResponse(data);
}

export async function refreshWithToken({ baseUrl, refresh_token }) {
  const url = `${baseUrl}/v1/auth/token`;

  const { data } = await axios.post(
    url,
    formBody({ grant_type: "refresh_token", refresh_token }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      timeout: 30_000,
    }
  );

  return normalizeTokenResponse(data);
}

export function bearerHeader(access_token) {
  return { Authorization: `Bearer ${access_token}` };
}

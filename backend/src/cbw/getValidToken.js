import { getAuthTokenWithPassword, refreshWithToken } from "./auth.js";
import { getStoredToken, saveToken } from "../db/tokenStore.js";

const REFRESH_BUFFER_SECONDS = 300; // refresh 5 minutes early

export async function getValidAccessToken({
  baseUrl,
  username,
  password,
}) {
  const stored = await getStoredToken();
  const now = Date.now();

  // Reuse existing token if still valid
  if (stored) {
    const expiresAt = new Date(stored.expires_at).getTime();
    if (now < expiresAt - REFRESH_BUFFER_SECONDS * 1000) {
      return stored.access_token;
    }
  }

  // Try refresh token
  if (stored?.refresh_token) {
    try {
      const refreshed = await refreshWithToken({
        baseUrl,
        refresh_token: stored.refresh_token,
      });

      await saveToken(refreshed);
      return refreshed.access_token;
    } catch (err) {
      console.warn("Refresh failed, falling back to login");
    }
  }

  const loggedIn = await getAuthTokenWithPassword({
    baseUrl,
    username,
    password,
  });

  await saveToken(loggedIn);
  return loggedIn.access_token;
}

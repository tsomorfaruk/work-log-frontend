const COOKIE_NAME = "authToken";

// Set token in cookie (persistent)
export const setAuthToken = (token: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    token
  )}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
};

// Get token from cookie
export const getAuthToken = (): string | null => {
  const match = document.cookie.match(
    new RegExp("(^| )" + COOKIE_NAME + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : null;
};

// Delete token (logout)
export const deleteAuthToken = () => {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
};

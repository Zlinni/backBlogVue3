const TOKEN_KEY: string = "token";

export function getTokenAuth(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

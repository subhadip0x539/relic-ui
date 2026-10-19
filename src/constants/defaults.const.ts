export const defaults = {
  AUTH_REFRESH_WINDOW_MS: 30_000,
} as const;

export type Defaults = (typeof defaults)[keyof typeof defaults];

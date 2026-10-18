export const httpStatusCode = {
  UNAUTHORIZED: 401,
} as const;

export type HttpStatusCode =
  (typeof httpStatusCode)[keyof typeof httpStatusCode];

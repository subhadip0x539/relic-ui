import { ResponseSchema, type Response, type ParsedResponse } from "./schema";

export const parse = (data: Response): ParsedResponse | null => {
  const { data: value, success, error } = ResponseSchema.safeParse(data);

  if (!success) {
    console.warn(error);
    return null;
  }

  return value.detail;
};

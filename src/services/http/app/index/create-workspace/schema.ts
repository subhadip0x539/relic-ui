import { z } from "zod";

export const ResponseSchema = z.object({
  detail: z.string(),
});

export type Response = z.infer<typeof ResponseSchema>;

export type ParsedResponse = Response["detail"];

export type Request = {
  body: {
    name: string;
  };
};

import { z } from "zod";

export const ResponseSchema = z.object({
  body: z.object({
    access_token: z.string(),
  }),
});

export type Response = z.infer<typeof ResponseSchema>;

export type ParsedResponse = Response["body"];

export type Request = {
  body: {
    username: string;
    password: string;
  };
};

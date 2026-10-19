import { z } from "zod";

export const ResponseSchema = z.object({
  body: z.object({
    username: z.string(),
    fname: z.string(),
    lname: z.string(),
  }),
});

export type Response = z.infer<typeof ResponseSchema>;

export type ParsedResponse = Response["body"];

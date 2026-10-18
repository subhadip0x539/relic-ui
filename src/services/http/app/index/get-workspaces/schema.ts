import { z } from "zod";

export const ResponseSchema = z.object({
  body: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export type Response = z.infer<typeof ResponseSchema>;

export type ParsedResponse = Response["body"];

export type Request = {
  path: {
    id: string;
  };
};

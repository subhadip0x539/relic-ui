import { z } from "zod";

export const ResponseSchema = z.object({
  body: z.string(),
});

export type Response = z.infer<typeof ResponseSchema>;

export type ParsedResponse = Response["body"];

export type Request = {
  body: {
    service_id: string;
  };
};

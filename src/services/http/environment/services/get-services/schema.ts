import type { RequestBodyFilters } from "@/types/http";
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
  body: {
    filters: RequestBodyFilters;
  };
};

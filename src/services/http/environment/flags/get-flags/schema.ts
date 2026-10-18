import type { RequestBodyFilters } from "@/types/http";
import { z } from "zod";

export const ResponseSchema = z.object({
  body: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      type: z.enum(["boolean", "string", "number"]),
      enabled: z.boolean(),
      value: z.union([z.string(), z.number(), z.boolean()]).optional(),
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

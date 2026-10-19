import { z } from "zod";

export const ResponseSchema = z.object({
  detail: z.string(),
});

export type Response = z.infer<typeof ResponseSchema>;

export type ParsedResponse = Response["detail"];

export type Request = {
  path: {
    flagId: string;
  };
  body: Partial<{
    name: string;
    description: string;
    type: string;
    enabled: boolean;
    value: string | number;
    workspace_id: string;
    environment_id: string;
    service_id: string;
  }>;
};

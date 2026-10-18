import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/types/query";
import type { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import { useHttpClient } from "@/providers/http-client-provider";
import { type FlagType } from "@/constants/flag-type.const";

export const updateFlag = async (httpc: HttpClient, payload: Request) => {
  const response = await httpc.patch<Response>(
    endpoint.APP_INDEX_UPDATE_FLAG,
    payload,
  );

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof updateFlag>>;

export type Params = { flagId: string } & Partial<{
  name: string;
  description: string;
  type: FlagType;
  enabled: boolean;
  value: string | number;
  workspaceId: string;
  environmentId: string;
  serviceId: string;
}>;

export const payload = (params: Params): Request => {
  const {
    flagId,
    name,
    description,
    type,
    enabled,
    value,
    workspaceId,
    environmentId,
    serviceId,
  } = params;

  return {
    path: {
      flagId,
    },
    body: {
      name,
      description,
      type,
      enabled,
      value: value,
      workspace_id: workspaceId,
      environment_id: environmentId,
      service_id: serviceId,
    },
  };
};

export const useUpdateFlag = (options: MutationOptions<Data> = {}) => {
  const { onSuccess, onError } = options;

  const httpc = useHttpClient();

  const { mutate, data, error, isPending } = useMutation<Data, Error, Params>({
    mutationFn: async (params) => updateFlag(httpc, payload(params)),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  });

  return { mutate, data, error, isPending };
};

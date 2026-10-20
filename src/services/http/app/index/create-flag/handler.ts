import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/types/query";
import type { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import { useHttpClient } from "@/providers/http-client-provider";
import { flagType, type FlagType } from "@/constants/flag-type.const";

export const createFlag = async (httpc: HttpClient, payload: Request) => {
  const response = await httpc.post<Response>(
    endpoint.APP_INDEX_CREATE_FLAG,
    payload,
    { auth: true },
  );

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof createFlag>>;

export type Params = {
  name: string;
  description?: string;
  type: FlagType;
  enabled: boolean;
  value?: string;
  workspaceId: string;
  environmentId: string;
  serviceId: string;
};

export const payload = (params: Params): Request => {
  const {
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
    body: {
      name,
      description,
      type,
      enabled,
      value: type === flagType.NUMBER ? Number(value) : value,
      workspace_id: workspaceId,
      environment_id: environmentId,
      service_id: serviceId,
    },
  };
};

export const usecreateFlag = (options: MutationOptions<Data> = {}) => {
  const { onSuccess, onError } = options;

  const httpc = useHttpClient();

  const { mutate, data, error, isPending } = useMutation<Data, Error, Params>({
    mutationFn: async (params) => createFlag(httpc, payload(params)),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  });

  return { mutate, data, error, isPending };
};

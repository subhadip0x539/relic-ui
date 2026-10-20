import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/types/query";
import type { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import { useHttpClient } from "@/providers/http-client-provider";

export const createService = async (httpc: HttpClient, payload: Request) => {
  const response = await httpc.post<Response>(
    endpoint.APP_INDEX_CREATE_SERVICE,
    payload,
    { auth: true },
  );

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof createService>>;

export type Params = {
  name: string;
  workspaceId: string;
  environmentId: string;
};

export const payload = (params: Params): Request => {
  const { name, workspaceId, environmentId } = params;

  return {
    body: {
      name,
      workspace_id: workspaceId,
      environment_id: environmentId,
    },
  };
};

export const usecreateService = (options: MutationOptions<Data> = {}) => {
  const { onSuccess, onError } = options;

  const httpc = useHttpClient();

  const { mutate, data, error, isPending } = useMutation<Data, Error, Params>({
    mutationFn: async (params) => createService(httpc, payload(params)),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  });

  return { mutate, data, error, isPending };
};

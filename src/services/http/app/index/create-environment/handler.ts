import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/types/query";
import type { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import { useHttpClient } from "@/providers/http-client-provider";

export const createEnvironment = async (
  httpc: HttpClient,
  payload: Request,
) => {
  const response = await httpc.post<Response>(
    endpoint.APP_INDEX_CREATE_ENVIRONMENT,
    payload,
  );

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof createEnvironment>>;

export type Params = {
  name: string;
  color: string;
  workspaceId: string;
};

export const payload = (params: Params): Request => {
  const { name, color, workspaceId } = params;

  return {
    body: {
      name,
      color,
      workspace_id: workspaceId,
    },
  };
};

export const usecreateEnvironment = (options: MutationOptions<Data> = {}) => {
  const { onSuccess, onError } = options;

  const httpc = useHttpClient();

  const { mutate, data, error, isPending } = useMutation<Data, Error, Params>({
    mutationFn: async (params) => createEnvironment(httpc, payload(params)),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  });

  return { mutate, data, error, isPending };
};

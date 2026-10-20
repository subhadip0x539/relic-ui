import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/types/query";
import type { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import { useHttpClient } from "@/providers/http-client-provider";

export const createWorkspace = async (httpc: HttpClient, payload: Request) => {
  const response = await httpc.post<Response>(
    endpoint.APP_INDEX_CREATE_WORKSPACE,
    payload,
    { auth: true },
  );

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof createWorkspace>>;

export type Params = {
  name: string;
};

export const payload = (params: Params): Request => {
  const { name } = params;

  return {
    body: {
      name,
    },
  };
};

export const usecreateWorkspace = (options: MutationOptions<Data> = {}) => {
  const { onSuccess, onError } = options;

  const httpc = useHttpClient();

  const { mutate, data, error, isPending } = useMutation<Data, Error, Params>({
    mutationFn: async (params) => createWorkspace(httpc, payload(params)),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  });

  return { mutate, data, error, isPending };
};

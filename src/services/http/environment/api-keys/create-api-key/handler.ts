import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/types/query";
import type { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import { useHttpClient } from "@/providers/http-client-provider";

export const createApiKey = async (httpc: HttpClient, payload: Request) => {
  const response = await httpc.post<Response>(
    endpoint.ENVIRONMENT_API_KEYS_CREATE_API_KEY,
    payload,
    { auth: true },
  );

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof createApiKey>>;

export type Params = {
  serviceId: string;
};

export const payload = (params: Params): Request => {
  const { serviceId } = params;

  return {
    body: {
      service_id: serviceId,
    },
  };
};

export const useCreateApiKey = (options: MutationOptions<Data> = {}) => {
  const { onSuccess, onError } = options;

  const httpc = useHttpClient();

  const { mutate, data, error, isPending } = useMutation<Data, Error, Params>({
    mutationFn: async (params) => createApiKey(httpc, payload(params)),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  });

  return { mutate, data, error, isPending };
};

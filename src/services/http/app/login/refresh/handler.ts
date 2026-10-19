import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/types/query";
import type { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import type { Response } from "./schema";
import { parse } from "./parser";
import { useHttpClient } from "@/providers/http-client-provider";

export const refresh = async (httpc: HttpClient) => {
  const response = await httpc.post<Response>(endpoint.APP_AUTH_REFRESH);

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof refresh>>;

export const useRefresh = (options: MutationOptions<Data> = {}) => {
  const { onSuccess, onError } = options;

  const httpc = useHttpClient();

  const { mutate, data, error, isPending } = useMutation<Data, Error>({
    mutationFn: async () => refresh(httpc),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  });

  return { mutate, data, error, isPending };
};

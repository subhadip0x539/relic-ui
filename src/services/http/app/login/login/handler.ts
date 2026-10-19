import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/types/query";
import type { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import { useHttpClient } from "@/providers/http-client-provider";

export const login = async (httpc: HttpClient, payload: Request) => {
  const response = await httpc.post<Response>(endpoint.APP_AUTH_LOGIN, payload);

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof login>>;

export type Params = {
  username: string;
  password: string;
};

export const payload = (params: Params): Request => {
  const { username, password } = params;

  return {
    body: {
      username,
      password,
    },
  };
};

export const useLogin = (options: MutationOptions<Data> = {}) => {
  const { onSuccess, onError } = options;

  const httpc = useHttpClient();

  const { mutate, data, error, isPending } = useMutation<Data, Error, Params>({
    mutationFn: async (params) => login(httpc, payload(params)),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  });

  return { mutate, data, error, isPending };
};

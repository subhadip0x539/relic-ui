import { useEffect } from "react";
import { useQuery } from "@/providers/query-client-provider";
import type { QueryOptions } from "@/types/query";
import type { Response } from "./schema";
import { parse } from "./parser";
import type { HttpClient } from "@/lib/httpc";
import { useHttpClient } from "@/providers/http-client-provider";
import { endpoint } from "@/constants/endpoint.const";

export const getMe = async (httpc: HttpClient) => {
  const response = await httpc.get<Response>(
    endpoint.APP_AUTH_GET_ME,
    undefined,
    { auth: true },
  );
  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof getMe>>;

export const useGetMeQuery = (options: QueryOptions<Data> = {}) => {
  const { queryKey = [], onSuccess, onError, enabled } = options;

  const httpc = useHttpClient();

  const { data, error, isLoading, isRefetching } = useQuery<Data>({
    queryKey,
    queryFn: () => getMe(httpc),
    enabled,
  });

  useEffect(() => {
    data && onSuccess?.(data);
  }, [data, onSuccess]);

  useEffect(() => {
    error && onError?.(error);
  }, [error, onError]);

  return { data, error, isLoading, isRefetching };
};

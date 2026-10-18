import { useEffect } from "react";
import { useQuery } from "@/providers/query-client-provider";
import type { QueryOptions } from "@/types/query";
import type { Request, Response } from "./schema";
import { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import { parse } from "./parser";
import { useHttpClient } from "@/providers/http-client-provider";

export const getApiKeys = async (httpc: HttpClient, payload: Request) => {
  const response = await httpc.post<Response>(
    endpoint.ENVIRONMENT_API_KEYS_GET_API_KEYS,
    payload,
  );

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof getApiKeys>>;

export type Params = { environmentId?: string };

export const payload = (params: Params): Request => {
  const { environmentId } = params;

  return {
    body: {
      filters: environmentId
        ? [{ field: "environment_id", operator: "eq", value: [environmentId] }]
        : [],
    },
  };
};

export const useGetApiKeysQuery = (
  params: Params,
  options: QueryOptions<Data> = {},
) => {
  const { queryKey = [], onSuccess, onError, enabled } = options;

  const httpc = useHttpClient();

  const { data, error, isLoading, isRefetching } = useQuery<Data>({
    queryKey,
    queryFn: () => getApiKeys(httpc, payload(params)),
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

import { useEffect } from "react";
import { useQuery } from "@/providers/query-client-provider";
import type { QueryOptions } from "@/types/query";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import { useHttpClient } from "@/providers/http-client-provider";

export const getFlags = async (httpc: HttpClient, payload: Request) => {
  const response = await httpc.post<Response>(
    endpoint.ENVIRONMENT_FLAGS_GET_FLAGS,
    payload,
  );

  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof getFlags>>;

export type Params = { environmentId?: string };

export const payload = (params: Params): Request => {
  const { environmentId } = params;

  return {
    body: {
      filters: environmentId
        ? [
            {
              field: "environment_id",
              operator: "eq",
              value: [environmentId],
            },
          ]
        : [],
    },
  };
};
export const useGetFlagsQuery = (
  params: Params,
  options: QueryOptions<Data> = {},
) => {
  const { queryKey = [], onSuccess, onError, enabled } = options;

  const httpc = useHttpClient();

  const { data, error, isLoading, isRefetching } = useQuery<Data>({
    queryKey,
    queryFn: () => getFlags(httpc, payload(params)),
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

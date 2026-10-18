import { useEffect } from "react";
import { useQuery } from "@/providers/query-client-provider";
import type { QueryOptions } from "@/types/query";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import { endpoint } from "@/constants/endpoint.const";
import { useHttpClient } from "@/providers/http-client-provider";
import type { HttpClient } from "@/lib/httpc";

export const getEnvironments = async (httpc: HttpClient, payload: Request) => {
  const response = await httpc.post<Response>(
    endpoint.APP_INDEX_GET_ENVIRONMENTS,
    payload,
  );
  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof getEnvironments>>;

export type Params = { workspaceId?: string };

export const payload = (params: Params): Request => {
  const { workspaceId } = params;

  return {
    body: {
      filters: workspaceId
        ? [{ field: "workspace_id", operator: "eq", value: [workspaceId] }]
        : [],
    },
  };
};

export const useGetEnvironmentsQuery = (
  params: Params,
  options: QueryOptions<Data> = {},
) => {
  const { queryKey = [], onSuccess, onError, enabled } = options;

  const httpc = useHttpClient();

  const { data, error, isLoading, isRefetching } = useQuery<Data>({
    queryKey,
    queryFn: () => getEnvironments(httpc, payload(params)),
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

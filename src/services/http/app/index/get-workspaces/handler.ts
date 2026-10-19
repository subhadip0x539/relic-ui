import { useEffect } from "react";
import { useQuery } from "@/providers/query-client-provider";
import type { QueryOptions } from "@/types/query";
import type { Request, Response } from "./schema";
import { parse } from "./parser";
import type { HttpClient } from "@/lib/httpc";
import { useHttpClient } from "@/providers/http-client-provider";
import { endpoint } from "@/constants/endpoint.const";

export const getWorkspaces = async (httpc: HttpClient) => {
  const response = await httpc.get<Response>(
    endpoint.APP_INDEX_GET_WORKSPACES,
    undefined,
    { auth: true },
  );
  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof getWorkspaces>>;

export type Params = { id: string };

export const payload = (params: Params): Request => {
  const { id } = params;

  return {
    path: {
      id,
    },
  };
};

export const useGetWorkspacesQuery = (options: QueryOptions<Data> = {}) => {
  const { queryKey = [], onSuccess, onError, enabled } = options;

  const httpc = useHttpClient();

  const { data, error, isLoading, isRefetching } = useQuery<Data>({
    queryKey,
    queryFn: () => getWorkspaces(httpc),
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

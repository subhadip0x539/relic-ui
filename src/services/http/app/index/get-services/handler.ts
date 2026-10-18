import { useEffect } from "react";
import { useQuery } from "@/providers/query-client-provider";
import type { QueryOptions } from "@/types/query";
import type { Request } from "./schema";
import { parse } from "./parser";
import { response } from "./mock";

export const getServices = async () => {
  const data = parse(response.data);

  return data;
};

export type Data = Awaited<ReturnType<typeof getServices>>;

export type Params = { id: string };

export const payload = (params: Params): Request => {
  const { id } = params;

  return {
    path: {
      id,
    },
  };
};

export const useGetServicesQuery = (options: QueryOptions<Data> = {}) => {
  const { queryKey = [], onSuccess, onError, enabled } = options;

  const { data, error, isLoading, isRefetching } = useQuery<Data>({
    queryKey,
    queryFn: () => getServices(),
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

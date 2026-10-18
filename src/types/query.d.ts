export type Options<T = unknown> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

export type MutationOptions<T = unknown> = Options<T>;

export type QueryOptions<T = unknown> = Options<T> & {
  queryKey?: unknown[];
  enabled?: boolean;
};

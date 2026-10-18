import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
  useQueryClient as useReactQueryClient,
  useQuery,
} from "@tanstack/react-query";

interface QueryClientProviderProps {
  children: React.ReactNode;
  client?: QueryClient;
}

export function QueryClientProvider(props: QueryClientProviderProps) {
  const { children, client } = props;

  return (
    <ReactQueryClientProvider
      client={
        client ??
        new QueryClient({
          defaultOptions: {
            queries: { retry: 0, refetchOnWindowFocus: false },
          },
        })
      }
    >
      {children}
    </ReactQueryClientProvider>
  );
}

export function useQueryClient(): QueryClient {
  const queryClient = useReactQueryClient();

  return queryClient;
}

export { useQuery };

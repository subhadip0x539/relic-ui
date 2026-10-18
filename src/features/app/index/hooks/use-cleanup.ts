import { useEffect } from "react";
import { queryKey } from "@/constants/query-key.const";
import { useQueryClient } from "@/providers/query-client-provider";

export const useCleanup = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === queryKey.APP,
      });
    };
  }, []);
};

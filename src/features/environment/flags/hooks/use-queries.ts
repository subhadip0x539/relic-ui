import { queryKey } from "@/constants/query-key.const";
import { useGetFlagsQuery } from "@/services/http/environment/flags/get-flags";
import { useParams } from "@/providers/router-provider";

export const useQueries = () => {
  const { environmentId } = useParams();

  const {
    data: flags,
    isLoading: isGetFlagsLoading,
    isRefetching: isGetFlagsRefetching,
  } = useGetFlagsQuery(
    { environmentId },
    {
      queryKey: [
        queryKey.ENVIRONMENT,
        queryKey.ENVIRONMENT_FLAGS,
        queryKey.ENVIRONMENT_FLAGS_GET_FLAGS,
        { environmentId },
      ],
      enabled: !!environmentId,
    },
  );

  const isLoading = isGetFlagsLoading;
  const isRefetching = isGetFlagsRefetching;

  return {
    data: { flags },
    isLoading,
    loading: { isGetFlagsLoading },
    isRefetching,
    refetching: { isGetFlagsRefetching },
  };
};

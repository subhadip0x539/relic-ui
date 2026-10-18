import { queryKey } from "@/constants/query-key.const";
import { useGetApiKeysQuery } from "@/services/http/environment/api-keys/get-api-keys";
import { useParams } from "@/providers/router-provider";

export const useQueries = () => {
  const { environmentId } = useParams();

  const {
    data: apiKeys,
    isLoading: isGetApiKeysLoading,
    isRefetching: isGetApiKeysRefetching,
  } = useGetApiKeysQuery(
    { environmentId },
    {
      queryKey: [
        queryKey.ENVIRONMENT,
        queryKey.ENVIRONMENT_API_KEYS,
        queryKey.ENVIRONMENT_API_KEYS_GET_API_KEYS,
        { environmentId },
      ],
      enabled: !!environmentId,
    },
  );

  const isLoading = isGetApiKeysLoading;
  const isRefetching = isGetApiKeysRefetching;

  return {
    data: { apiKeys },
    isLoading,
    loading: { isGetApiKeysLoading },
    isRefetching,
    refetching: { isGetApiKeysRefetching },
  };
};

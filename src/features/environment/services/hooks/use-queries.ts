import { queryKey } from "@/constants/query-key.const";
import { useParams } from "@/providers/router-provider";
import { useGetServicesQuery } from "@/services/http/app/index/get-services";

export const useQueries = () => {
  const { workspaceId, environmentId } = useParams();

  const {
    data: services,
    isLoading: isGetServicesLoading,
    isRefetching: isGetServicesRefetching,
  } = useGetServicesQuery({
    queryKey: [
      queryKey.ENVIRONMENT,
      queryKey.ENVIRONMENT_SERVICES,
      queryKey.ENVIRONMENT_SERVICES_GET_SERVICES,
      { workspaceId, environmentId },
    ],
    enabled: !!(environmentId && workspaceId),
  });

  const isLoading = isGetServicesLoading;
  const isRefetching = isGetServicesRefetching;

  return {
    data: { services },
    isLoading,
    loading: { isGetServicesLoading },
    isRefetching,
    refetching: { isGetServicesRefetching },
  };
};

import { queryKey } from "@/constants/query-key.const";
import { useGetWorkspacesQuery } from "@/services/http/app/index/get-workspaces";
import { useReferenceActions } from "@/store/reference.slice";
import { useGetEnvironmentsQuery } from "@/services/http/app/index/get-environments";
import { useParams } from "@/providers/router-provider";

export const useQueries = () => {
  const { setWorkspaces, setEnvironments } = useReferenceActions();

  const { workspaceId } = useParams();

  const {
    data: workspaces,
    isLoading: isGetWorkspacesLoading,
    isRefetching: isGetWorkspacesRefetching,
  } = useGetWorkspacesQuery({
    queryKey: [
      queryKey.APP,
      queryKey.APP_INDEX,
      queryKey.APP_INDEX_GET_WORKSPACES,
    ],
    onSuccess: (data) => data && setWorkspaces(data),
  });

  const {
    data: environments,
    isLoading: isGetEnvironmentsLoading,
    isRefetching: isGetEnvironmentsRefetching,
  } = useGetEnvironmentsQuery(
    { workspaceId },
    {
      queryKey: [
        queryKey.APP,
        queryKey.APP_INDEX,
        queryKey.APP_INDEX_GET_ENVIRONMENTS,
      ],
      enabled: !!workspaceId,
      onSuccess: (data) => {
        data && setEnvironments(Object.fromEntries(data.map((d) => [d.id, d])));
      },
    },
  );

  const isLoading = isGetWorkspacesLoading || isGetEnvironmentsLoading;

  const isRefetching = isGetWorkspacesRefetching || isGetEnvironmentsRefetching;

  return {
    data: { workspaces, environments },
    isLoading,
    loading: {
      isGetWorkspacesLoading,
      isGetEnvironmentsLoading,
    },
    isRefetching,
    refetching: {
      isGetWorkspacesRefetching,
      isGetEnvironmentsRefetching,
    },
  };
};

import { queryKey } from "@/constants/query-key.const";
import { useGetWorkspacesQuery } from "@/services/http/app/index/get-workspaces";
import { useReferenceActions } from "@/store/reference.slice";
import { useGetEnvironmentsQuery } from "@/services/http/app/index/get-environments";
import { useParams } from "@/providers/router-provider";
import { useGetMeQuery } from "@/services/http/app/login/get-me/handler";
import { useUserActions } from "@/store/user.slice";

export const useQueries = () => {
  const { setWorkspaces, setEnvironments } = useReferenceActions();
  const { setMe } = useUserActions();

  const { workspaceId } = useParams();

  const {
    data: me,
    isLoading: isGetMeLoading,
    isRefetching: isGetMeRefetching,
  } = useGetMeQuery({
    queryKey: [queryKey.APP, queryKey.APP_AUTH, queryKey.APP_AUTH_GET_ME],
    onSuccess: (data) => data && setMe(data),
  });

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
        { workspaceId },
      ],
      enabled: !!workspaceId,
      onSuccess: (data) => {
        data && setEnvironments(Object.fromEntries(data.map((d) => [d.id, d])));
      },
    },
  );

  const isLoading = isGetWorkspacesLoading || isGetMeLoading;

  const isRefetching = isGetWorkspacesRefetching || isGetEnvironmentsRefetching;

  return {
    data: { workspaces, environments, me },
    isLoading,
    loading: {
      isGetWorkspacesLoading,
      isGetEnvironmentsLoading,
      isGetMeLoading,
    },
    isRefetching,
    refetching: {
      isGetWorkspacesRefetching,
      isGetEnvironmentsRefetching,
      isGetMeRefetching,
    },
  };
};

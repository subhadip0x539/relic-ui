import { useMutation } from "@tanstack/react-query";
import type { HttpClient } from "@/lib/httpc";
import { endpoint } from "@/constants/endpoint.const";
import { useHttpClient } from "@/providers/http-client-provider";

export const logout = async (httpc: HttpClient) => {
  await httpc.post<void>(endpoint.APP_AUTH_LOGOUT, undefined, {
    credentials: true,
  });
};

export type Data = Awaited<ReturnType<typeof logout>>;

export const useLogout = () => {
  const httpc = useHttpClient();

  const { mutate, data, error, isPending } = useMutation<void, Error>({
    mutationFn: async () => logout(httpc),
  });

  return { mutate, data, error, isPending };
};

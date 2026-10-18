import { queryKey } from "./query-key.const";

export const endpoint = {
  [queryKey.APP_INDEX_CREATE_ENVIRONMENT]: "/v1/environments",
  [queryKey.APP_INDEX_CREATE_SERVICE]: "/v1/services",
  [queryKey.APP_INDEX_CREATE_FLAG]: "/v1/flags",
  [queryKey.APP_INDEX_UPDATE_FLAG]: "/v1/flags/:flagId",
  [queryKey.APP_INDEX_GET_WORKSPACES]: "/v1/workspaces",
  [queryKey.APP_INDEX_GET_ENVIRONMENTS]: "/v1/environments/all",

  [queryKey.ENVIRONMENT_SERVICES_GET_SERVICES]: "/v1/services/all",

  [queryKey.ENVIRONMENT_FLAGS_GET_FLAGS]: "/v1/flags/all",

  [queryKey.ENVIRONMENT_API_KEYS_GET_API_KEYS]: "/v1/api-keys/all",
  [queryKey.ENVIRONMENT_API_KEYS_CREATE_API_KEY]: "/v1/api-keys",
};

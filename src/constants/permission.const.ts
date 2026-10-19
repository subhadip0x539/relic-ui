export const permission = {
  WORKSPACE_READ: "workspace:read",
  WORKSPACE_CREATE: "workspace:create",

  ENVIRONMENT_READ: "environment:read",
  ENVIRONMENT_CREATE: "environment:create",

  SERVICE_CREATE: "service:create",

  FLAG_CREATE: "flag:create",
} as const;

export type Permission = (typeof permission)[keyof typeof permission];

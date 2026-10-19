export const role = {
  EDITOR: "editor",
  VIEWER: "viewer",
  ADMIN: "admin",
  MANAGER: "manager",
} as const;

export type Role = (typeof role)[keyof typeof role];

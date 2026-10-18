import { Outlet, type RouteObject } from "react-router-dom";
import { AppLayout } from "@/app/layout";
import { Error } from "@/app/error";
import { PortalLayout } from "@/app/portal/layout";

export const routes: RouteObject[] = [
  {
    path: "app",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "portal",
        element: <PortalLayout />,
        children: [
          {
            path: ":workspaceId",
            element: <Outlet />,
            children: [
              {
                path: ":environmentId",
                element: <Outlet />,
                children: [
                  {
                    path: "flags",
                    async lazy() {
                      const { Flags } =
                        await import("@/app/portal/workspace/environment/flags/page");
                      return { Component: Flags };
                    },
                  },
                  {
                    path: "services",
                    async lazy() {
                      const { Services } =
                        await import("@/app/portal/workspace/environment/services/page");
                      return { Component: Services };
                    },
                  },
                  {
                    path: "api-keys",
                    async lazy() {
                      const { ApiKeys } =
                        await import("@/app/portal/workspace/environment/api-keys/page");
                      return { Component: ApiKeys };
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

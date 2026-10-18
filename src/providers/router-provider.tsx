import { Router } from "@/router";
import {
  RouterProvider as ReactRouterProvider,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
  matchPath,
} from "react-router-dom";

export interface RouterProviderProps {
  router?: Router;
}

export function RouterProvider(props: RouterProviderProps) {
  const { router } = props;

  return <ReactRouterProvider router={router ?? new Router()} />;
}

export { useNavigate, useParams, useLocation, useSearchParams, matchPath };

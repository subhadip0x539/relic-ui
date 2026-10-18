import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

export type Router = ReturnType<typeof createBrowserRouter>;

export const Router = new Proxy(class {}, {
  construct: () => createBrowserRouter(routes),
}) as new () => Router;

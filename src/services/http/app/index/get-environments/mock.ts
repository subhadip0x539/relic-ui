import { type Response } from "./schema";

export const response: { data: Response } = {
  data: {
    body: [
      { id: "env_dev", name: "Development", color: "#2F9E6E" },
      { id: "env_staging", name: "Staging", color: "#C98A1F" },
      { id: "env_prod", name: "Production", color: "#C24444" },
    ],
  },
};

import { type Response } from "./schema";

export const response: { data: Response } = {
  data: {
    body: [
      { id: "svc_iris_api", name: "iRIS API" },
      { id: "svc_xlrt_invoice", name: "xlrt Invoice Service" },
      { id: "svc_xlrt_pipeline", name: "xlrt Document Pipeline" },
      { id: "svc_palsons_analytics", name: "Palsons Analytics" },
    ],
  },
};

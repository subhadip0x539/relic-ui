export type RequestBodyFilter = {
  field: string;
  operator: string;
  value: string[];
};

export type RequestBodyFilters = RequestBodyFilter[];

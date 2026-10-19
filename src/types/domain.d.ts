import type { FlagType } from "@/constants/flag-type.const";

export type Workspace = {
  id: string;
  name: string;
};

export type Service = {
  id: string;
  name: string;
};

export type Flag = {
  id: string;
  name: string;
  description?: string;
  type: FlagType;
  enabled: boolean;
  value?: string | boolean | number;
};

export type Environment = {
  id: string;
  name: string;
  color: string;
};

export type ApiKey = {
  id: string;
  service: Service;
};

export type Me = {
  username: string;
  fname: string;
  lname: string;
  avatar?: string;
};

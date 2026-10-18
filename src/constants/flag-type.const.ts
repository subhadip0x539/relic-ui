export const flagType = {
  BOOLEAN: "boolean",
  STRING: "string",
  NUMBER: "number",
} as const;

export type FlagType = (typeof flagType)[keyof typeof flagType];

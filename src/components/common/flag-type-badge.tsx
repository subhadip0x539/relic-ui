import type { FlagType } from "@/constants/flag-type.const";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface FlagTypeBadgeProps {
  type: FlagType;
}

const META: Record<string, { label: string; class: string }> = {
  boolean: {
    label: "boolean",
    class:
      "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/50 border-orange-200 dark:border-orange-950/50",
  },
  string: {
    label: "string",
    class:
      "text-teal-700 bg-teal-50 dark:text-teal-400 dark:bg-teal-950/50 border-teal-200 dark:border-teal-950/50",
  },
  number: {
    label: "number",
    class:
      "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50 border-blue-200 dark:border-blue-950/50",
  },
};

export function FlagTypeBadge({ type }: FlagTypeBadgeProps) {
  const m = META[type];

  if (!m) return <></>;

  return (
    <Badge variant="outline" className={cn("rounded-sm", m.class)}>
      {m.label}
    </Badge>
  );
}

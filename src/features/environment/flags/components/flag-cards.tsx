import { FlagTypeBadge } from "@/components/common/flag-type-badge";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { queryKey } from "@/constants/query-key.const";
import { useQueryClient } from "@/providers/query-client-provider";
import { useUpdateFlag } from "@/services/http/app/index/update-flag/handler";
import type { Data } from "@/services/http/environment/flags/get-flags";
import type { Flag } from "@/types/domain";

export interface FlagCardsProps {
  data?: Data;
}

export interface FlagCardProps extends Flag {
  toggle?: (value: boolean) => void;
}

export function FlagCard(props: FlagCardProps) {
  const { name, type, description, value, enabled, toggle } = props;

  return (
    <div className="border p-3 flex flex-col rounded-sm gap-4 bg-card justify-between h-full">
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold truncate">{name}</span>
          <Switch
            checked={enabled}
            onCheckedChange={(value) => toggle?.(value)}
          />
        </div>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      <div className="flex gap-1 items-center">
        <FlagTypeBadge type={type} />
        {value ? (
          <Badge className="rounded-sm" variant="outline">
            {value}
          </Badge>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export function FlagCards(props: FlagCardsProps) {
  const { data } = props;

  const qc = useQueryClient();

  const { mutate: updateFlag } = useUpdateFlag({
    onSuccess: () => {
      qc.invalidateQueries({
        predicate: (q) =>
          q.queryKey[2] === queryKey.ENVIRONMENT_FLAGS_GET_FLAGS,
      });
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 auto-rows-fr">
      {data?.map((d) => (
        <FlagCard
          key={d.id}
          {...d}
          toggle={(value) => updateFlag({ flagId: d.id, enabled: value })}
        />
      ))}
    </div>
  );
}

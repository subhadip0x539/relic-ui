import { cn } from "@/lib/utils";
import type { Environment } from "@/types/domain";
import { CreateEnvironment } from "./create-environment";

export interface EnvironmentListProps {
  selectedId?: string;
  environments?: Record<string, Environment>;
  onClick?: (service: Environment) => void;
}

export function EnvironmentColor({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        display: "grid",
        placeItems: "center",
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
        }}
      />
    </div>
  );
}

export function EnvironmentList(props: EnvironmentListProps) {
  const { environments = [], onClick, selectedId } = props;

  const handleClick = (service: Environment) => {
    onClick?.(service);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center gap-2 justify-between pr-2 pl-4 h-16">
        <span className="text-xs text-muted-foreground">ENVIRONMENTS</span>
        <CreateEnvironment />
      </div>
      <div className="flex flex-col p-2 gap-1">
        {Object.values(environments).map((e) => (
          <div
            key={e.id}
            className={cn(
              "px-2 py-1.5 hover:bg-accent rounded-sm select-none flex items-center gap-2",
              selectedId === e.id && "bg-accent",
            )}
            onClick={() => handleClick(e)}
          >
            <EnvironmentColor color={e.color} />
            <span className="text-sm">{e.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

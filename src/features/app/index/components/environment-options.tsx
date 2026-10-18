import {
  Settings,
  Key,
  FlagTriangleRight,
  TimerReset,
  GitBranchPlus,
  Server,
} from "lucide-react";
import {
  useParams,
  useNavigate,
  useLocation,
  matchPath,
} from "@/providers/router-provider";
import { cn } from "@/lib/utils";

interface Option {
  icon: React.ElementType;
  label: string;
  path: string;
}

const options: Option[] = [
  { icon: FlagTriangleRight, label: "Flags", path: "flags" },
  { icon: Server, label: "Services", path: "services" },
  { icon: Key, label: "API Keys", path: "api-keys" },
  { icon: TimerReset, label: "Scheduling", path: "scheduling" },
  { icon: GitBranchPlus, label: "Logs", path: "logs" },
  { icon: Settings, label: "Settings", path: "settings" },
];

export function EnvironmentOptions() {
  const { workspaceId, environmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path: string) => {
    if (workspaceId && environmentId) {
      navigate(`/app/portal/${workspaceId}/${environmentId}/${path}`);
    }
  };

  const isActive = (path: string) => {
    return !!matchPath(
      `/app/portal/${workspaceId}/${environmentId}/${path}/*`,
      location.pathname,
    );
  };

  return (
    <div className="flex flex-col gap-1 px-2">
      {options.map((o) => {
        const Icon = o.icon;
        const active = isActive(o.path);
        return (
          <div
            key={o.path}
            className={cn(
              "px-2 py-1.5 hover:bg-accent rounded-sm text-sm select-none flex gap-2 items-center cursor-pointer",
              active ? "bg-accent text-foreground" : "text-muted-foreground",
            )}
            onClick={() => handleClick(o.path)}
          >
            <Icon size={16} />
            {o.label}
          </div>
        );
      })}
    </div>
  );
}

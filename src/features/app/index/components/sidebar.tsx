import { SelectWorkspace } from "./select-workspace";
import { cn } from "@/lib/utils";
import { useReferenceSelector } from "@/store/reference.slice";
import { useNavigate, useParams } from "@/providers/router-provider";
import { EnvironmentOptions } from "./environment-options";
import { EnvironmentList } from "./environment-list";

export function Sidebar() {
  const { workspaces, environments } = useReferenceSelector();
  const { workspaceId, environmentId } = useParams();
  const navigate = useNavigate();

  return (
    <aside className={cn("border-r min-w-64 h-full flex flex-col")}>
      <SelectWorkspace
        selectedId={workspaceId}
        workspaces={workspaces}
        onChange={(ws) => navigate(`/app/portal/${ws.id}`)}
      />
      <div className="flex flex-col flex-1">
        <EnvironmentList
          selectedId={environmentId}
          environments={environments}
          onClick={(service) =>
            navigate(`/app/portal/${workspaceId}/${service.id}/flags`)
          }
        />
      </div>
      {environmentId ? (
        <div className="border-t py-2">
          <EnvironmentOptions />
        </div>
      ) : (
        <></>
      )}
    </aside>
  );
}

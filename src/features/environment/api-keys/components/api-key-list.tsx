import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Data } from "@/services/http/environment/api-keys/get-api-keys";
import type { ApiKey } from "@/types/domain";
import { Check, Copy, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";

export function ApiKeyListItem(props: ApiKey) {
  const { id, service } = props;
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  }

  return (
    <div className="border rounded-sm p-3 flex-1 gap-2 flex flex-col">
      <div className="flex gap-2 flex-col">
        <div className="flex gap-2">
          <div className="flex items-center border rounded-sm h-8 flex-1 bg-accent px-2">
            <span className="text-sm flex-1">{id}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              className="rounded-sm"
              variant="outline"
              onClick={handleCopy}
            >
              {copied ? <Check /> : <Copy />}
            </Button>
            <Button size="icon" className="rounded-sm" variant="outline">
              <RefreshCw />
            </Button>
            <Button size="icon" className="rounded-sm" variant="destructive">
              <Trash2 />
            </Button>
          </div>
        </div>
        <Badge className="rounded-sm" variant="outline">
          {service.name}
        </Badge>
      </div>
    </div>
  );
}

export interface ApiKeyListProps {
  data?: Data;
}

export function ApiKeyList(props: ApiKeyListProps) {
  const { data } = props;

  return (
    <div className="flex flex-col gap-2">
      {data?.length ? (
        data.map((d) => <ApiKeyListItem key={d.id} {...d} />)
      ) : (
        <></>
      )}
    </div>
  );
}

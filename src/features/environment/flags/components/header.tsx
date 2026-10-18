import { QuickSearch } from "@/components/common/quick-search";
import { CreateFlag } from "./create-flag";
import { useEffect, useState } from "react";

export function Header() {
  const [v, setv] = useState("");

  useEffect(() => {
    console.log(v);
  }, [v]);

  return (
    <div className="flex gap-2 h-16 border-b items-center px-2 justify-between">
      <div className="flex gap-2">
        <QuickSearch
          value={v}
          onChange={(v) => setv(v)}
          name="search-flag"
          placeholder="Search flag"
        />
      </div>
      <CreateFlag />
    </div>
  );
}

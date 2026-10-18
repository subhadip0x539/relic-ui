import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

export interface QuickSearchProps {
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function QuickSearch(props: QuickSearchProps) {
  const { name, value, placeholder, onChange } = props;
  const [iv, setiv] = useState(value);

  const debouncedOnChange = useRef(
    debounce((value: string) => {
      onChange?.(value);
    }, 500),
  ).current;

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id={name}
        value={iv}
        placeholder={placeholder}
        className="rounded-sm pl-8 min-w-30 text-sm"
        onChange={(e) => {
          const value = e.target.value;
          setiv(value);
          debouncedOnChange(e.target.value);
        }}
      />
    </div>
  );
}

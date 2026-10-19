import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextFieldControlProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  adornment?: React.ReactNode;
  visible?: boolean;
}

export function TextFieldControl<T extends FieldValues>(
  props: TextFieldControlProps<T>,
) {
  const {
    name,
    control,
    label,
    disabled,
    placeholder,
    adornment,
    visible = true,
  } = props;

  return (
    <Field>
      {label && <FieldLabel className="text-xs">{label}</FieldLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              <Input
                id={name}
                placeholder={placeholder}
                className={cn("rounded-sm", adornment && "pr-8")}
                type={visible ? "text" : "password"}
                value={field.value}
                disabled={disabled}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {adornment && (
                <div className="absolute inset-y-0 right-0 flex items-center px-2.5">
                  {adornment}
                </div>
              )}
            </div>
            {fieldState.error && (
              <FieldError className="text-sx text-red-500">
                {fieldState.error.message}
              </FieldError>
            )}
          </>
        )}
      />
    </Field>
  );
}

import { Dialog } from "@/components/common/dialog";
import { TextFieldControl } from "@/components/common/text-field-control";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectFieldControl } from "@/components/common/select-field-control";
import type { Option } from "@/types/common";
import { usecreateEnvironment } from "@/services/http/app/index/create-environment/handler";
import { useParams } from "@/providers/router-provider";
import { Spinner } from "@/components/ui/spinner";
import { useQueryClient } from "@/providers/query-client-provider";
import { queryKey } from "@/constants/query-key.const";
import { notify } from "@/providers/toaster-provider";

export const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.object({ code: z.string(), name: z.string() }),
});

export const colors: Option[] = [
  { code: "#F44336", name: "Red" },
  { code: "#E91E63", name: "Pink" },
  { code: "#9C27B0", name: "Purple" },
  { code: "#673AB7", name: "Deep Purple" },
  { code: "#3F51B5", name: "Indigo" },
  { code: "#2196F3", name: "Blue" },
  { code: "#03A9F4", name: "Light Blue" },
  { code: "#00BCD4", name: "Cyan" },
];

export interface ContentProps {
  close?: () => void;
}

export function Content(props: ContentProps) {
  const { close } = props;

  const qc = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      color: { code: "", name: "" },
    },
  });
  const { workspaceId } = useParams();

  const { mutate: createEnvironment, isPending: isCreateEnvironmentPending } =
    usecreateEnvironment({
      onSuccess: () => {
        qc.invalidateQueries({
          predicate: (q) =>
            q.queryKey[2] === queryKey.APP_INDEX_GET_ENVIRONMENTS,
        });
        close?.();
      },
      onError: (error) => {
        notify.error(error.message);
      },
    });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    if (workspaceId) {
      createEnvironment({
        name: data.name,
        color: data.color.code,
        workspaceId,
      });
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <TextFieldControl control={form.control} name="name" label="Name" />
      <SelectFieldControl
        control={form.control}
        name="color"
        label="Color"
        options={colors}
      />
      <Button type="submit" className="rounded-sm">
        {isCreateEnvironmentPending ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
}

export function CreateEnvironment() {
  const [dialog, setDialog] = useState(false);

  return (
    <>
      <Dialog
        open={dialog}
        close={() => setDialog(false)}
        title="Create Environment"
        content={({ close }) => <Content close={close} />}
      />
      <Button
        variant="ghost"
        size="icon"
        className="rounded-sm"
        onClick={() => setDialog(true)}
      >
        <Plus />
      </Button>
    </>
  );
}

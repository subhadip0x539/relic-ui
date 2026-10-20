import { TextFieldControl } from "@/components/common/text-field-control";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@/providers/query-client-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { queryKey } from "@/constants/query-key.const";
import { usecreateWorkspace } from "@/services/http/app/index/create-workspace";
import { notify } from "@/providers/toaster-provider";

export const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

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
    },
  });

  const { mutate: createWorkspace, isPending: isCreateWorkspacePending } =
    usecreateWorkspace({
      onSuccess: () => {
        qc.invalidateQueries({
          predicate: (q) => q.queryKey[2] === queryKey.APP_INDEX_GET_WORKSPACES,
        });
        close?.();
      },
      onError: (error) => notify.error(error.message),
    });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    createWorkspace({
      name: data.name,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <TextFieldControl control={form.control} name="name" label="Name" />
      <Button type="submit" className="rounded-sm">
        {isCreateWorkspacePending ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
}

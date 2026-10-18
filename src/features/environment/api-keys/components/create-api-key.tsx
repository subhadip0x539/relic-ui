import { Dialog } from "@/components/common/dialog";
import { SelectFieldControl } from "@/components/common/select-field-control";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@/providers/query-client-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { useGetServicesQuery } from "@/services/http/environment/services";
import { queryKey } from "@/constants/query-key.const";
import { useCreateApiKey } from "@/services/http/environment/api-keys/create-api-key";
import { toast } from "sonner";
import { notify } from "@/providers/toaster-provider";

export const FormSchema = z.object({
  service: z.object({ code: z.string(), name: z.string() }),
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
      service: { code: "", name: "" },
    },
  });

  const { environmentId } = useParams();

  const { data: services, isLoading: isGetServicesLoading } =
    useGetServicesQuery(
      { environmentId },
      {
        enabled: !!environmentId,
        queryKey: [queryKey.ENVIRONMENT_SERVICES_GET_SERVICES],
      },
    );

  const { mutate: createApiKey, isPending: isCreateApiKeyPending } =
    useCreateApiKey({
      onSuccess: () => {
        qc.invalidateQueries({
          predicate: (q) =>
            q.queryKey[2] === queryKey.ENVIRONMENT_API_KEYS_GET_API_KEYS,
        });
        close?.();
      },
      onError: (error) => notify.error(error.message),
    });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    createApiKey({
      serviceId: data.service.code,
    });
  };

  if (isGetServicesLoading) return <div className="h-28"></div>;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <SelectFieldControl
        control={form.control}
        name="service"
        label="Service"
        options={services?.map((s) => ({ code: s.id, name: s.name }))}
      />
      <Button type="submit" className="rounded-sm">
        {isCreateApiKeyPending ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
}

export function CreateApiKey() {
  const [dialog, setDialog] = useState(false);

  return (
    <>
      <Dialog
        open={dialog}
        close={() => setDialog(false)}
        title="Create API Key"
        content={({ close }) => <Content close={close} />}
      />
      <Button
        variant="outline"
        className="rounded-sm"
        onClick={() => setDialog(true)}
      >
        <Plus />
        Create API Key
      </Button>
    </>
  );
}

import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import { useTranslation } from "react-i18next";
import { useUsers } from "../../features/user/hooks/useUsers";
import {
  blockUserSchema,
  type BlockUserFormData,
} from "../../features/block/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBlockUser } from "../../features/block/hooks/useBlockUser";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function BlockUserModal({ onClose, onSuccess }: Props) {
  const { t } = useTranslation("common");
  const { t: tBlock } = useTranslation("block");

  const { data: users, loading: usersLoading } = useUsers();
  const { block, loading } = useBlockUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlockUserFormData>({
    resolver: zodResolver(blockUserSchema),
    defaultValues: {
      blockedUserId: "",
      comment: "",
    },
  });

  const onSubmit = async (data: BlockUserFormData) => {
    await block(data);
    reset();
    onSuccess();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="blockedUserId"
        control={control}
        render={({ field }) => (
          <Select
            options={users}
            value={users.find((o) => o.value === field.value) || null}
            onChange={(val) => field.onChange(val?.value)}
            placeholder={t("selectUser")}
            error={errors.blockedUserId && t(errors.blockedUserId.message!)}
            loading={usersLoading}
          />
        )}
      />

      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <Textarea
            t={t}
            placeholder={tBlock("reasonToBlocking")}
            maxLength={200}
            showRemaining
            error={errors.comment && t(errors.comment.message!)}
            {...field}
          />
        )}
      />

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={handleClose}
          className="bg-gray-300 text-black"
        >
          {t("cancel")}
        </Button>

        <Button type="submit" variant="danger" loading={loading}>
          {tBlock("block")}
        </Button>
      </div>
    </form>
  );
}

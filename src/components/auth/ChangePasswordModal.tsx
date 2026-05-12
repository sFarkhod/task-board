import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import {
  type ChangePasswordFormData,
  changePasswordSchema,
} from "@/features/auth/changePassword.schema";
import { useChangePassword } from "@/features/auth/hooks/useChangePassword";
import getError from "@/utils/getError";

import FormField from "../ui/FormField";

interface Props {
  open: boolean;
  onClose: () => void;
  tAuth: (key: string) => string;
}

export default function ChangePasswordModal({ open, onClose, tAuth }: Props) {
  const { change, loading } = useChangePassword();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await change(data.currentPassword, data.newPassword);

      toast.success(tAuth("passwordChanged"));

      onClose();
      reset();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={tAuth("changePassword")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          id="currentPassword"
          label={tAuth("currentPassword")}
          error={getError(tAuth, errors.currentPassword?.message)}
        >
          <Input
            {...register("currentPassword")}
            type="password"
            placeholder={tAuth("currentPassword")}
            error={errors.currentPassword ? true : false}
          />
        </FormField>

        <FormField
          id="newPassword"
          label={tAuth("newPassword")}
          error={getError(tAuth, errors.newPassword?.message)}
        >
          <Input
            {...register("newPassword")}
            type="password"
            placeholder={tAuth("newPassword")}
            error={errors.newPassword ? true : false}
          />
        </FormField>

        <Button type="submit" loading={loading} className="w-full">
          {tAuth("save")}
        </Button>
      </form>
    </Modal>
  );
}

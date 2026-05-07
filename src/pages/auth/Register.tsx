import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "../../features/auth/schema";
import { useTranslation } from "react-i18next";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import CardHeader from "../../components/ui/CardHeader";
import CardDescription from "../../components/ui/CardDescription";
import CardTitle from "../../components/ui/CardTitle";
import { LayoutGrid } from "lucide-react";
import CardFooter from "../../components/ui/CardFooter";
import CardContent from "../../components/ui/CardContent";
import { Link } from "react-router-dom";
import FormField from "../../components/ui/FormField";
import { useRegister } from "../../features/auth/hooks/useRegister";

export default function Register() {
  const { t } = useTranslation("auth");
  const { t: tCommon } = useTranslation("common");

  const { register: registerUser, loading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data);
  };

  const getError = (msg?: unknown) => {
    if (typeof msg === "string") return t(msg);
    return null;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-6">
      <Card className="w-160">
        <CardHeader>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold text-gray-800">
              {tCommon("appName")}
            </span>
          </div>
          <CardTitle className="text-center mt-2">
            {t("registerTitle")}
          </CardTitle>
          <CardDescription className="text-center mt-2">
            {t("registerDescription")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              id="nickname"
              label={t("nickname")}
              error={getError(errors.nickname?.message)}
            >
              <Input
                {...register("nickname")}
                placeholder={t("nickname")}
                error={errors.nickname ? true : false}
              />
            </FormField>
            <FormField
              id="email"
              label={t("email")}
              error={getError(errors.email?.message)}
            >
              <Input
                id="email"
                {...register("email")}
                placeholder={t("email")}
                error={errors.email ? true : false}
              />
            </FormField>
            <FormField
              id="password"
              label={t("password")}
              error={getError(errors.password?.message)}
            >
              <Input
                type="password"
                {...register("password")}
                placeholder={t("password")}
                error={errors.password ? true : false}
              />
            </FormField>
            <Button loading={loading} type="submit">
              {t("register")}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <span className="text-sm text-gray-500">
            {t("haveAccount")}{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              {t("login")}
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

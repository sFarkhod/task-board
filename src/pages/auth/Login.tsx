import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutGrid } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CardContent from "@/components/ui/CardContent";
import CardDescription from "@/components/ui/CardDescription";
import CardFooter from "@/components/ui/CardFooter";
import CardHeader from "@/components/ui/CardHeader";
import CardTitle from "@/components/ui/CardTitle";
import FormField from "@/components/ui/FormField";
import Input from "@/components/ui/Input";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { type LoginFormData,loginSchema } from "@/features/auth/schema";

export default function Login() {
  const { t } = useTranslation("auth");
  const { t: tCommon } = useTranslation("common");

  const { login: loginUser, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginUser(data);
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
          <CardTitle className="text-center mt-2">{t("loginTitle")}</CardTitle>
          <CardDescription className="text-center mt-2">
            {t("loginDescription")}
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
              {t("login")}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <span className="text-sm text-gray-500">
            {t("dontHaveAccount")}{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              {t("createAccount")}
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { usePageTitle } from "@/hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("404");
  const { t } = useTranslation("common");

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500 mt-2">{t("404")}</p>

      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        {t("goBackHome")}
      </Link>
    </div>
  );
}

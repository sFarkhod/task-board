import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useLayoutStore } from "@/store/layoutStore";

import LanguageSwitcher from "../ui/LanguageSwitcher";
import UserMenu from "../ui/UserMenu";

interface Props {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: Props) {
  const { t } = useTranslation("common");
  const { t: tAuth } = useTranslation("auth");
  const pageTitle = useLayoutStore((state) => state.pageTitle);

  return (
    <header className="h-16 bg-white border-b border-pureSilicon flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Menu className="md:hidden cursor-pointer" onClick={onMenuClick} />
        <h1 className="text-lg font-semibold">{t(pageTitle)}</h1>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <UserMenu t={t} tAuth={tAuth}/>
      </div>
    </header>
  );
}

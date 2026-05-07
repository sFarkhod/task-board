import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import UserMenu from "../ui/UserMenu";

interface Props {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: Props) {
  const { t } = useTranslation("common");

  return (
    <header className="h-16 bg-white border-b border-[#D9DFE4] flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Menu className="md:hidden cursor-pointer" onClick={onMenuClick} />
        <h1 className="text-lg font-semibold">{t("board")}</h1>
      </div>

      <UserMenu t={t}/>
    </header>
  );
}

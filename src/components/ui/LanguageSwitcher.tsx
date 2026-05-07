import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect,useRef, useState } from "react";

import { useLanguage } from "@/hooks/useLanguage";

const labels: Record<string, string> = {
  en: "EN",
  ru: "RU",
  uz: "UZ",
};

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentLanguage, changeLanguage, languages } = useLanguage();

  const handleSelect = async (lang: string) => {
    await changeLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center gap-2
          px-3 py-2 rounded-lg
          bg-white
          border border-pureSilicon
          cursor-pointer
          transition
        "
      >
        <Globe size={18} />

        <span className="text-sm font-medium">{labels[currentLanguage]}</span>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-1 min-w-full
            bg-white border border-pureSilicon
            rounded-lg shadow-lg
            py-1 z-50 overflow-hidden
          "
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleSelect(lang)}
              className={`
                w-full flex items-center justify-between
                px-3 py-2 text-sm transition cursor-pointer
                ${
                  currentLanguage === lang ? "bg-gray-100" : "hover:bg-gray-100"
                }
              `}
            >
              <span>{labels[lang]}</span>

              {currentLanguage === lang && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

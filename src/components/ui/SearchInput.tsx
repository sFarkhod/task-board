import clsx from "clsx";
import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
}: Props) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          "w-full h-11 rounded-lg border border-gray-300 bg-white pl-10 pr-10 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          inputClassName,
        )}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

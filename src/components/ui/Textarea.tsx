import React from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
  rows?: number;
  t: (key: string) => string;
  showRemaining?: boolean;
}

export default function Textarea({
  label,
  error,
  showRemaining = false,
  maxLength,
  rows = 4,
  t,
  className = "",
  value,
  ...props
}: Props) {
  const length = typeof value === "string" ? value.length : 0;

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        value={value}
        maxLength={maxLength}
        rows={rows}
        className={`
          w-full px-3 py-2 rounded-md border text-sm resize-none outline-none
          transition
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:ring-2 focus:ring-blue-200"
          }
          ${className}
        `}
        {...props}
      />

      <div className="flex justify-between mt-1">
        {error ? (
          <span className="text-xs text-red-500">{error}</span>
        ) : (
          <span />
        )}

        {showRemaining && maxLength && (
          <span className="text-xs text-gray-500">
            {maxLength - length} {t("charactersLeft")}
          </span>
        )}
      </div>
    </div>
  );
}

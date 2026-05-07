import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function Input({ error, className, ...props }: Props) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full border p-2 rounded outline-none transition",
        error
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-blue-500",
        className,
      )}
    />
  );
}

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

import Spinner from "./Spinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  loading,
  variant = "primary",
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      disabled={loading}
      {...props}
      className={clsx(
        "w-full p-2 rounded transition font-medium cursor-pointer",
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "secondary" && "bg-gray-200 text-black hover:bg-gray-300",
        variant === "danger" && "bg-red-500 text-white hover:bg-red-600",
        loading && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

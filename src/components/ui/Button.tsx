import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export default function Button({
  loading,
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      {...props}
      className={clsx(
        "w-full p-2 rounded transition font-medium cursor-pointer",
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "secondary" && "bg-gray-200 text-black hover:bg-gray-300",
        loading && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

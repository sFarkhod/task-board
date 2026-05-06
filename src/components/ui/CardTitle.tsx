import type { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function CardTitle({ children, className }: Props) {
  return (
    <h2
      className={clsx(
        "text-2xl font-semibold text-gray-800",
        className,
      )}
    >
      {children}
    </h2>
  );
}

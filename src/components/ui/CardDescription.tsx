import type { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function CardDescription({ children, className }: Props) {
  return <p className={clsx("text-sm text-gray-500", className)}>{children}</p>;
}

import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function CardDescription({ children, className }: Props) {
  return <p className={clsx("text-sm text-gray-500", className)}>{children}</p>;
}

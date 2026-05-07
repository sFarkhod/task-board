import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: Props) {
  return (
    <div className={clsx("bg-white rounded-xl shadow p-6", className)}>
      {children}
    </div>
  );
}

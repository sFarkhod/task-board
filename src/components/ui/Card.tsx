import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={clsx("bg-white rounded-xl shadow p-6", className)}>
      {children}
    </div>
  );
}

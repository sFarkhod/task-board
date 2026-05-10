import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({ children, onClick, className }: Props) {
  return (
    <div
      className={clsx("bg-white rounded-xl shadow p-6", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

import type { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function CardContent({ children, className }: Props) {
  return (
    <h2 className={clsx("mt-5", className)}>
      {children}
    </h2>
  );
}

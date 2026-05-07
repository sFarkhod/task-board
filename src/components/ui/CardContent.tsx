import clsx from "clsx";
import type { ReactNode } from "react";

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

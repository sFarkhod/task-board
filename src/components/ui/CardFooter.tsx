import type { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function CardFooter({ children, className }: Props) {
  return (
    <h2 className={clsx("text-center mt-5", className)}>
      {children}
    </h2>
  );
}

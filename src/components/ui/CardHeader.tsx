import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function CardHeader({ children }: Props) {
  return <div className="mb-3">{children}</div>;
}

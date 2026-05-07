import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ErrorText({ children }: Props) {
  return <p className="text-red-500 text-sm mt-1">{children}</p>;
}

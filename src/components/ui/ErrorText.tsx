import type { ReactNode } from "react";

interface ErrorTextProps {
  children: ReactNode;
}

export default function ErrorText({ children }: ErrorTextProps) {
  return <p className="text-red-500 text-sm mt-1">{children}</p>;
}

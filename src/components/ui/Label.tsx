import clsx from "clsx";
import type { LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({ className, htmlFor, ...props }: Props) {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={clsx(
        "block text-sm font-medium text-gray-700 mb-1",
        className,
      )}
    />
  );
}

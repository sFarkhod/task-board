import clsx from "clsx";
import {
  type CSSProperties,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Card = forwardRef<HTMLDivElement, Props>(
  ({ children, onClick, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("bg-white rounded-xl shadow p-6", className)}
        onClick={onClick}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;

interface Props {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function Spinner({ size = "sm", color = "#ffffff" }: Props) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-2 border-[${color}] border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}

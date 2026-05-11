interface Props {
  name: string;
  size?: number;
}

export default function UserAvatar({ name, size = 32 }: Props) {
  return (
    <div
      className="rounded-full bg-blue-500 text-white flex items-center justify-center font-medium"
      style={{
        width: size,
        height: size,
        fontSize: size / 2.2,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

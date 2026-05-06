import Label from "./Label";
import ErrorText from "./ErrorText";

interface Props {
  id?: string;
  label: string;
  error?: string | null;
  children: React.ReactNode;
}

export default function FormField({ id, label, error, children }: Props) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

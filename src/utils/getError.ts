export default function getError(t: (key: string) => string, msg?: unknown) {
  if (typeof msg === "string") return t(msg);
  return null;
}
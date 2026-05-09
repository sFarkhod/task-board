import axios from "axios";

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;

    const message = data?.message;

    if (typeof message === "string") {
      return message;
    }

    if (Array.isArray(message)) {
      return message.join(", ");
    }

    if (typeof data?.error === "string") {
      return data.error;
    }

    return err.message || "Something went wrong";
  }

  return "Unknown error";
}
import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

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

    return error.message || "Something went wrong";
  }

  return "Unknown error";
}

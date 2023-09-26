import type { AuthSign, SendMessage } from "../types/models";

export function isValidAuthSign(value: unknown): value is AuthSign {
  return (
    typeof value === "object" &&
    value !== null &&
    "username" in value &&
    typeof value.username === "string" &&
    value.username.length > 0 &&
    "password" in value &&
    typeof value.password === "string" &&
    value.password.length > 0
  );
}

export function isValidSendMessage(value: unknown): value is SendMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    "content" in value &&
    typeof value.content === "string" &&
    value.content.length > 0
  );
}

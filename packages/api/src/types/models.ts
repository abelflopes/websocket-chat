import type { components } from "./openapi";

export interface AuthToken {
  userId: string;
  value: string;
}

export type AuthSign = components["schemas"]["AuthSign"];

export type ApiError = components["schemas"]["Error"];

export type Auth = components["schemas"]["Auth"];

export type Validity = components["schemas"]["Validity"];

export type UserPublic = components["schemas"]["User"];

export type UserPrivate = UserPublic & AuthSign;

export type SendMessage =
  components["requestBodies"]["SendMessage"]["content"]["application/json"];

export type Message = components["schemas"]["Message"];

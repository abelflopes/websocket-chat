import type { components } from "./openapi";

export interface AuthToken {
  userId: string;
  value: string;
}

export type AuthSign = components["schemas"]["AuthSign"];

export type User = components["schemas"]["User"];

export type UserInfo = components["schemas"]["UserInfo"];

export type ApiError = components["schemas"]["Error"];

export type AuthSuccess = components["schemas"]["AuthSuccess"];

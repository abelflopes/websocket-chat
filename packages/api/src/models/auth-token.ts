import { getDatabase } from "../db";
import type { AuthToken, UserPrivate } from "../types/models";
import cryptoJs from "crypto-js";
import crypto from "node:crypto";

export async function create(userId: UserPrivate["id"]): Promise<AuthToken> {
  const db = await getDatabase();

  const data = {
    userId,
    value: cryptoJs
      .SHA256(userId + Date.now() + crypto.randomBytes(16).toString())
      .toString(),
  };

  await db.write(({ authTokens }) => {
    authTokens.push(data);
  });

  return data;
}

export async function getUserId(
  authToken: AuthToken["value"]
): Promise<UserPrivate["id"] | undefined> {
  const db = await getDatabase();

  return db.read().authTokens.find((item) => item.value === authToken)?.userId;
}

export async function validate(value: AuthToken["value"] | undefined): Promise<{
  authToken: string | undefined;
  valid: boolean;
  error?: string;
}> {
  const [, authToken] = value?.split("Bearer ") ?? [undefined];

  const data = await new Promise<{
    authToken: string | undefined;
    valid: boolean;
    error?: string;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        authToken,
        valid: Boolean(authToken),
        error: authToken ? undefined : "No auth token provided",
      });
    }, 200);
  });

  return data;
}

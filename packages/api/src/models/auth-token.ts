import { getDatabase } from "../db";
import type { AuthToken, User } from "../types/models";
import cryptoJs from "crypto-js";
import crypto from "node:crypto";

export async function create(userId: User["id"]): Promise<AuthToken> {
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
): Promise<User["id"] | undefined> {
  const db = await getDatabase();

  return db.read().authTokens.find((item) => item.value === authToken)?.userId;
}

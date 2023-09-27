import { getDatabase } from "../db";
import type { AuthToken, UserPrivate, UserPublic } from "../types/models";
import * as User from "./user";
import cryptoJs from "crypto-js";
import crypto from "node:crypto";

async function getUserId(
  authToken: AuthToken["value"]
): Promise<UserPrivate["id"] | undefined> {
  const db = await getDatabase();

  return db.read().authTokens.find((item) => item.value === authToken)?.userId;
}

async function getToken(
  userId: AuthToken["userId"]
): Promise<AuthToken | undefined> {
  const db = await getDatabase();
  return db.read().authTokens.find((item) => item.userId === userId);
}

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

export async function getOrCreate(
  userId: UserPrivate["id"]
): Promise<AuthToken> {
  const existingToken = await getToken(userId);

  const existingTokenData = existingToken
    ? await getData(existingToken.value)
    : undefined;

  const data =
    existingToken && existingTokenData?.valid
      ? existingToken
      : await create(userId);

  return data;
}

export async function getData(value: AuthToken["value"] | undefined): Promise<{
  user: UserPublic | undefined;
  authToken: string | undefined;
  valid: boolean;
  error?: string;
}> {
  let error: string | undefined;

  const authToken = value?.includes("Bearer")
    ? value?.split("Bearer ")[1]
    : value;

  if (!authToken) error = "No auth token provided";

  const userId = authToken ? await getUserId(authToken) : undefined;

  if (!userId) error = "Invalid authentication token";

  const user = userId ? await User.getById(userId, "public") : undefined;

  return {
    user,
    authToken,
    valid: Boolean(authToken && userId),
    error,
  };
}

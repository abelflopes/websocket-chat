import { getDatabase } from "../db";
import * as UUID from "uuid";
import type { UserPrivate, UserPublic } from "../types/models";
import bcrypt from "bcrypt";

async function hashPassword(value: string): Promise<string> {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed = await bcrypt.hash(value, salt);

  return hashed;
}

async function passwordIsEqual(
  plain: string,
  hashed: string
): Promise<boolean> {
  const isEqual = await bcrypt.compare(plain, hashed);
  return isEqual;
}

export async function getById(
  id: string,
  data: "public"
): Promise<UserPublic | undefined>;

export async function getById(
  id: string,
  data: "private"
): Promise<UserPrivate | undefined>;

export async function getById(
  id: string,
  data: "private" | "public"
): Promise<UserPrivate | UserPublic | undefined> {
  const db = await getDatabase();

  const { users } = db.read();

  const userPrivate: UserPrivate | undefined = users.find(
    (user) => user.id === id
  );

  const userPublic: UserPublic | undefined = userPrivate
    ? {
        id: userPrivate.id,
        username: userPrivate.username,
      }
    : undefined;

  return data === "private" ? userPrivate : userPublic;
}

export async function getByUserName(
  username: string
): Promise<UserPrivate | undefined> {
  const db = await getDatabase();

  const { users } = db.read();

  return users.find((user) => user.username === username);
}

export async function create(
  data: Omit<UserPrivate, "id">
): Promise<UserPrivate> {
  if (await getByUserName(data.username)) {
    throw new Error("User already exists");
  }

  const db = await getDatabase();
  const userId = UUID.v4();

  const user = {
    id: userId,
    ...data,
  };

  await db.write(({ users }) => {
    users.push(user);
  });

  return user;
}

export async function getOrCreate(
  data: Omit<UserPrivate, "id">
): Promise<UserPrivate> {
  let user = await getByUserName(data.username);

  if (user && !(await passwordIsEqual(data.password, user.password))) {
    throw new Error("Wrong username or password");
  } else if (!user) {
    user = await create({
      ...data,
      password: await hashPassword(data.password),
    });
  }

  return user;
}

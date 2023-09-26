import { getDatabase } from "../db";
import * as UUID from "uuid";
import type { UserPrivate } from "../types/models";

export async function getById(id: string): Promise<UserPrivate | undefined> {
  const db = await getDatabase();

  const { users } = db.read();

  return users.find((user) => user.id === id);
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

  if (user && user.password !== data.password) {
    throw new Error("Wrong username or password");
  } else if (!user) {
    user = await create(data);
  }

  return user;
}

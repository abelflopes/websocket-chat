import { getDatabase } from "../db";
import * as UUID from "uuid";
import type { Message } from "../types/models";

export async function create(data: Omit<Message, "id">): Promise<Message> {
  const db = await getDatabase();
  const userId = UUID.v4();

  const message = {
    id: userId,
    ...data,
  };

  await db.write(({ messages }) => {
    messages.push(message);
  });

  return message;
}

export async function getAll(): Promise<Message[]> {
  const db = await getDatabase();

  const { messages } = db.read();

  return messages;
}

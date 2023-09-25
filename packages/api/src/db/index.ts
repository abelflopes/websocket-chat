import path from "node:path";
import type { DatabaseData } from "../types/db";
import { initialState } from "./initial-state";

// eslint-disable-next-line unicorn/prefer-module
const file = path.resolve(__dirname, "db.json");

const lowDbNode = import("lowdb/node");
const lowdb = import("lowdb");

export const getDatabase = async (): Promise<{
  read: () => DatabaseData;
  write: (
    callback: (data: DatabaseData) => void | Promise<void>
  ) => Promise<void>;
}> => {
  // Configure lowdb to write data to JSON file
  const { JSONFile } = await lowDbNode;
  const { Low } = await lowdb;

  const adapter = new JSONFile<DatabaseData>(file);

  const lowDb = new Low<DatabaseData>(adapter, initialState);

  // Read data from JSON file, this will set db.data content
  // If JSON file doesn't exist, defaultData is used instead
  await lowDb.read();

  const read = (): DatabaseData => lowDb.data;

  const write = async (
    callback: (data: DatabaseData) => void | Promise<void>
  ): Promise<void> => {
    await callback(lowDb.data);
    await lowDb.write();
  };

  return {
    read,
    write,
  };
};

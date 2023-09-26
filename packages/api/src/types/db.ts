import type { AuthToken, UserPrivate, Message } from "./models";

export interface DatabaseData {
  users: UserPrivate[];
  authTokens: AuthToken[];
  messages: Message[];
}

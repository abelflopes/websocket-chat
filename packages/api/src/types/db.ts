import type { AuthToken, User } from "./models";

export interface DatabaseData {
  users: User[];
  authTokens: AuthToken[];
}

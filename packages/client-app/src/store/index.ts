// Modules
import * as notifications from "./modules/notifications";
import * as messages from "./modules/messages";
import * as auth from "./modules/auth";
import * as user from "./modules/user";

export const Store = {
  notifications: notifications.store,
  messages: messages.store,
  auth: auth.store,
  user: user.store,
};

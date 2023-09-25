// Modules
import * as notifications from "./modules/notifications";
import * as messages from "./modules/messages";
import * as auth from "./modules/auth";

export const Store = {
  notifications: notifications.store,
  messages: messages.store,
  auth: auth.store,
};

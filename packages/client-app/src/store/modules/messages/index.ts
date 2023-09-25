import { type Module, type State } from "./types";
import { type ActionCreator } from "@store/common/types";
import { createStore } from "@store/common/create-store";
import * as API from "@abelflopes/websocket-chat-api-client/index";
import { store as authStore } from "@store/modules/auth";

void (async (): Promise<void> => {
  const { authToken } = authStore.getState();

  await API.rest.GET("/user", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
})();

// Initial State

const initialState: State = {
  data: [],
};

// Actions

const createResetAction: ActionCreator<Module, Module["reset"]> =
  (set) => () => {
    set(initialState);
  };

const createAddAction: ActionCreator<Module, Module["add"]> =
  (set) => (message) => {
    set((state) => ({
      data: [...state.data, message],
    }));

    // Socket can be used but does not provide error handling
    // API.socket.emit("chat-message", { message });
  };

// Data

export const store = createStore<Module>((...a) => ({
  ...initialState,
  reset: createResetAction(...a),
  add: createAddAction(...a),
}));

API.socket.on("chat-message", (data) => {
  console.log("client receive message:", data);
  // store.getState().add(data.message);
});

setTimeout(() => {
  const { authToken } = authStore.getState();

  if (!authToken) return;

  const message = "some chat message";

  console.log("client send message:", message);

  API.socket.emit("chat-message", {
    message,
    authToken,
  });
}, 2500);

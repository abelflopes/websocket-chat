import { type Module, type State } from "./types";
import { type ActionCreator } from "@store/common/types";
import { createPersistedStore } from "@store/common/create-store";
import { store as notificationsStore } from "@store/modules/notifications";
import * as API from "@abelflopes/websocket-chat-api-client";

// Initial State

const initialState: State = {
  authToken: undefined,
  error: undefined,
};

// Actions

const createResetAction: ActionCreator<Module, Module["reset"]> =
  (set) => () => {
    set(initialState);
  };

const createSignAction: ActionCreator<Module, Module["sign"]> =
  (set) => async (username, password) => {
    const { data, error } = await API.rest.POST("/auth/sign", {
      body: {
        username,
        password,
      },
    });

    set(() => ({
      authToken: data?.authToken,
      error: error?.description,
    }));

    // API.socket.emit("chat-message", { message });

    if (error?.description) {
      notificationsStore.getState().add({
        type: "error",
        title: "Error",
        description: error?.description,
      });
    }
  };

// Data

export const store = createPersistedStore<Module>(
  (...a) => ({
    ...initialState,
    reset: createResetAction(...a),
    sign: createSignAction(...a),
  }),
  "auth"
);

import { type Module, type State } from "./types";
import { type ActionCreator } from "@store/common/types";
import { createPersistedStore } from "@store/common/create-store";
import { store as notificationsStore } from "@store/modules/notifications";
import * as API from "@abelflopes/websocket-chat-api-client";

// Initial State

const initialState: State = {
  authToken: undefined,
  error: undefined,
  loading: 0,
};

// Actions

const createResetAction: ActionCreator<Module, Module["reset"]> =
  (set) => () => {
    set(initialState);
  };

const createSignAction: ActionCreator<Module, Module["sign"]> =
  (set) => async (username, password) => {
    set((state) => ({
      loading: state.loading + 1,
    }));

    let authToken: State["authToken"] | undefined;
    let error: State["error"];

    try {
      const response = await API.rest.POST("/auth/sign", {
        body: {
          username,
          password,
        },
      });

      authToken = response.data?.authToken;
      error = response.error?.description;
    } catch (catchError) {
      error =
        catchError instanceof Error ? catchError.message : String(catchError);
    }

    set((state) => ({
      authToken,
      error,
      loading: state.loading - 1,
    }));

    if (error) {
      notificationsStore.getState().add({
        type: "error",
        title: "Unable to authenticate user",
        description: error,
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

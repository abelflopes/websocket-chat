import { type Module, type State } from "./types";
import { type ActionCreator } from "@store/common/types";
import { createStore } from "@store/common/create-store";
import * as API from "@abelflopes/websocket-chat-api-client";
import { store as authStore } from "@store/modules/auth";
import { getAuth } from "@store/utils/authorization";
import { store as notificationsStore } from "@store/modules/notifications";

// Initial State

const initialState: State = {
  error: undefined,
  data: undefined,
  loading: 0,
};

// Actions

const createResetAction: ActionCreator<Module, Module["reset"]> =
  (set) => () => {
    set(initialState);
  };

const createLoadAction: ActionCreator<Module, Module["load"]> =
  (set) => async () => {
    set((state) => ({
      loading: state.loading + 1,
    }));

    let data: State["data"] | undefined;
    let error: State["error"];

    try {
      const { authToken } = authStore.getState().data;

      if (!authToken) throw new Error("No auth token provided");

      const response = await API.rest.GET("/user", getAuth(authToken));

      data = response.data;
      error = response.error?.description;
    } catch (catchError) {
      error =
        catchError instanceof Error ? catchError.message : String(catchError);
    }

    set((state) => ({
      data,
      error,
      loading: state.loading - 1,
    }));

    if (error) {
      notificationsStore.getState().add({
        type: "error",
        title: "Unable to fetch user data",
        description: error,
      });
    }
  };

// Data

export const store = createStore<Module>((...a) => ({
  ...initialState,
  reset: createResetAction(...a),
  load: createLoadAction(...a),
}));

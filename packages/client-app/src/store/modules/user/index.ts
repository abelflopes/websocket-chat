import { type Module, type State } from "./types";
import { type ActionCreator } from "@store/common/types";
import { createStore } from "@store/common/create-store";
import * as API from "@abelflopes/websocket-chat-api-client";
import { store as authStore } from "@store/modules/auth";
import { getAuth } from "@store/utils/authorization";

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
    const { authToken } = authStore.getState();

    if (!authToken) throw new Error("No auth token provided");

    set((state) => ({
      loading: state.loading + 1,
    }));

    const user = await API.rest.GET("/user", getAuth(authToken));

    set((state) => ({
      data: user.data,
      error: user.error?.description,
      loading: state.loading - 1,
    }));
  };

// Data

export const store = createStore<Module>((...a) => ({
  ...initialState,
  reset: createResetAction(...a),
  load: createLoadAction(...a),
}));

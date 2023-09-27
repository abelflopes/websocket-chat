import { type ActionCreator } from "@store/common/types";
import { createPersistedStore } from "@store/common/create-store";
import { store as notificationsStore } from "@store/modules/notifications";
import * as API from "@abelflopes/websocket-chat-api-client";
import type { Module, State } from "./types";
import { getAuth } from "@store/utils/authorization";

// Initial State

const initialState: State = {
  data: {
    authToken: undefined,
    valid: false,
  },
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

    let authToken: State["data"]["authToken"] | undefined;
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
      data: {
        authToken,
        valid: true,
      },
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

const createValidateAction: ActionCreator<Module, Module["validate"]> =
  (set) => async (token) => {
    set((state) => ({
      loading: state.loading + 1,
    }));

    let valid: State["data"]["valid"];
    let error: State["error"];

    try {
      const response = await API.rest.POST("/auth/validate", getAuth(token));

      valid = response.data?.valid ?? false;
      error = response.error?.description;
    } catch (catchError) {
      error =
        catchError instanceof Error ? catchError.message : String(catchError);
    }

    set((state) => ({
      data: {
        authToken: valid ? token : undefined,
        valid,
      },
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

const createRefreshAction: ActionCreator<Module, Module["refresh"]> =
  (set) => async (token) => {
    set((state) => ({
      loading: state.loading + 1,
    }));

    let authToken: State["data"]["authToken"] | undefined;
    let error: State["error"];

    try {
      const response = await API.rest.POST("/auth/refresh", getAuth(token));

      authToken = response.data?.authToken;
      error = response.error?.description;
    } catch (catchError) {
      error =
        catchError instanceof Error ? catchError.message : String(catchError);
    }

    set((state) => ({
      data: {
        authToken,
        valid: true,
      },
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
    validate: createValidateAction(...a),
    refresh: createRefreshAction(...a),
  }),
  "auth"
);

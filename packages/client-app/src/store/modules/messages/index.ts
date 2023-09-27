import { type Module, type State } from "./types";
import { type ActionCreator } from "@store/common/types";
import { createStore } from "@store/common/create-store";
import * as API from "@abelflopes/websocket-chat-api-client";
import { store as authStore } from "@store/modules/auth";
import { store as userStore } from "@store/modules/user";
import { getAuth } from "@store/utils/authorization";

// Initial State

const initialState: State = {
  data: [],
  error: undefined,
  loading: 0,
};

// Actions

const createResetAction: ActionCreator<Module, Module["reset"]> =
  (set) => () => {
    set(initialState);
  };

const createAddAction: ActionCreator<Module, Module["add"]> =
  (set) => (message) => {
    set((state) => ({
      data: [...state.data.filter((item) => item.id !== message.id), message],
    }));
  };

const createRemoveAction: ActionCreator<Module, Module["remove"]> =
  (set) => (id) => {
    set((state) => ({
      data: state.data.filter((item) => item.id !== id),
    }));
  };

const createSendAction: ActionCreator<Module, Module["send"]> =
  (set, get) => async (text) => {
    set((state) => ({
      loading: state.loading + 1,
    }));

    const { authToken } = authStore.getState();
    const currentUser = userStore.getState().data;
    const tmpMessageId = `tmp-message-${Date.now()}`;

    let data: State["data"][number] | undefined;
    let error: State["error"];

    try {
      if (!currentUser) throw new Error("Missing current user data");
      if (!authToken) throw new Error("No auth token provided");

      // Socket can be used but does not provide proper error handling
      // API.socket.emit("chat-message", {
      //   type: "client-request",
      //   content: text,
      //   authToken,
      // });

      // Optimistic update - add the message assuming the request is going to be successful
      get().add({
        id: tmpMessageId,
        content: text,
        senderId: currentUser.id,
      });

      const response = await API.rest.POST("/message", {
        ...getAuth(authToken),
        body: {
          content: text,
        },
      });

      data = response.data;
      error = response.error?.description;
      get().remove(tmpMessageId);

      // Add message to state through the dedicated action
      if (response.data) get().add(response.data);

      set((state) => ({
        error: response.error?.description,
        loading: state.loading - 1,
      }));
    } catch (catchError) {
      error =
        catchError instanceof Error ? catchError.message : String(catchError);
    }

    // Remove the temporary message object from the optimistic update and add the "real" one
    set((state) => ({
      data: [
        ...state.data.filter(
          (item) => item.id !== tmpMessageId && item.id !== data?.id
        ),
        ...(data ? [data] : []),
      ],
      error,
    }));

    set((state) => ({
      loading: state.loading - 1,
    }));
  };

// Data

export const store = createStore<Module>((...a) => ({
  ...initialState,
  reset: createResetAction(...a),
  add: createAddAction(...a),
  remove: createRemoveAction(...a),
  send: createSendAction(...a),
}));

// Listen to websocket messages and populate the state accordingly
API.socket.on("chat-message", (data) => {
  if (data.type === "client-request") return;

  const currentUser = userStore.getState().data;

  if (!currentUser) throw new Error("Missing current user data");

  // Skip messages sent by the current user, assume it has been handled on the action
  if (data.payload.senderId === currentUser.id) return;

  store.getState().add(data.payload);
});

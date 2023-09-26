import { type Module, type State } from "./types";
import { type ActionCreator } from "@store/common/types";
import { createStore } from "@store/common/create-store";
import * as API from "@abelflopes/websocket-chat-api-client/index";
import { store as authStore } from "@store/modules/auth";
import { store as userStore } from "@store/modules/user";
// Import { getAuth } from "@store/utils/authorization";

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
      data: [...state.data, message],
    }));
  };

const createSendAction: ActionCreator<Module, Module["send"]> =
  (set, get) => async (text) => {
    set((state) => ({
      loading: state.loading + 1,
    }));

    const { authToken } = authStore.getState();

    if (!authToken) throw new Error("No auth token provided");

    // TODO: implement with rest / optimistic
    // const { data, error } = await API.rest.POST("/message", {
    //   ...getAuth(authToken),
    //   body: {
    //     content: text,
    //   },
    // });

    // // Add message to state through the dedicated action
    // if (data) get().add(data);

    // set((state) => ({
    //   error: error?.description,
    //   loading: state.loading - 1,
    // }));

    // Socket can be used but does not provide error handling
    // TODO: comment
    const currentUser = userStore.getState().data;
    if (!currentUser) throw new Error("Missing current user data");
    API.socket.emit("chat-message", {
      type: "client-request",
      content: text,
      authToken,
    });

    get().add({
      id: "tmp",
      senderId: currentUser.id,
      content: text + " (optimistic)",
    });
  };

// Data

export const store = createStore<Module>((...a) => ({
  ...initialState,
  reset: createResetAction(...a),
  add: createAddAction(...a),
  send: createSendAction(...a),
}));

// Listen to websocket messages and populate the state accordingly
API.socket.on("chat-message", (data) => {
  if (data.type === "client-request") return;

  const currentUser = userStore.getState().data;

  if (!currentUser) throw new Error("Missing current user data");

  // Skip messages sent by the current user, assume it has been handled on the action
  // if (data.senderId === currentUser.id) return;

  console.log("chat message from socket");
  store
    .getState()
    .add({ senderId: data.senderId, id: data.id, content: data.content });
});

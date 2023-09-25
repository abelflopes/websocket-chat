import React from "react";
import { Error404View } from "@views/error-404";
import { ChatView } from "@views/chat";
import { LoginView } from "@views/login";
import { type View } from "@router/index";

export const chat: View = {
  name: "Chat",
  options: {
    path: "/chat",
    element: <ChatView />,
  },
};

export const login: View = {
  name: "Login",
  options: {
    path: "/login",
    element: <LoginView />,
  },
};

export const error404: View = {
  name: "Error",
  options: {
    path: "*",
    element: <Error404View />,
  },
};

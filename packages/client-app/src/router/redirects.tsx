import React from "react";
// Router
import { type View } from "@router/index";
// Utils
import { ViewRedirect } from "@router/utils/ViewRedirect";
// Views
import * as Views from "./views";

export const home: View = {
  name: "Home",
  options: {
    path: "/",
    element: <ViewRedirect route={Views.chat} />,
  },
};

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
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <ViewRedirect route={Views.chat} />,
  },
};

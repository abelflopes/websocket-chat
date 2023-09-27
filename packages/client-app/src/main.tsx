// React
import React from "react";
import { createRoot } from "react-dom/client";
// Styles
import "./styles/index.scss";
// Router
import { DefaultRouter } from "@router/router/Default";

document.documentElement.style.setProperty(
  "--primary-color",
  `hsl(${Math.floor(Math.random() * 360)}deg 55% 40%)`
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <DefaultRouter />
  </React.StrictMode>
);

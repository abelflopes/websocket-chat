// React
import { NavLink } from "react-router-dom";
import React from "react";
// Router
import { allRoutes } from "@router/index";
import { requiredRoutePath } from "@router/utils/required-route-path";
// Components
import { Layout } from "@components/layout-error";

export const Error404View = (): React.ReactElement => (
  <Layout
    title="Something went wrong"
    description="The requested page was not found"
  >
    <NavLink to={requiredRoutePath(allRoutes.home)}>Go to initial page</NavLink>
  </Layout>
);

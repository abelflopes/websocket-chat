// React
import React from "react";
// Components
import { Layout } from "@components/layout-default";
import { LoginForm } from "@components/login-form";
// Store
import { Store } from "@store/index";

export const LoginView = (): React.ReactElement => {
  const sign = Store.auth.useSign();

  return (
    <Layout pageRestrict="not-authenticated">
      <LoginForm
        onSubmit={({ username, password }) => {
          void sign(username, password);
        }}
      />
    </Layout>
  );
};

// React
import React from "react";
// Components
import { DefaultLayout } from "@layouts/Default";
import { LoginForm } from "@components/login-form";
// Store
import { Store } from "@store/index";

export const LoginView = (): React.ReactElement => {
  const sign = Store.auth.useSign();

  return (
    <DefaultLayout pageRestrict="not-authenticated">
      <LoginForm
        onSubmit={({ username, password }) => {
          void sign(username, password);
        }}
      />
    </DefaultLayout>
  );
};

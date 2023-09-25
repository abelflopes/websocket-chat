import styles from "./index.module.scss";
// React
import React from "react";
// Components
import { TextField } from "@components/text-field";
import { Button } from "@components/button";

interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => void;
}

export const LoginForm = ({
  onSubmit,
}: Readonly<LoginFormProps>): React.ReactElement => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username === "string" && typeof password === "string") {
      onSubmit({
        username,
        password,
      });
    }
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div>
        <TextField required autoFocus name="username" placeholder="Username" />
        <TextField
          required
          name="password"
          placeholder="Password"
          type="password"
        />
      </div>
      <Button>Login</Button>
    </form>
  );
};

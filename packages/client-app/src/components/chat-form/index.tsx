// React
import React, { useCallback } from "react";
// Styles
import styles from "./index.module.scss";
// Icons - https://react-icons.github.io/react-icons
import { LuSendHorizonal } from "react-icons/lu";
// Components
import { Button } from "@components/button";
import { TextField } from "@components/text-field";

export interface ButtonProps {
  onSend: (message: string) => void;
}

export const ChatForm = ({
  onSend,
}: Readonly<ButtonProps>): React.ReactElement => {
  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const message = formData.get("message");

      if (typeof message === "string") {
        onSend(message);
      }

      event.currentTarget.reset();
    },
    [onSend]
  );

  return (
    <form className={styles.root} onSubmit={onSubmit}>
      <TextField
        autoFocus
        required
        autoComplete="off"
        name="message"
        type="text"
        placeholder="Type a message"
      />
      <Button>
        <LuSendHorizonal size="20" />
      </Button>
    </form>
  );
};

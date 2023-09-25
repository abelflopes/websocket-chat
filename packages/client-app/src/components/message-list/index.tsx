import { Message } from "@components/message";
import styles from "./index.module.scss";
/// React
import React from "react";

interface MessagesListProps {
  messages: string[];
}

export const MessagesList = ({
  messages,
}: Readonly<MessagesListProps>): React.ReactElement => (
  <div className={styles.root}>
    {messages.map((message) => (
      <Message key={message} text={message} />
    ))}
  </div>
);

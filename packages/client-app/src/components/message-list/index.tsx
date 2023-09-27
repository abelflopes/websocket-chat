import styles from "./index.module.scss";
/// React
import React from "react";
// Components
import { Message } from "@components/message";
// Store
import type * as MessagesStore from "@store/modules/messages/types";

interface MessagesListProps {
  messages: MessagesStore.Message[];
  currentUser: string;
}

export const MessagesList = ({
  messages,
  currentUser,
}: Readonly<MessagesListProps>): React.ReactElement => (
  <div className={styles.root}>
    {messages.map((message, index) => (
      <Message
        key={message.id}
        senderName={message.senderName}
        text={message.content}
        type={message.senderName === currentUser ? "sent" : "received"}
        joinTop={Boolean(
          messages[index - 1] &&
            messages[index - 1]?.senderId === message.senderId
        )}
        joinBottom={Boolean(
          messages[index + 1] &&
            messages[index + 1]?.senderId === message.senderId
        )}
      />
    ))}
  </div>
);

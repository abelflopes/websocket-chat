import styles from "./index.module.scss";
/// React
import React from "react";
// Components
import { Message } from "@components/message";
// Store
import type * as MessagesStore from "@store/modules/messages/types";
import { EmptyState } from "@components/empty-state";

interface MessagesListProps {
  messages: MessagesStore.Message[];
  currentUser: string;
}

export const MessagesList = ({
  messages,
  currentUser,
}: Readonly<MessagesListProps>): React.ReactElement => (
  <div className={styles.root}>
    {messages.length === 0 && (
      <EmptyState>The chat is empty, send the first message</EmptyState>
    )}

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

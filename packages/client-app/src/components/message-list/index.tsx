import styles from "./index.module.scss";
/// React
import React from "react";
// Components
import { Message } from "@components/message";
// Store
import type * as MessagesStore from "@store/modules/messages/types";
import { Store } from "@store/index";
interface MessagesListProps {
  messages: MessagesStore.Message[];
}

export const MessagesList = ({
  messages,
}: Readonly<MessagesListProps>): React.ReactElement => {
  const currentUser = Store.user.useData();

  return (
    <div className={styles.root}>
      {messages.map((message, index) => (
        <Message
          key={message.id}
          senderName={message.senderName}
          text={message.content}
          type={message.senderId === currentUser?.id ? "sent" : "received"}
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
};

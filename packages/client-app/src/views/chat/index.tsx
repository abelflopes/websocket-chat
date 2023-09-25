// React
import React from "react";
// Store
import { Store } from "@store/index";
// Components
import { DefaultLayout } from "@layouts/Default";
import { ChatForm } from "@components/chat-form";
import { ChatWrapper } from "@components/chat-wrapper";
import { MessagesList } from "@components/message-list";

export const ChatView = (): React.ReactElement => {
  const messages = Store.messages.useData();
  const sendMessage = Store.messages.useAdd();

  return (
    <DefaultLayout pageRestrict="authenticated">
      <ChatWrapper
        footer={
          <ChatForm
            onSend={(message) => {
              sendMessage(message);
            }}
          />
        }
      >
        <MessagesList messages={messages} />
      </ChatWrapper>
    </DefaultLayout>
  );
};

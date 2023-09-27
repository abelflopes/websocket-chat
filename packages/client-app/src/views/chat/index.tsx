// React
import React, { useEffect } from "react";
// Store
import { Store } from "@store/index";
// Components
import { DefaultLayout } from "@layouts/Default";
import { ChatForm } from "@components/chat-form";
import { ChatWrapper } from "@components/chat-wrapper";
import { MessagesList } from "@components/message-list";

export const ChatView = (): React.ReactElement => {
  const messages = Store.messages.useData();
  const sendMessage = Store.messages.useSend();
  const loadUser = Store.user.useLoad();

  useEffect(() => {
    void loadUser();
  }, [loadUser]);

  return (
    <DefaultLayout pageRestrict="authenticated">
      <ChatWrapper
        footer={
          <ChatForm
            onSend={(message) => {
              void sendMessage(message);
            }}
          />
        }
      >
        <MessagesList messages={messages} />
      </ChatWrapper>
    </DefaultLayout>
  );
};

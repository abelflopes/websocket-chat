// React
import React, { useEffect } from "react";
// Store
import { Store } from "@store/index";
// Components
import { Layout } from "@components/layout-default";
import { ChatForm } from "@components/chat-form";
import { ChatWrapper } from "@components/chat-wrapper";
import { MessagesList } from "@components/message-list";

export const ChatView = (): React.ReactElement => {
  const currentUser = Store.user.useData();
  const userError = Store.user.useError();
  const messageError = Store.messages.useError();
  const messages = Store.messages.useData();
  const sendMessage = Store.messages.useSend();
  const loadUser = Store.user.useLoad();

  useEffect(() => {
    void loadUser();
  }, [loadUser]);

  return (
    <Layout pageRestrict="authenticated">
      <ChatWrapper
        footer={
          <ChatForm
            error={messageError ?? userError}
            onSend={(message) => {
              void sendMessage(message);
            }}
          />
        }
      >
        {currentUser && (
          <MessagesList
            messages={messages}
            currentUser={currentUser.username}
          />
        )}
      </ChatWrapper>
    </Layout>
  );
};

// OVERVIEW: sets up a chat interface using the react-chat-engine-advanced library. It imports Header and StandardMessageForm components, which are used to customize the appearance of the chat interface.

import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
// Set Up Below (steps 1-4) + Components info can be found in documentation overview on chatengine.io

function Chat() {
  // 2.HOOK.The useMultiChatLogic hook is used to connect to the chat engine and retrieve the necessary data to render the chat window
  const chatProps = useMultiChatLogic(
    // 1.SERVER
    import.meta.env.VITE_PROJECT_ID,
    "testuser",
    "1234"
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      {/*3.MultiChatSocket component is used to authenticate the user*/}
      <MultiChatSocket {...chatProps} />
      {/*4. MultiChatWindow component is used to render the chat interface.*/}
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        // styling the message form
        renderMessageForm={(props) => {
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
}

export default Chat;

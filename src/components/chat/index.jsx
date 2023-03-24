import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
// Set Up Below (steps 1-4) + Components info can be found in documentation overview on chatengine.io

function Chat() {
  // 2.HOOK. import ProjectID (from .env) and User + password to be used to conect to chat engine
  const chatProps = useMultiChatLogic(
    // 1.SERVER
    import.meta.env.VITE_PROJECT_ID,
    "testuser",
    "1234"
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      {/*3.COMPONENT- Renders our component + give authenticaton to connect to react chat engine website  */}
      <MultiChatSocket {...chatProps} />
      {/*4. SOCKET  */}
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
      />
    </div>
  );
}

export default Chat;

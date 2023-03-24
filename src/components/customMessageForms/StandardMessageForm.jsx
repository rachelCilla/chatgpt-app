// OVERVIEW: Represents the form for sending messages. State variable keep track of the message text, any file attachmentsm and a preview of attached file.
//renders an input feild for the message, a dropzone for file attachments, and a send button.
//onSubmit sends the message to the chat engine.

import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

// STANDARD MESSAGE FORM COMPONENT
// you can view this infomation under the "rest" section on chatengine.io
const StandardMessageForm = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [preview, setPreview] = useState("");

  // updates the state of the message as the user types into the feild
  const handleChange = (e) => setMessage(e.target.value);
  //called when the send button is clicked. Creates an obj containing the message,username, and attachment. passed onto the onSubmit function as a prop
  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      create: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };
    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <div className="message-form-container">
      {preview && (
        // MESSAGE PREVIEW
        <div className="message-form-preview">
          <img
            src={preview}
            alt="message-form-preview"
            className="message-form-preview-image"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          {/* X-icon CLOSE BUTTON (clears preview and attachment)*/}
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}

      <div className="message-form">
        <div className="message-form-input-container">
          <input
            type="text"
            className="message-form-input"
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
          />
        </div>
      </div>

      <div className="message-form-icons">
        {/* Dropzone is a react library that handles file uploads  */}
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          noClick={true}
          onDrop={(acceptedFiles) => {
            setAttachment(acceptedFiles[0]);
            setPreview(URL.createObjectURL(acceptedFiles[0]));
          }}
        >
          {({ getRootProps, getInputProps, open }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <PaperClipIcon
                className="message-form-icon-clip"
                onClick={open}
              />
            </div>
          )}
        </Dropzone>

        <hr className="vertical-line" />
        {/* PAPER AIRPLANE ICON = send. clears out text and attachments*/}
        <PaperAirplaneIcon
          className="message-form-icon-airplane"
          onClick={() => {
            setPreview("");
            handleSubmit();
          }}
        />
      </div>
    </div>
  );
};

export default StandardMessageForm;

import React from "react";
import "./Message.css";
import { format } from "timeago.js";

function Message({ own, message }) {
  const { sender, text, createdAt } = message;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://images.pexels.com/photos/13570394/pexels-photo-13570394.jpeg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{text}</p>
      </div>
      <div className="messageBottom">{format(createdAt)}</div>
    </div>
  );
}

export default Message;

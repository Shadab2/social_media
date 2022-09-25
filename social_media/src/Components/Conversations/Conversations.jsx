import React from "react";
import "./Conversations.css";

function Conversations() {
  return (
    <div className="conversation">
      <img
        src="https://images.pexels.com/photos/13570394/pexels-photo-13570394.jpeg"
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">John Doe</span>
    </div>
  );
}

export default Conversations;

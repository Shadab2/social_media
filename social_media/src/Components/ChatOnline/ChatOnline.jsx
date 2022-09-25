import React from "react";
import "./ChatOnline.css";

function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src="https://images.pexels.com/photos/13570394/pexels-photo-13570394.jpeg"
            alt=""
            className="chatOnlineImg"
          />
          <div className="chatOnlineBadge"></div>
        </div>

        <span className="chatOnlineName">John Doe</span>
      </div>
    </div>
  );
}

export default ChatOnline;

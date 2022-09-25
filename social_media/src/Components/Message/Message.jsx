import React from "react";
import "./Message.css";

function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://images.pexels.com/photos/13570394/pexels-photo-13570394.jpeg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam ad
          sint mollitia iste accusantium possimus.
        </p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}

export default Message;

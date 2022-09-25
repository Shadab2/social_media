import React from "react";
import ChatOnline from "../../Components/ChatOnline/ChatOnline";
import Conversations from "../../Components/Conversations/Conversations";
import Message from "../../Components/Message/Message";
import Topbar from "../../Components/Topbar/Topbar";
import "./Messenger.css";

function Messenger() {
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for freinds"
              className="chatMenuInput"
            />
            <Conversations />
            <Conversations />
            <Conversations />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message own />
              <Message own />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message own />
            </div>
            <div className="chatBoxBottom">
              <textarea
                name=""
                id=""
                placeholder="write something..."
                className="chatMessageInput"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;

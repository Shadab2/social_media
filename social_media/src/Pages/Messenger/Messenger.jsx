import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../Components/ChatOnline/ChatOnline";
import Conversations from "../../Components/Conversations/Conversations";
import Message from "../../Components/Message/Message";
import Topbar from "../../Components/Topbar/Topbar";
import { AuthContext } from "../../Context/AuthContext";
import "./Messenger.css";

function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        setConversations(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.length === 0) {
      alert("Message cannot be empty");
      return;
    }
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post("/message", message);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (e) {
      console.log(e);
    }
  };

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
            {conversations.map((con) => (
              <div onClick={() => setCurrentChat(con)} key={con._id}>
                <Conversations conversation={con} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((msg) => {
                    return (
                      <div key={msg._id} ref={scrollRef}>
                        <Message message={msg} own={msg.sender === user._id} />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    name=""
                    id=""
                    placeholder="write something..."
                    className="chatMessageInput"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button
                    type="submit"
                    className="chatSubmitButton"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
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

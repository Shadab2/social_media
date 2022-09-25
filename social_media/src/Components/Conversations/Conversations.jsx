import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversations.css";

function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const freindId = conversation.members.find((m) => m != currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + freindId);
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        src={user.profilePicture || `${PF}/person/noAvatar.png`}
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user.username}</span>
    </div>
  );
}

export default Conversations;

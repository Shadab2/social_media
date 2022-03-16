import axios from "axios";
import React, { useEffect } from "react";
import "./CloseFriends.css";

function CloseFriends({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFreind" key={user.id}>
      <img src={`${PF}/${user.profilePicture}`} alt="" />
      <span>{user.username}</span>
    </li>
  );
}

export default CloseFriends;

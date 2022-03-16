import React from "react";
import "./CloseFriends.css";

function CloseFriends({ user }) {
  return (
    <li className="sidebarFreind" key={user.id}>
      <img src={`/assets/images/${user.profilePicture}`} alt="" />
      <span>{user.username}</span>
    </li>
  );
}

export default CloseFriends;

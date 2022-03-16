import React from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";

function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Feed;

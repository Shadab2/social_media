import React from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import { Posts } from "../../DummyData";
import "./Feed.css";

function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((item) => {
          return <Post key={item.id} post={item} />;
        })}
      </div>
    </div>
  );
}

export default Feed;

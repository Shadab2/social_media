import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import axios from "axios";
import "./Feed.css";

function Feed() {
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "/posts/timeline/all/623246f8a02835556588f5b6"
        );
        console.log(res.data);
        setPosts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((item) => {
          return <Post key={item._id} post={item} />;
        })}
      </div>
    </div>
  );
}

export default Feed;

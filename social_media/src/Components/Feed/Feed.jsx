import React, { useEffect, useState, useContext } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import axios from "axios";
import "./Feed.css";
import { AuthContext } from "../../Context/AuthContext";

function Feed() {
  const [Posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts/timeline/all/${user._id}`);
        console.log(res.data);
        setPosts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, [user._id]);
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

import "./Post.css";
import { useEffect, useState } from "react";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [liked, setLiked] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${post.userId}`);
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, [post.userId]);

  const handleLiked = () => {
    setLiked((prev) => 1 - prev);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={user.profilePicture || `${PF}/person/noAvatar.png`}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">{user.username} </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post.desc}</div>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className={`${liked ? `likedImg` : ""} likeIcon`}
              src={`${PF}/like.png`}
              alt=""
              onClick={handleLiked}
            />
            <img
              className="likeIcon"
              src={`${PF}/heart.png`}
              alt=""
              onClick={handleLiked}
            />
            <span className="postLikeCounter">{`${
              post.likes.length + liked
            } people liked this`}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">5 commnets</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./Post.css";
import { useContext, useEffect, useState } from "react";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user._id}`}>
              <img
                src={user.profilePicture || `${PF}/person/noAvatar.png`}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username} </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post.desc}</div>
          <img
            className="postImg"
            src={post.img.includes("http") ? post.img : `${PF}/${post.img}`}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className={`${isLiked ? `likedImg` : ""} likeIcon`}
              src={`${PF}/like.png`}
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={`${PF}/heart.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people liked this</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">5 commnets</span>
          </div>
        </div>
      </div>
    </div>
  );
}

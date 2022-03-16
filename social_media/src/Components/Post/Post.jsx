import "./Post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../DummyData";
import { useState } from "react";

export default function Post({ post }) {
  const [liked, setLiked] = useState(0);
  const user = Users.find((user) => user.id === post.userId);

  const handleLiked = () => {
    setLiked((prev) => 1 - prev);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={`/assets/images/${user.profilePicture}`}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">Robert </span>
            <span className="postDate">12 January 2021</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post.desc}</div>
          <img
            className="postImg"
            src={`/assets/images/${post.photo}`}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className={`${liked ? `likedImg` : ""} likeIcon`}
              src="/assets/images/like.png"
              alt=""
              onClick={handleLiked}
            />
            <img
              className="likeIcon"
              src="/assets/images/heart.png"
              alt=""
              onClick={handleLiked}
            />
            <span className="postLikeCounter">{`${
              post.like + liked
            } people liked this`}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{`${post.comment} comments`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

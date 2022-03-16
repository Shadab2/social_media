import "./Post.css";
import { MoreVert } from "@material-ui/icons";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src="/assets/images/person/2.jpeg"
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
          <div className="postText">This is Awesome</div>
          <img className="postImg" src="/assets/images/post/1.jpeg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/images/like.png" alt="" />
            <img className="likeIcon" src="/assets/images/heart.png" alt="" />
            <span className="postLikeCounter">100 people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">200 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

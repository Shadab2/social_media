import { EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./Share.css";

function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [file, setfile] = useState(null);
  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user.profilePicture || `${PF}/person/noAvatar.png`}
            alt="person"
            className="shareProfileImg"
          />
          <input
            type="text"
            placeholder={`What's in your mind ${user.username.split(" ")[0]} ?`}
            className="shareInput"
            minLength={3}
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <input
                type="file"
                accept=".png,.jpeg,.jpg"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setfile(e.target.files[0])}
              />
              <span className="shareOptionText">Photo/Video</span>
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Locations</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
}

export default Share;

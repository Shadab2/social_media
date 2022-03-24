import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Feed from "../../Components/Feed/Feed";
import RightBar from "../../Components/RightBar/RightBar";
import axios from "axios";
import "./Profile.css";
import { useParams } from "react-router-dom";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { userId } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/profile/${userId}`);
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture || `${PF}/person/noCover.png`}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={user.profilePicture || `${PF}/person/noAvatar.png`}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

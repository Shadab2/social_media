import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Feed from "../../Components/Feed/Feed";
import RightBar from "../../Components/RightBar/RightBar";
import "./Profile.css";
function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={`${PF}/post/3.jpeg`}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={`${PF}/person/2.jpeg`}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Robert Donwney</h4>
              <span className="profileInfoDesc">
                Genius | Billionare | Philanthropist | Iron Man{" "}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <RightBar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

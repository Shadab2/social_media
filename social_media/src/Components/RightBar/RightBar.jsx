import "./Rightbar.css";
import Online from "../Online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { Users } from "../../DummyData";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}/gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}/ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
    const [freinds, setFreinds] = useState([]);
    useEffect(() => {
      const getFreinds = async () => {
        try {
          const res = await axios.get("/users/freinds/" + user._id);
          setFreinds(res.data);
        } catch (e) {
          console.log(e.message);
        }
      };
      getFreinds();
    }, [user]);
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">US</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Married</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {freinds.map((freind) => {
            return (
              <Link
                to={`/profile/${freind._id}`}
                className="rightbarFollowing"
                key={freind._id}
              >
                <img
                  src={freind.profilePicture || `${PF}/person/noAvatar.png`}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{freind.username}</span>
              </Link>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

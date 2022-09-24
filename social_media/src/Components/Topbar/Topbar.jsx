import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <SearchBar PF={PF} />
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link
          style={{ textDecoration: "none" }}
          to={`/profile/${user.username}`}
        >
          <img
            src={user.profilePicture || `${PF}/person/noAvatar.png`}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

const SearchBar = ({ PF }) => {
  const [value, setValue] = useState("");
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();

  const searchPeople = async () => {
    if (value.length <= 3) return;
    try {
      setTimeout(async () => {
        const res = await axios.get(`/users/search?name=${value}`);
        setPeople(res.data);
      }, 1000);
    } catch (e) {}
  };

  const handleClick = (user) => {
    setPeople([]);
    navigate(`/profile/${user.username}`);
  };

  return (
    <div className="searchbar">
      <Search className="searchIcon" />
      <input
        placeholder="Search for friend, post or video"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          searchPeople();
        }}
        className="searchInput"
      />
      {people.length > 0 && (
        <div className="searchbar-people">
          {people.map((user) => {
            return (
              <li
                className="searchbar-people-list"
                onClick={() => handleClick(user)}
              >
                <img
                  src={user.profilePicture || `${PF}/person/noAvatar.png`}
                  alt=""
                  className="topbarImg"
                />
                <p>{user.username}</p>
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};

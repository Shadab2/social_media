import React, { useContext } from "react";
import "./home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Feed from "../../Components/Feed/Feed";
import RightBar from "../../Components/RightBar/RightBar";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (!user) return <Navigate to="/login" />;
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}

export default Home;

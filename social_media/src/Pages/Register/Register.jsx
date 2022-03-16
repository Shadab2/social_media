import React from "react";
import "./Register.css";

function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">Connect With Us and Share !</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input type="text" placeholder="Email" className="loginInput" />
            <input type="text" placeholder="Username" className="loginInput" />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="loginInput"
            />
            <button className="loginRegisterButton">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

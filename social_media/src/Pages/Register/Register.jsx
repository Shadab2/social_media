import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Login() {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      console.log(password.current.value + " " + confirmPassword.current.value);
      confirmPassword.current.setCustomValidity("Password don't match`");
      return;
    }
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      await axios.post("/auth/register", user);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">Connect With Us and Share !</span>
        </div>
        <div className="loginRight" onSubmit={handleSubmit}>
          <form className="loginBox">
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="loginInput"
              required
            />
            <input
              ref={username}
              type="text"
              placeholder="Username"
              className="loginInput"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              required
              minLength={3}
              ref={password}
            />
            <input
              ref={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="loginInput"
              required
            />
            <button className="loginRegisterButton">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

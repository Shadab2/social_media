import React, { useContext, useRef } from "react";
import { LoginCall } from "../../ApiCalls";
import { AuthContext } from "../../Context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    LoginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">Connect With Us and Share !</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              ref={email}
              placeholder="Email"
              className="loginInput"
            />
            <input
              type="password"
              placeholder="Password"
              ref={password}
              required
              minLength={3}
              className="loginInput"
            />
            <button className="loginButton">
              {isFetching ? (
                <CircularProgress size="20px" color="secondary" />
              ) : (
                "LOGIN"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link className="loginRegisterButton" to="/register">
              {isFetching ? (
                <CircularProgress size="20px" color="secondary" />
              ) : (
                "REGISTER"
              )}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

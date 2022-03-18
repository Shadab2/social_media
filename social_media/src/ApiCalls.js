import axios from "axios";
export const LoginCall = async (userCred, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCred);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: "LOGIN_FAIL", payload: e.message });
  }
};

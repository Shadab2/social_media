import React, { useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "62324b8c3e7476be9562e83d",
    username: "Engin Altan",
    email: "Engin@gmail.com",
    password: "$2b$10$./szkDFtUjgUMipoAPh9cOrKXTAygZDsE7alZQJfCHYdws/tpH1JK",
    profilePicture:
      "https://i.pinimg.com/236x/c1/f6/8c/c1f68cb70d15cb24381a9c38bb2978df.jpg",
    coverPicutre: "",
    followers: [],
    following: [],
    isAdmin: false,
  },
  isFetching: false,
  error: null,
};

export const AuthContext = React.createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const { user, isFetching, error } = state;
  console.log(state);
  return (
    <AuthContext.Provider value={{ user, isFetching, error, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

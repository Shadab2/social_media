import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Messenger from "./Pages/Messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route exact path="/profile/:username" element={<Profile />} />
        </Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;

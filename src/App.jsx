import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Homes from "./pages/Home";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  // const navigate = useNavigate();

  // const { loginResponse } = useAuth();
  // let role;
  // let decoded;

  // if (loginResponse) {
  //   const token = loginResponse;

  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //   decoded = jwtDecode(token);

  //   const currentTime = Date.now() / 1000;
  //   if (decoded.exp < currentTime) {
  //     localStorage.removeItem("user-handbook");
  //     setTimeout(() => {
  //       navigate("/");
  //       window.location.reload();
  //     }, 100);
  //   }
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<Homes />} />
      </Routes>
    </>
  );
}

export default App;

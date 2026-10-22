
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";

import "./App.css";
import OtpVerify from "./pages/OtpVerify/OtpVerify";
import AdminLayots from "./components/admin/adminLayots";
import UserLayouts from "./components/layouts/UserLayouts";

function App() {
  return (
    <>
      

      <Routes>
        {/* user Layouts */}
        <Route path="/" element={<UserLayouts />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-OTP" element={<OtpVerify />} />
        </Route>


        <Route path="/admin" element={<AdminLayots />}>{/*Admin Layots*/}

        </Route>

      </Routes>

      
    </>
  );
}

export default App;

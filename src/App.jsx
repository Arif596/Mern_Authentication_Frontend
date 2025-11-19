import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./Store/Context";
import axios from "axios";
import OtpVerification from "./pages/OtpVerification";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/password/forget" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/otp-verfication/:email/:phone" element={<OtpVerification />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer theme="colored"/>
      </Router>
    </>
  );
};

export default App;

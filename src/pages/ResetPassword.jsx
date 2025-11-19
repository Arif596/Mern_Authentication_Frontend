import React, { useContext, useState } from "react";
import "../styles/ResetPassword.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../Store/Context";

const ResetPassword = () => {
  const newContext = useContext(Context);
  if (!newContext) {
    return <div>Loading....</div>;
  }
  const { isAuthenticated, setIsAuthenticated, user, setUser } = newContext;
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset Password failed");
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="reset-password-page">
        <div className="reset-password-container">
          <h2>Rest Password</h2>
          <p>Enter Your new Password Below</p>
          <form className="reset-password-form" onSubmit={handleResetPassword}>
            <input
              type="password"
              className="reset-input"
              placeholder="Enter new Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="reset-input"
              value={confirmPassword}
              placeholder="Enter Confirm new Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="reset-btn" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

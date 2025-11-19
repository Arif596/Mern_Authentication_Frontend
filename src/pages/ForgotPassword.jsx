import React, { useContext, useState } from "react";
import "../styles/ForgotPassword.css";
import { Context } from "../Store/Context";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { isAuthenticated } = useContext(Context);

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post( // Use POST if backend expects
        "http://localhost:4000/api/v1/user/password/forget",
        { email },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Forgot Password failed");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your email address to receive a password reset token</p>
        <form
          className="forgot-password-forms"
          onSubmit={handleForgetPassword}
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgot-input"
          />
          <button className="forgot-btn" type="submit">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

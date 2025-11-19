import React, { useContext, useState } from "react";
import "../styles/Auth.css";
import { Navigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { Context } from "../Store/Context";

const Auth = () => {
  const context = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);

  // Safety check - if context is undefined
  if (!context) {
    console.error("Context is not available. Make sure ContextProvider is properly set up.");
    return <div>Loading...</div>;
  }

  const { isAuthenticated } = context;

  console.log("isAuthenticated:", isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-toggle">
          <button
            onClick={() => setIsLogin(true)}
            className={`toggle-btn ${isLogin ? "active" : ""}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
          >
            Register
          </button>
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;
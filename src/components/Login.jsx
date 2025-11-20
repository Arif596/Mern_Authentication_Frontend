import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Store/Context";

const Login = () => {
  const navigateTo = useNavigate();
  const context = useContext(Context);
  
  // Safety check
  if (!context) {
    return <div>Loading...</div>;
  }

  const { setIsAuthenticated, setUser } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        "https://mern-stack-auth-bckend.vercel.app/api/v1/user/login", 
        data, 
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit(handleLogin)}
    >
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <span className="error">{errors.email.message}</span>}
      
      <input
        type="password"
        placeholder="Enter Password"
        {...register("password", { required: "Password is Required" })}
      />
      {errors.password && <span className="error">{errors.password.message}</span>}
      
      <p className="forgot-password">
        <Link to={"/password/forget"}>Forgot Your Password</Link>
      </p>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
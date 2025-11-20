import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../Store/Context";
import { toast } from "react-toastify";

const Register = () => {
  const navigateTo = useNavigate();
  const newContext = useContext(Context);
  if (!newContext) {
    return (
      <>
        <div>Loading....</div>
      </>
    );
  }
  const { isAuthenticated } = newContext;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = async (data) => {
    data.phone = `+92${data.phone}`;
    await axios
      .post("https://mern-stack-auth-bckend.vercel.app/api/v1/user/register", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        navigateTo(`/otp-verfication/${data.email}/${data.phone}`);
      })
      .catch((errors) => {
        toast.error(errors.response.data.message);
      });
  };
  return (
    <>
      <div>
        <form className="auth-form" onSubmit={handleSubmit((data) => handleRegister(data))}>
          <h2>Regsiter</h2>
          <input
            type="text"
            placeholder="Enter Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
          <input
            type="text"
            placeholder="Enter Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
          <div>
            <span>+92</span>
            <input
              type="number"
              placeholder="Phone"
              {...register("phone", { required: "Phone is Required" })}
            />
            {errors.phone && (
              <span className="error">{errors.phone.message}</span>
            )}
          </div>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", { required: "Password is Required" })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <div className="verification-method">
            <p>Select verification Method</p>
            <div className="wrapper">
              <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value={"email"}
                  {...register("verificationMethod")}
                  required
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value={"phone"}
                  {...register("verificationMethod")}
                  required
                />
                Phone
              </label>
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;

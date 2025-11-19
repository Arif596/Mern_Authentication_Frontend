import React, { useContext } from "react";
import { Context } from "../Store/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success("Logout Successfully");
      setIsAuthenticated(false);
      setUser(null);
      navigate("/auth");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout Failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Authentication
        </Link>

        <div className="ms-auto d-flex align-items-center">
          {!isAuthenticated ? (
            <Link to="/auth" className="btn btn-primary px-4 fw-semibold">
              Login / Register
            </Link>
          ) : (
            <>
              <span className="me-3 fw-semibold text-dark">
                {user?.name || "User"}
              </span>
              <Link to="/profile" className="btn btn-outline-primary me-2">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger fw-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

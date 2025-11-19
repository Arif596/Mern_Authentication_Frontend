import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store/Context";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useContext(Context);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  // ✅ Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/get-user", {
        withCredentials: true,
      });
      setProfile(res.data.user);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
      setLoading(false);
    }
  };

  // ✅ Run once on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ Handle file select
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("userId", profile._id);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/upload-profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      <div className="row mt-4">
        <div className="col-md-4 text-center">
          <img
            src={
              profile.profilePic
                ? `http://localhost:4000${profile.profilePic}`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="img-fluid rounded-circle mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <form onSubmit={handleUpload}>
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mb-2"
            />
            <button type="submit" className="btn btn-primary w-100">
              Upload Profile Picture
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{profile.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{profile.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{profile.phone}</td>
              </tr>
              <tr>
                <th>Verified</th>
                <td>{profile.accountVerified ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Profile;

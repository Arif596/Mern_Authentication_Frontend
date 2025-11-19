import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/get-all-users", {
        withCredentials: true,
      });
      console.log('Api Response',res)
      setUsers(res.data.user);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
  <h2 className="mb-4">Users List</h2>
  <table className="table table-bordered table-striped">
    <thead className="table-dark">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Verified</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={user._id}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.accountVerified ? "Yes" : "No"}</td>
          <td>{new Date(user.createdAt).toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
};

export default Home;

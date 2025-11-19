import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/user/get-user", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchUser(); // ✅ Call the function here
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

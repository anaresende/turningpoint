import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  const [user, setUser] = useState(null);

  const verifyStoredToken = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data;
          setUser(user);
          setIsAdmin(user?.role === "admin");
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setUser(null);
          setIsAdmin(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  const logInUser = (token) => {
    localStorage.removeItem("authToken");
    localStorage.setItem("authToken", token);
    verifyStoredToken();
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");

    setIsLoggedIn(false);
    setUser(null);
  };

  const verifyUser = (code) => {
    return axios.get(`${API_URL}/auth/confirm/${code}`).then((response) => {
      return response.data;
    });
  };

  useEffect(() => {
    verifyStoredToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        logInUser,
        logOutUser,
        verifyUser,
        isAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };

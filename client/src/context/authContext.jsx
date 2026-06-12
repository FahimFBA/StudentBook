import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { demoAuth } from "../demo/demoApi";
import { isDemoMode } from "../config";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const login = async (inputs) => {
    const res = isDemoMode
      ? await demoAuth.login(inputs)
      : await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8800/api/"}auth/login`,
          inputs,
          {
            withCredentials: true,
          }
        );
    setCurrentUser(res.data);
  };

  const clearUser = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
      return;
    }

    localStorage.removeItem("user");
  }, [currentUser]);

  return (
    <AuthContext value={{ currentUser, login, clearUser }}>
      {children}
    </AuthContext>
  );
};

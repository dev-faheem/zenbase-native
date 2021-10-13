import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check async storage if user was logged in previously
    // If user exists, then load the user into global state
  }, []);

  const login = (_user) => {
    setUser(_user);
    setIsLoggedIn(true);
    // Save user to async storage
  };

  const logout = () => {
    setUser();
    setIsLoggedIn(false);
    // Remove user from async storage
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

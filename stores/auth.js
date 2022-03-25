import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "services/axios";
import Transactions from "stores/transactions";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [secondsWorth, setSecondsWorth] = useState(0.000001);

  useEffect(() => {
    // Check async storage if user was logged in previously
    // If user exists, then load the user into global state
    fetchLatestTokenWorth();
  }, []);

  const fetchLatestTokenWorth = async () => {
    const { data } = await axios.get("/transactions/currency");
    setSecondsWorth(data.data.secondWorth);
  };

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

  const giveToken = async (amount, reason) => {
    if (!isLoggedIn) return;
    try {
      // Refactor to new Transactions Systems
    } catch (e) {
      axios.handleError(e);
    }
  };

  const updateUser = async (field, value) => {
    if (!isLoggedIn) return;
    try {
      await axios.patch("/auth/" + field, { value });
      setUser({ ...user, [field]: value });
    } catch (e) {
      axios.handleError(e);
    }
  };

  const updateUserLocal = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        giveToken,
        updateUser,
        updateUserLocal,
        transactions: Transactions(user),
        secondsWorth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

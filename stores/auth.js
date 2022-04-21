import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "services/axios";
import Transactions from "stores/transactions";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [secondsWorth, setSecondsWorth] = useState(0.000001);
  const [transactions, setTransactions] = useState([]);
  const [walletAmount, setWalletAmount] = useState(0);

  useEffect(() => {
    // Check async storage if user was logged in previously
    // If user exists, then load the user into global state
    fetchLatestTokenWorth();
  }, []);

  useEffect(() => {
    if (user != null) {
      fetchTransactions();
    }
  }, [user]);

  const fetchLatestTokenWorth = async () => {
    const { data } = await axios.get("/transactions/currency");
    setSecondsWorth(data.data.secondWorth);
  };

  const fetchTransactions = async () => {
    const { data } = await axios.get("/transactions");
    setTransactions(data.data.transactions);
    setWalletAmount(data.data.amount);
  };

  const login = async (_user) => {
    setUser(_user);
    setIsLoggedIn(true);
    axios.interceptors.request.use((config) => {
      config.headers.authorization = _user?.token;
      return config;
    });
    // Save user to async storage
    const serializedUser = JSON.stringify(_user);
    await AsyncStorage.setItem("@zenbase_user", serializedUser);
  };

  const logout = async () => {
    setUser();
    setIsLoggedIn(false);
    // Remove user from async storage
    await AsyncStorage.removeItem("@zenbase_user");
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
        walletAmount,
        zenTransactions: transactions,
        fetchTransactions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

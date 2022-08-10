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
    if (user != null) {
      fetchLatestTokenWorth();
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
    await AsyncStorage.setItem("recents", JSON.stringify(_user?.recentlyPlayed || []));
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

  const updateUser = async (field, value, updateState = true) => {
    if (!isLoggedIn) return;
    try {
      if (updateState) {
        const userData = { ...user, [field]: value };
        await setUser(userData);
        await AsyncStorage.setItem("@zenbase_user", JSON.stringify(userData));
      }
      await axios.patch("/auth/" + field, { value });
    } catch (e) {
      axios.handleError(e);
    }
  };

  const updateUserLocal = async (field, value) => {
    await setUser({ ...user, [field]: value });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser,
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
        fetchLatestTokenWorth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

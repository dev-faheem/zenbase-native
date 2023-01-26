import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "services/axios";
import api from "services/api";
import Transactions from "stores/transactions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTimer as useTimerLib } from "react-timer-hook";
const PassiveEarning = createContext();

export const usePassiveEarning = () => {
  return useContext(PassiveEarning);
};

export const PassiveEarningProvider = ({ children }) => {
  const [passiEarningRunning, setPassiEarningRunning] = useState(false);
  const [passiEarningStartTime, setPassiEarningStartTime] = useState("");
  const secondsInOneDay = 86400;
  const allSeconds = secondsInOneDay;

  const time = new Date();
  time.setSeconds(time.getSeconds() + allSeconds);
  // const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimerLib({

  const timerLib = useTimerLib({
    expiryTimestamp: time,
    onExpire: () => console.log("End"),
  });

  const passiveEarningStart = async () => {
    const startDate = new Date();
    await AsyncStorage.setItem("passiveEarnStartDate", startDate);
  };
  const passiveEarningEnd = () => {};

  useEffect(() => {
    (async () => {
      try {
        let getpassiveEarnStartDate = await AsyncStorage.getItem("passiveEarnStartDate");
        if (await AsyncStorage.getItem(getpassiveEarnStartDate)) {
          setPassiEarningStartTime(getpassiveEarnStartDate);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const contextProps = {
    passiEarningRunning,
    passiveEarningStart,
    passiveEarningEnd,
    setPassiEarningRunning,
    timerLib,
  };

  return <PassiveEarning.Provider value={contextProps}>{children}</PassiveEarning.Provider>;
};

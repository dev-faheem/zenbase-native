import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "services/axios";
import api from "services/api";
import Transactions from "stores/transactions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTimer as useTimerLib } from "react-timer-hook";
import { useAuth } from "./auth";
const PassiveEarning = createContext();

export const usePassiveEarning = () => {
  return useContext(PassiveEarning);
};

const passiveEarnEndDateEnum = "passiveEarnEndDate";

export const PassiveEarningProvider = ({ children }) => {
  const { secondsWorth } = useAuth();
  const [startDateState, setStartDateState] = useState("");
  const [endDateState, setEndDateState] = useState("");
  const [passiEarningRunning, setPassiEarningRunning] = useState(false);

  // const secondsInOneDay = 86400;
  // const allSeconds = secondsInOneDay;

  // const time = new Date();
  // time.setSeconds(time.getSeconds() + allSeconds);
  // const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimerLib({
  let allSeconds = 0;
  const start = new Date();

  const AMOUNT_OF_ZENTOKENS_TO_GIVE = secondsWorth * 60 * 60 * 0.025;

  const CURRENT_VALUE_OF_SECONDS_WORTH = "Passive earning";

  const transactions = async () => {
    await axios.post("/transactions", {
      amount: AMOUNT_OF_ZENTOKENS_TO_GIVE,
      appreciatedFor: CURRENT_VALUE_OF_SECONDS_WORTH,
      type: "PASSIVE_EARNING",
      remarks: "",
    });
  };

  const timerLib = useTimerLib({
    expiryTimestamp: start + 86400,
    onExpire: () => {
      if (endDateState) {
        transactions();
        passiveEarningEndWithToken();
      }
    },
  });

  function initialStart(endDate) {
    const startNew = new Date();
    const end = new Date(endDate);
    let newAllSeconds = Math.abs(startNew - end) / 1000;
    // console.log("endDate " + endDate + " newAllSeconds " + newAllSeconds);
    // alert(
    //   "startNew " +
    //     startNew +
    //     " endDate " +
    //     endDate +
    //     " newAllSeconds " +
    //     Math.abs(startNew - end) / 1000
    // );
    const time = new Date();
    time.setSeconds(time.getSeconds() + newAllSeconds);
    timerLib.restart(time);
  }
  const passiveEarningStart = async () => {
    // const startDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    // setStartDateState(startDate);
    const finalEndDate = JSON.parse(JSON.stringify(endDate));
    setEndDateState(finalEndDate);
    await AsyncStorage.setItem(passiveEarnEndDateEnum, finalEndDate);
    initialStart(finalEndDate);
    setPassiEarningRunning(true);
  };

  const passiveEarningEndWithToken = async () => {
    await AsyncStorage.removeItem(passiveEarnEndDateEnum);
  };

  useEffect(() => {
    (async () => {
      try {
        let passiveEarnEndDate = await AsyncStorage.getItem(passiveEarnEndDateEnum);
        if (passiveEarnEndDate) {
          // alert("qwer" + passiveEarnEndDate + " poiuy " + "" + passiEarningRunning);
          setEndDateState(passiveEarnEndDate);
          setPassiEarningRunning(true);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (endDateState && passiEarningRunning) {
      // alert("ras" + endDateState + " fg " + "" + passiEarningRunning);
      // alert("endDateState" + endDateState + " passiEarningRunning " + passiEarningRunning);
      const currentDate = new Date();
      const storeDate = new Date(endDateState);
      if (currentDate.getTime() < storeDate.getTime()) {
        initialStart(endDateState);
      } else {
        passiveEarningEndWithToken();
      }
    }
  }, [endDateState, passiEarningRunning]);

  // console.log("qwe", { endDateState, passiEarningRunning });
  const contextProps = {
    passiEarningRunning,
    passiveEarningStart,
    // passiveEarningEnd,
    passiveEarningEndWithToken,
    setPassiEarningRunning,
    timerLib,
  };

  return <PassiveEarning.Provider value={contextProps}>{children}</PassiveEarning.Provider>;
};

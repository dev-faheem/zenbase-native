import styled from "styled-components/native";
import AmbientSound from "./ambientSound";
import { timerBellListData } from "./config";
import { TimerContext } from "./contex";
import IntervalBell from "./intervalBell";
import TimerBellList from "./timerBellList";
import Actions from "./actions";
import TimeSelection from "./timeSelection";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { TIMER_STATUS_INITIAL } from "./keys";
import { Text, AnimatedHeaderView, Container } from "components";
import Header from "./header";
import Counter from "./counter";
import Canvas from "../../components/canvas";
import { Audio } from "expo-av";
import config from "../../config";
import AmbientSoundSelection from "./ambientSoundSelection";

import { useTimer as useTimerLib } from "react-timer-hook";
import useAudioSound from "hooks/useAudioSound";

let audio = new Audio.Sound();

export default function Timer() {
  const initial = [
    { id: "hour", value: 1 },
    { id: "min", value: 0 },
    { id: "second", value: 0 },
  ];

  const [selectedTime, setSelectedTime] = useState(initial);

  const allSeconds =
    selectedTime[0].value * 60 * 60 + selectedTime[1].value * 60 + selectedTime[2].value;
  const time = new Date();
  time.setSeconds(time.getSeconds() + allSeconds);
  const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimerLib({
    expiryTimestamp: time,
    onExpire: () => console.log("onExpire called"),
  });

  const audioUrl = "http://development.zenbase.us/uploads/1669332859414-924275594.mp3";

  const {
    playAudio: ambient_playAudio,
    pauseAudio: ambient_pauseAudio,
    resumeAudio: ambient_resumeAudio,
    exitAudio: ambient_exitAudio,
  } = useAudioSound(audioUrl);

  // const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
  //   expiryTimestamp: time,
  //   onExpire: () => console.log("onExpire called"),
  // });

  // console.log(
  //   JSON.stringify(
  //     { seconds, minutes, hours, days, isRunning, start, pause, resume, restart },
  //     null,
  //     2
  //   )
  // );

  const [selectedBell, setSelectedBell] = useState(timerBellListData[1]?.id);
  const [timerStatus, setTimerStatus] = useState(TIMER_STATUS_INITIAL);
  const [ambientSoundSelection, setAmbientSoundSelection] = useState(false);
  const [selectedAmbientSound, setselectedAmbientSound] = useState(null);

  const contextProps = {
    timerBellListData,
    selectedBell,
    setSelectedBell,
    timerStatus,
    setTimerStatus,
    ambientSoundSelection,
    setAmbientSoundSelection,
    selectedAmbientSound,
    setselectedAmbientSound,
    ambient_playAudio,
    ambient_pauseAudio,
    ambient_resumeAudio,
    ambient_exitAudio,
    time,
    allSeconds,
    timeLib: { seconds, minutes, hours, days, isRunning, start, pause, resume, restart },
    selectedTime,
    setSelectedTime,
  };

  const mainView = () => (
    <AnimatedHeaderView
      previousScreenName="Timer"
      header={<Header title={"Timer"} />}
      inputRange={[10, 50]}
    >
      <Header />
      <Container>
        {/* <Test onPress={() => playSong()} />
        <Test onPress={() => pause()} /> */}
        <Title>Timer</Title>
      </Container>
      <Wrapper>
        <TimerBellList />
        <Container>
          <TimeSelection />
          <IntervalBell />
          <AmbientSound />
          <Actions />
        </Container>
      </Wrapper>
    </AnimatedHeaderView>
  );
  const startedView = () => (
    <Canvas>
      <Wrapper>
        <Container>
          <Counter />
          <Actions />
        </Container>
      </Wrapper>
    </Canvas>
  );

  // alert(config.API_URL);
  // console.log({ test: config.API_URLM });
  // start, pause, resume, restart;

  return (
    <>
      {/* <Test onPress={playAudio} /> */}
      <TimerContext.Provider value={contextProps}>
        {ambientSoundSelection ? (
          <AmbientSoundSelection />
        ) : timerStatus === TIMER_STATUS_INITIAL ? (
          mainView()
        ) : (
          startedView()
        )}
      </TimerContext.Provider>
    </>
  );
}

const Wrapper = styled.View``;
const Test = styled.TouchableOpacity`
  width: 100px;
  height: 20px;
  background: red;
  margin-top: 50px;
  margin-left: 30px;
`;

const Title = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme: { getSize } }) => getSize(32)}px;
  line-height: ${({ theme: { getSize } }) => getSize(38)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(17)}px;
`;

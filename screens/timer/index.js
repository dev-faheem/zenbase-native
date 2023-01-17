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
let audio = new Audio.Sound();

export default function Timer() {
  const navigation = useNavigation();
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
  };

  const audioUrl = "https://development.zenbase.us/uploads/1669332859414-924275594.mp3";

  const playSong = async (data) => {
    try {
      // await audio.unloadAsync();
      await audio.loadAsync({
        uri: audioUrl,
      });
      await audio.playAsync();
      alert("***qwer");

      // await audio.setVolumeAsync(previousVolumeRef.current);
      await audio.setVolumeAsync(1.0);
    } catch (e) {
      console.log({ e });
      alert("Something went wrong!");
      // navigation.goBack();
    }
  };

  const pause = async (data) => {
    await audio.pauseAsync();
  };
  // const pause = async (data) => {
  //   await audio.playAsync();
  // };

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

  return (
    <TimerContext.Provider value={contextProps}>
      {ambientSoundSelection ? (
        <AmbientSoundSelection />
      ) : timerStatus === TIMER_STATUS_INITIAL ? (
        mainView()
      ) : (
        startedView()
      )}
    </TimerContext.Provider>
  );
}

const Wrapper = styled.View``;
const Test = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  background: red;
`;

const Title = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme: { getSize } }) => getSize(32)}px;
  line-height: ${({ theme: { getSize } }) => getSize(38)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(17)}px;
`;

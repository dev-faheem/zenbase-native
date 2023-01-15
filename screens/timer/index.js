import styled from "styled-components/native";
import AmbientSound from "./ambientSound";
import { timerBellListData } from "./config";
import { TimerContext } from "./contex";
import IntervalBell from "./intervalBell";
import TimerBellList from "./timerBellList";
import Actions from "./actions";
import TimeSelection from "./timeSelection";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { TIMER_STATUS_INITIAL } from "./keys";
import { Text, AnimatedHeaderView, Container } from "components";
import Header from "./header";
import Counter from "./counter";
import Canvas from "../../components/canvas";

export default function Timer() {
  const navigation = useNavigation();
  const [selectedBell, setSelectedBell] = useState(timerBellListData[1]?.id);

  const [timerStatus, setTimerStatus] = useState(TIMER_STATUS_INITIAL);

  const contextProps = {
    timerBellListData,
    selectedBell,
    setSelectedBell,
    timerStatus,
    setTimerStatus,
  };

  const mainView = () => (
    <AnimatedHeaderView
      previousScreenName="Timer"
      header={<Header title={"Timer"} />}
      inputRange={[10, 50]}
    >
      <Header />
      <Container>
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

  return (
    <TimerContext.Provider value={contextProps}>
      {timerStatus === TIMER_STATUS_INITIAL ? mainView() : startedView()}
    </TimerContext.Provider>
  );
}

const Wrapper = styled.View``;

const Title = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme: { getSize } }) => getSize(32)}px;
  line-height: ${({ theme: { getSize } }) => getSize(38)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(17)}px;
`;

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

export default function Timer() {
  const navigation = useNavigation();

  const [timerStatus, setTimerStatus] = useState(TIMER_STATUS_INITIAL);

  return (
    <AnimatedHeaderView
      previousScreenName="Timer"
      header={<Header title={"Timer"} />}
      inputRange={[10, 50]}
    >
      <Header />
      <Container>
        <Title>Timer</Title>
      </Container>
      <TimerContext.Provider value={{ timerStatus, setTimerStatus }}>
        <Wrapper>
          <TimerBellList timerBellListData={timerBellListData} />
          <Container>
            <TimeSelection />
            <IntervalBell />
            <AmbientSound />
            <Actions />
          </Container>
        </Wrapper>
      </TimerContext.Provider>
    </AnimatedHeaderView>
  );
}

const Wrapper = styled.View``;

const Title = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme: { getSize } }) => getSize(32)}px;
  line-height: ${({ theme: { getSize } }) => getSize(38)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(17)}px;
`;

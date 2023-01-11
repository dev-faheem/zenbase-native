import Canvas from "components/canvas";
import styled from "styled-components/native";
import { Container } from "components";
import AmbientSound from "./ambientSound";
import { timerBellListData } from "./config";
import { TimerContext } from "./contex";
import IntervalBell from "./intervalBell";
import TimerBellList from "./timerBellList";
import Actions from "./actions";
import TimeSelection from "./timeSelection";

export default function Timer() {
  return (
    <Canvas>
      <TimerContext.Provider value={{}}>
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
    </Canvas>
  );
}

const Wrapper = styled.View``;

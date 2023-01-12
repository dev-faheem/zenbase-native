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
import { useNavigation } from "@react-navigation/core";

export default function Timer() {
  const navigation = useNavigation();
  return (
    <Canvas>
      <TempHome onPress={() => navigation.navigate("Home")} />
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

//Will Remove
const TempHome = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  background: red;
`;

import { useAuth } from "stores/auth";
import ZentTokenBanner from "components/zent-token-banner";
import Canvas from "components/canvas";
import { useTimer } from "../contex";
import Text from "components/text";
import styled from "styled-components/native";
import BellIconCard from "../timerBellList/bellIconCard";
import { Octicons } from "@expo/vector-icons";
import logo from "assets/logos/zentoken-flat-circle-logo.png";
import { useEffect, useState } from "react";
import Button from "components/button";
import { Container } from "components";
import { Dimensions } from "react-native";
import { Box } from "../../../components";
import { TIMER_STATUS_INITIAL } from "../keys";

const windowHeight = Dimensions.get("window").height;

export default function TimerEarned(props) {
  const { walletAmount, zenTransactions, fetchTransactions } = useAuth();
  const {
    timerBellListData = [],
    selectedBell,
    setSelectedBell = () => {},
    time,
    timeLib,
    allSeconds,
    timeInput,
    setTimeInput,
    setTimerStatus,
    setEarnView,
  } = useTimer();
  const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = timeLib;

  const selectedBellListIndex = timerBellListData?.findIndex(({ id }) => id === selectedBell);
  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <Wrapper>
          <ZentTokenBanner
            tokens={Number(walletAmount).toFixed(6)}
            usd={0}
            onPress={() => {
              // navigation.navigate("ZentDonation");
            }}
          />

          <BellIconWrapper>
            <BellIconCard {...timerBellListData[selectedBellListIndex]} title="Timer • 52 min" />
          </BellIconWrapper>
          <NormalView>
            <YouEarned>You’ve earned it.</YouEarned>
            <YouEarned style={{ marginBottom: 12 }}>0.0255 ZENT</YouEarned>

            <Button
              title={"Claim to wallet"}
              block
              onPress={() => {
                setEarnView(false);
                setTimerStatus(TIMER_STATUS_INITIAL);
              }}
            />
          </NormalView>
        </Wrapper>
      </Container>
    </Canvas>
  );
}
const Wrapper = styled.View`
  width: 100%;

  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const BellIconWrapper = styled.View`
  margin-bottom: ${({ theme: { getSize } }) => getSize(81)}px;
`;

const YouEarned = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme: { getSize } }) => getSize(32)}px;
  line-height: ${({ theme: { getSize } }) => getSize(38.19)}px;
`;

const NormalView = styled.View``;

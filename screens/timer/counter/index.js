import Text from "components/text";
import styled from "styled-components/native";
import { useTimer } from "../contex";
import BellIconCard from "../timerBellList/bellIconCard";
import { Octicons } from "@expo/vector-icons";
import logo from "assets/logos/zentoken-flat-circle-logo.png";

export default function Counter() {
  const { timerBellListData = [], selectedBell, setSelectedBell = () => {} } = useTimer();
  const selectedBellListIndex = timerBellListData?.findIndex(({ id }) => id === selectedBell);
  return (
    <Wrapper>
      <ContentWrapper>
        <ZenTokenWrapper>
          <Logo source={logo} />
          <ZenTokenText>Earn 0.0125 ZENT after 5 min</ZenTokenText>
        </ZenTokenWrapper>
        <BellIconWrapper>
          <BellIconCard {...timerBellListData[selectedBellListIndex]} />
        </BellIconWrapper>
        <CounterTime>00:58:00</CounterTime>
        <BellTimeWrapper>
          <Octicons name="bell-fill" style={{ marginRight: 10 }} size={20} color="#8d8d92" />
          <BellTime>3:24 PM</BellTime>
        </BellTimeWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const ContentWrapper = styled.View``;

const ZenTokenWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme: { getSize } }) => getSize(51)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(77)}px;
`;
const Logo = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(30)}px;
  height: ${({ theme: { getSize } }) => getSize(30)}px;
  margin-right: ${({ theme: { getSize } }) => getSize(9)}px;
`;
const BellIconWrapper = styled.View`
  margin-bottom: ${({ theme: { getSize } }) => getSize(81)}px;
`;
const ZenTokenText = styled(Text)`
  font-weight: 600;
  font-size: ${({ theme: { getSize } }) => getSize(16)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19.06)}px;
`;

const CounterTime = styled(Text)`
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(80)}px;
  line-height: ${({ theme: { getSize } }) => getSize(95)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(5)}px;
`;

const BellTimeWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme: { getSize } }) => getSize(130)}px;
`;

const BellTime = styled(Text)`
  text-align: center;
  color: #8d8d92;
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(24)}px;
`;

import { Text } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import lineIcon from "assets/images/timerIcons/timer-inp-link.png";
import { TextInput } from "react-native";
import { useTimer } from "../contex";
import { useRef, useState } from "react";

const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #1e1f20;
  width: ${({ theme: { getSize } }) => getSize(95)}px;
  border: ${({ theme: { getSize } }) => getSize(1)}px solid #6b26ff;
  border-radius: ${({ theme: { getSize } }) => getSize(7.5)}px;
  height: ${({ theme: { getSize } }) => getSize(29)}px;
  margin-left: ${({ theme: { getSize } }) => getSize(10)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(-10)}px;
`;
const InputSeperator = styled(Text)`
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(14)}px;
  line-height: ${({ theme: { getSize } }) => getSize(17)}px;
`;
const Input = styled.TextInput`
  width: ${({ theme: { getSize } }) => getSize(20)}px;

  color: ${(props) => props.theme.color.white};
  /* margin-left: ${({ theme: { getSize } }) => getSize(5)}px;
  margin-right: ${({ theme: { getSize } }) => getSize(5)}px; */
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(14)}px;
  line-height: ${({ theme: { getSize } }) => getSize(17)}px;
  text-align: center;
`;
function TimerInputs() {
  const { intervltimeInput, setIntervlTimeInput } = useTimer();
  const { theme } = useTheme();
  const inputRefs = [useRef(), useRef(), useRef()];

  // useEffect(() => {
  //   inputRefs[0].current.focus();
  // }, []);
  return (
    <>
      <InputWrapper>
        <Input
          selectionColor={theme.color.white}
          keyboardType={"numeric"}
          maxLength={2}
          ref={inputRefs[0]}
          onChangeText={(value) => {
            if (value !== "" && value?.length === 2) {
              inputRefs[1].current.focus();
            }

            const updatedtimeInput = [...intervltimeInput];
            updatedtimeInput[0] = `${value}`;
            setIntervlTimeInput(updatedtimeInput);
          }}
          onKeyPress={(e) => {
            if (
              e.nativeEvent.key != "Backspace" &&
              e.nativeEvent.value != "" &&
              e.nativeEvent.value?.length === 2
            ) {
              inputRefs[1].current.focus();
            }
          }}
          value={intervltimeInput[0]}
          blurOnSubmit={false}
        />
        <InputSeperator>:</InputSeperator>
        <Input
          selectionColor={theme.color.white}
          keyboardType={"numeric"}
          maxLength={2}
          ref={inputRefs[1]}
          onChangeText={(value) => {
            if (value !== "" && value?.length === 2) {
              inputRefs[2].current.focus();
            }

            const updatedtimeInput = [...intervltimeInput];
            updatedtimeInput[1] = `${value}`;
            setIntervlTimeInput(updatedtimeInput);
          }}
          onKeyPress={(e) => {
            if (
              e.nativeEvent.key == "Backspace" &&
              e.nativeEvent.value === undefined &&
              e.nativeEvent.value === ""
            ) {
              inputRefs[0].current.focus();
            } else if (e.nativeEvent.value !== "" && e.nativeEvent.value?.length === 2) {
              inputRefs[2].current.focus();
            }
          }}
          value={intervltimeInput[1]}
          blurOnSubmit={false}
        />
        <InputSeperator>:</InputSeperator>
        <Input
          selectionColor={theme.color.white}
          keyboardType={"numeric"}
          maxLength={2}
          ref={inputRefs[2]}
          onChangeText={(value) => {
            if (value !== "" && value?.length === 2) {
              // inputRefs[3].current.focus();
            }

            const updatedtimeInput = [...intervltimeInput];
            updatedtimeInput[2] = `${value}`;
            setIntervlTimeInput(updatedtimeInput);
          }}
          onKeyPress={(e) => {
            if (
              e.nativeEvent.key == "Backspace" &&
              e.nativeEvent.value === undefined &&
              e.nativeEvent.value === ""
            ) {
              inputRefs[1].current.focus();
            } else if (e.nativeEvent.value !== "" && e.nativeEvent.value?.length === 2) {
              inputRefs[2].current.focus();
            }
          }}
          value={intervltimeInput[2]}
          blurOnSubmit={false}
        />
      </InputWrapper>
    </>
  );
}
export default function IntervalBell(props) {
  const { selsctedSound = "" } = props;
  const { theme } = useTheme();
  const [text, onChangeText] = useState("00:15:00");
  const [number, onChangeNumber] = useState("");
  const { timerBellListData = [], selectedBell, setSelectedBell = () => {} } = useTimer();
  const selectedBellListIndex = timerBellListData?.findIndex(({ id }) => id === selectedBell);

  const { viewTitle, title } = timerBellListData[selectedBellListIndex];
  return (
    <Wrapper>
      <ContentWrapper>
        <Head>
          <Title>Interval Bell</Title>
          <NromalText>{viewTitle || title}</NromalText>
        </Head>
        <InpHandlerWrapper>
          <LinkeIcon source={lineIcon} />
          <PlayShould>play sound every</PlayShould>
          <TimerInputs />
          {/* <TimeSelectInput onChangeText={onChangeText} value={text} keyboardType="numeric" /> */}
        </InpHandlerWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
 display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background:${({ theme: { color } }) => color?.card};
  border-radius: ${({ theme: { getSize } }) => getSize(15)}px;
  height: ${({ theme: { getSize } }) => getSize(102)}px;
  padding: ${({ theme: { getSize } }) => `0 ${getSize(36)}px 0 ${getSize(19.5)}px`}};
  margin-bottom: ${({ theme: { getSize } }) => getSize(40)}px;
`;
const ContentWrapper = styled.View`
  display: block;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
`;
const Head = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Title = styled(Text)`
  font-weight: 600;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19)}px;
`;

const PlayShould = styled(Text)`
  font-weight: 600;
  font-size: ${({ theme: { getSize } }) => getSize(16)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19.09)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(-6)}px;
  margin-left: ${({ theme: { getSize } }) => getSize(7)}px;
`;

const NromalText = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(16)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19.09)}px;
`;

const TimeSelectInput = styled(TextInput)`
  color: #fff;
  border: 1px solid #6b26ff;
  height: ${({ theme: { getSize } }) => getSize(29)}px;
  width: ${({ theme: { getSize } }) => getSize(95)}px;
  text-align: center;
  font-size: ${({ theme: { getSize } }) => getSize(14)}px;
  border-radius: ${({ theme: { getSize } }) => getSize(7.5)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(-11)}px;
  margin-left: ${({ theme: { getSize } }) => getSize(8)}px;
`;

const InpHandlerWrapper = styled.View`
  width: 100%;
  padding-left: ${({ theme: { getSize } }) => getSize(9.5)}px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
const LinkeIcon = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(11)}px;
  height: ${({ theme: { getSize } }) => getSize(27)}px;
`;

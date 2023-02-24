import { useEffect, useRef, useState } from "react";
import { Text, Container, Canvas, Button } from "components";
import styled from "styled-components/native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import NumberPlease from "components/lib/number-please/NumberPlease";
import { useTimer } from "../contex";
import { useTheme } from "stores/theme";

const InputWrapper = styled.View`
  margin-top: ${({ theme: { getSize } }) => getSize(56)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(50)}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #1e1f20;
  width: ${({ theme: { getSize } }) => getSize(253)}px;
  border: ${({ theme: { getSize } }) => getSize(1.74794)}px solid #6b26ff;
  border-radius: ${({ theme: { getSize } }) => getSize(13.1096)}px;
  margin-left: auto;
  margin-right: auto;
  height: ${({ theme: { getSize } }) => getSize(50)}px;
`;
const InputSeperator = styled(Text)`
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(24)}px;
  line-height: ${({ theme: { getSize } }) => getSize(29)}px;
`;
const Input = styled.TextInput`
  width: ${({ theme: { getSize } }) => getSize(30)}px;
  font-size: ${({ theme: { getSize } }) => getSize(24)}px;
  color: ${(props) => props.theme.color.white};
  /* margin-left: ${({ theme: { getSize } }) => getSize(5)}px;
  margin-right: ${({ theme: { getSize } }) => getSize(5)}px; */
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(24)}px;
  line-height: ${({ theme: { getSize } }) => getSize(29)}px;
  text-align: center;
`;
function TimerInputs() {
  const { timeInput, setTimeInput } = useTimer();
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

            const updatedtimeInput = [...timeInput];
            updatedtimeInput[0] = `${value}`;
            setTimeInput(updatedtimeInput);
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
          value={timeInput[0]}
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

            const updatedtimeInput = [...timeInput];
            updatedtimeInput[1] = `${value}`;
            setTimeInput(updatedtimeInput);
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
          value={timeInput[1]}
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

            const updatedtimeInput = [...timeInput];
            updatedtimeInput[2] = `${value}`;
            setTimeInput(updatedtimeInput);
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
          value={timeInput[2]}
          blurOnSubmit={false}
        />
      </InputWrapper>
    </>
  );
}
export default function TimeSelection(props) {
  const { selectedTime, setSelectedTime, timeLib } = useTimer();

  const timeList = [
    { id: "hour", label: "", min: 0, max: 23, title: "hours" },
    { id: "min", label: "", min: 0, max: 59, title: "min" },
    { id: "second", label: "", min: 0, max: 59, title: "sec" },
  ];

  // console.log("Time: ", selectedTime);
  return (
    <Wrapper>
      <PickerWrapper>
        <TimerInputs />
        {/* <NumberPlease
          pickerStyle={{
            width: 90,
            // backgroundColor: "red",
            marginRight: -9,
            marginLeft: -9,
            marginLeft: -9,

            // fontSize: 12,
          }}
          // itemStyle={{ backgroundColor: "red" }}
          digits={timeList}
          values={selectedTime}
          onChange={(values) => setSelectedTime(values)}
        /> */}
      </PickerWrapper>
      {/* <RNDateTimePicker
        textColor={"#fff"}
        style={{ height: 80, width: "100%" }}
        display="spinner"
        mode={"time"}
        // minuteInterval={10}
        value={new Date("July 1, 1999, 12:00:00")}
      /> */}

      {/* <RNDateTimePicker minuteInterval={10} /> */}
      {/* <NumberPlease digits={date} values={birthday} onChange={(values) => setBirtday(values)} /> */}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 100%;
`;
const PickerWrapper = styled.View``;
const Title = styled(Text)``;

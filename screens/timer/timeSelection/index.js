import { useState } from "react";
import Text from "components/text";
import styled from "styled-components/native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import NumberPlease from "components/lib/number-please/NumberPlease";
import { useTimer } from "../contex";
export default function TimeSelection(props) {
  const { selectedTime, setSelectedTime, timeLib } = useTimer();

  const timeList = [
    { id: "hour", label: "", min: 0, max: 23, title: "hours" },
    { id: "min", label: "", min: 0, max: 59, title: "min" },
    { id: "second", label: "", min: 0, max: 59, title: "sec" },
  ];

  console.log("Time: ", selectedTime);
  return (
    <Wrapper>
      <PickerWrapper>
        <NumberPlease
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
        />
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

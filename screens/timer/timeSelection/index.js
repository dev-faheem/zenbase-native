import { useState } from "react";
import Text from "components/text";
import styled from "styled-components/native";
import NumberPlease from "react-native-number-please";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function TimeSelection(props) {
  const initialBirthday = [
    { id: "day", value: 16 },
    { id: "month", value: 4 },
    { id: "year", value: 1970 },
  ];

  const [birthday, setBirtday] = useState(initialBirthday);

  const date = [
    { id: "day", label: "", min: 0, max: 31 },
    { id: "month", label: "", min: 0, max: 12 },
    { id: "year", label: "", min: 1900, max: new Date().getFullYear() },
  ];
  return (
    <Wrapper>
      <Title>Time</Title>
      <RNDateTimePicker display="spinner" minuteInterval={10} value={new Date()} />
      {/* <RNDateTimePicker minuteInterval={10} /> */}
      {/* <NumberPlease digits={date} values={birthday} onChange={(values) => setBirtday(values)} /> */}
    </Wrapper>
  );
}

const Wrapper = styled.View``;
const Title = styled(Text)``;

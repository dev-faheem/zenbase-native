import { useState } from "react";
import Text from "components/text";
import styled from "styled-components/native";
import NumberPlease from "react-native-number-please";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function TimeSelection(props) {
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

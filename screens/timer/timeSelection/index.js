import { useState } from "react";
import Text from "components/text";
import styled from "styled-components/native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import NumberPlease from "components/lib/number-please/NumberPlease";
export default function TimeSelection(props) {
  const initial = [
    { id: "hour", value: 1 },
    { id: "min", value: 0 },
    { id: "second", value: 0 },
  ];

  const [time, setTime] = useState(initial);

  const timeList = [
    { id: "day", label: "hours", min: 0, max: 31 },
    { id: "min", label: "min", min: 0, max: 12 },
    { id: "year", label: "sec", min: 0, max: 60 },
  ];

  return (
    <Wrapper>
      <PickerWrapper>
        <NumberPlease
          pickerStyle={{
            width: "32%",
            background: "#fff",
            picker: {
              // height: 200,
              // width: "100%",
              color: "#fff",
            },
          }}
          digits={timeList}
          values={time}
          onChange={(values) => setTime(values)}
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

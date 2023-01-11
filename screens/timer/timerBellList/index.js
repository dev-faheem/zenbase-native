import { Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import BellCard from "./bellCard";

export default function TimerBellList(props) {
  const { timerBellListData = [] } = props;
  return (
    <Wrapper>
      <FlatList
        horizontal
        data={timerBellListData}
        style={{ paddingLeft: 15 }}
        snapToInterval={Dimensions.get("window").width * 0.92 + 10}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <BellCard key={index} {...item} isLast={index == timerBellListData.length - 1} />
        )}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View``;

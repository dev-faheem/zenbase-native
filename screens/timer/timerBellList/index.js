import { useRef, useState } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import BellCard from "./bellCard";

export default function TimerBellList(props) {
  const { timerBellListData = [] } = props;

  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 0.5;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;

  const pan = useRef(new Animated.ValueXY()).current;

  return (
    <Wrapper>
      <FlatList
        horizontal
        data={timerBellListData}
        snapToAlignment="center"
        decelerationRate="fast"
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        renderItem={({ item, index }) => (
          <BellCard key={index} {...item} isLast={index == timerBellListData.length - 1} />
        )}
        snapToInterval={boxWidth}
        contentInset={{ left: halfBoxDistance, right: halfBoxDistance }}
        contentOffset={{ x: halfBoxDistance * -1 + boxWidth, y: 0 }}
        onLayout={(e) => {
          setScrollViewWidth(e.nativeEvent.layout.width);
        }}
        onScroll={(e) => {
          // Animated.event([{ nativeEvent: { contentOffset: { x: pan.x } } }], {
          //   useNativeDriver: false,
          // });
        }}
        keyExtractor={(item, index) => `${index}-${item}`}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View``;

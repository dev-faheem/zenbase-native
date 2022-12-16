import React, { useRef, useState } from "react";
import ExplorableCard from "components/explorables/card";
import CardImage1 from "assets/images/explorable/card-1.png";
import CardImage2 from "assets/images/explorable/card-2.png";
import CardImage3 from "assets/images/explorable/card-3.png";
import CardImage4 from "assets/images/explorable/card-4.png";
import CardImage5 from "assets/images/explorable/start-here.png";
import ExplorableLinearGradient from "assets/images/explorable-gradient.png";
import { FlatList, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";

const cards = [
  {
    name: "Start Here",
    image: CardImage5,
    duration: "5 min",
    link: "625d48892ca51b231dbd8bc5",
    lableColor: "#6F39C6",
  },
  {
    name: "Daily Meditation",
    image: CardImage4,
    duration: "5 min",
    link: "627544e7f89098380d986d08",
    lableColor: "#3A74A2",
  },
  {
    name: "Morning Gratitude",
    image: CardImage3,
    duration: "5 min",
    link: "62ed5109ad097570d6c9101e",
    lableColor: "#C96971",
  },
  {
    name: "Deep Sleep",
    image: CardImage2,
    duration: "5 min",
    link: "62754606f89098380d986d09",
    lableColor: "#B89726",
  },
  {
    name: "Guided Meditation",
    image: CardImage1,
    duration: "5 min",
    link: "627546e4f89098380d986d0a",
    lableColor: "#0096A0",
  },
];

const BackdropImage = styled.Image`
  height: 390px;
  position: absolute;
  z-index: -1000;
`;

const BackdropOverlay = styled.Image`
  position: absolute;
  width: 200%;
  top: 330px;
  left: 0px;
  height: 60px;
  z-index: -900;
  resize-mode: stretch;
`;

function BackgroundLoader(props) {
  const opacity = useRef(new Animated.Value(0)).current;

  const onLoad = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.2,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return <Animated.Image onLoad={onLoad} {...props} style={[{ opacity: opacity }, props.style]} />;
}

export default function Explorables() {
  const [currentBackdrop, setCurrentBackdrop] = useState(CardImage1);

  const onViewableItemsChangedRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentBackdrop(viewableItems[0]?.item?.image);
    }
  });
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 55,
  });

  return (
    <>
      <BackgroundLoader
        source={currentBackdrop}
        blurRadius={20}
        style={{
          height: 390,
          position: "absolute",
          zIndex: -1000,
          width: "100%",
        }}
      />
      <BackdropOverlay source={ExplorableLinearGradient} />

      <FlatList
        horizontal
        data={cards}
        style={{ paddingLeft: 15 }}
        snapToInterval={Dimensions.get("window").width * 0.92 + 10}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
        renderItem={({ item, index }) => (
          <ExplorableCard key={index} {...item} isLast={index == cards.length - 1} />
        )}
      />
    </>
  );
}

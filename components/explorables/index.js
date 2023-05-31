import React, { useRef, useState } from "react";
import ExplorableCard from "components/explorables/card";
import CardImage1 from "assets/images/explorable/card-1.png";
import CardImage2 from "assets/images/explorable/card-2.png";
import CardImage3 from "assets/images/explorable/card-3.png";
import CardImage4 from "assets/images/explorable/card-4.png";
import CardImage5 from "assets/images/explorable/start-here.png";
import CardBackgroung5 from "assets/images/explorable/card-5-bg.png";
import ExplorableLinearGradient from "assets/images/explorable-gradient.png";
import { FlatList, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";

const cards = [
  {
    name: "Introduction to Meditation",
    image: CardImage5,
    duration: "10 min",
    link: "6473cb1092884708b93b929c",
    lableColor: "#6F39C6",
    background: CardBackgroung5,
    index: 0,
  },
  {
    name: "Daily Meditation",
    image: CardImage4,
    duration: "5 min",
    link: "64776c4f533305a819e01bb8",
    lableColor: "#3A74A2",
    index: 1,
  },
  {
    name: "Morning Gratitude",
    image: CardImage3,
    duration: "5 min",
    link: "64777628533305a819e02f83",
    lableColor: "#C96971",
    index: 2,
  },
  {
    name: "Deep Sleep",
    image: CardImage2,
    duration: "5 min",
    link: "647777d5533305a819e02fcb",
    lableColor: "#B89726",
    index: 3,
  },
  {
    name: "Guided Meditation",
    image: CardImage1,
    duration: "5 min",
    link: "64777798533305a819e02fc2",
    lableColor: "#0096A0",
    index: 4,
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
  top: 340px;
  left: 0px;
  height: 60px;
  z-index: -900;
  resize-mode: stretch;
`;

function BackgroundLoader(props) {
  const opacity = useRef(new Animated.Value(0)).current;

  const onLoad = () => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 0.2, duration: 0, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  };

  return <Animated.Image onLoad={onLoad} {...props} style={[{ opacity: opacity }, props.style]} />;
}

export default function Explorables() {
  const [currentBackdrop, setCurrentBackdrop] = useState(CardBackgroung5);
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);

  const onViewableItemsChangedRef = useRef(({ viewableItems, index }) => {
    if (viewableItems.length > 0) {
      setCurrentBackdropIndex(viewableItems[0]?.item?.index);
      setCurrentBackdrop(viewableItems[0]?.item?.background || viewableItems[0]?.item?.image);
    }
  });
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 55,
  });

  return (
    <>
      <BackgroundLoader
        source={currentBackdrop}
        blurRadius={currentBackdropIndex !== 0 ? 100 : 0}
        style={{
          height: 400,
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

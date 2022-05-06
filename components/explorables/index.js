import React, { useRef, useState } from "react";
import ExplorableCard from "components/explorables/card";
import CardImage1 from "assets/images/explorable/card-1.png";
import CardImage2 from "assets/images/explorable/card-2.png";
import CardImage4 from "assets/images/explorable/card-4.png";
import CardImage5 from "assets/images/explorable/card-5.png";
import ExplorableLinearGradient from "assets/images/explorable-gradient.png";
import { FlatList, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";

const cards = [
  {
    name: "Start Here",
    description: "Tune in to our Introductory Course for beginners.",
    image: CardImage5,
    link: "625d48892ca51b231dbd8bc5",
  },
  {
    name: "Daily Meditation",
    description: "Start your day the best possible way.",
    image: CardImage4,
    link: "627544e7f89098380d986d08",
  },
  // {
  //   name: "Morning Gratitude",
  //   description: "Start your day the best possible way.",
  //   image: CardImage3,
  // },
  {
    name: "Deep Sleep",
    description: "Catch some quality zzz’s.",
    image: CardImage2,
    link: "62754606f89098380d986d09",
  },
  {
    name: "Guided Meditation",
    description: "Learn from a master of meditation.",
    image: CardImage1,
    link: "627546e4f89098380d986d0a",
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

  return (
    <Animated.Image
      onLoad={onLoad}
      {...props}
      style={[{ opacity: opacity }, props.style]}
    />
  );
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
          <ExplorableCard {...item} isLast={index == cards.length - 1} />
        )}
      />
    </>
  );
}

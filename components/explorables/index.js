import React, { createContext, useRef, useState } from "react";
import ExplorableCard from "components/explorables/card";
import CardImage1 from "assets/images/explorable/card-1.png";
import CardImage2 from "assets/images/explorable/card-2.png";
import CardImage3 from "assets/images/explorable/card-3.png";
import CardImage4 from "assets/images/explorable/card-4.png";
import CardImage5 from "assets/images/explorable/card-5.png";
import ExplorableLinearGradient from "assets/images/explorable-gradient.png";
import { FlatList } from "react-native";
import Box from "components/box";
import Text from "components/text";
import styled from "styled-components/native";

const cards = [
  {
    name: "Start Here",
    description: "Tune in to our Introductory Course for beginners.",
    image: CardImage1,
  },
  {
    name: "Daily Meditation",
    description: "Start your day the best possible way.",
    image: CardImage2,
  },
  {
    name: "Morning Gratitude",
    description: "Start your day the best possible way.",
    image: CardImage3,
  },
  {
    name: "Deep Sleep",
    description: "Catch some quality zzz’s.",
    image: CardImage4,
  },
  {
    name: "Guided Meditation",
    description: "Learn from a master of meditation.",
    image: CardImage5,
  },
];

const BackdropImage = styled.Image`
  height: 340px;
  position: absolute;
  z-index: -1000;
`;

const BackdropOverlay = styled.Image`
  position: absolute;
  width: 200%;
  top: 280px;
  left: 0px;
  height: 60px;
  z-index: -900;
  resize-mode: stretch;
`;

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
      <BackdropImage source={currentBackdrop} blurRadius={20} />
      <BackdropOverlay source={ExplorableLinearGradient} />

      <FlatList
        horizontal
        data={cards}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
        renderItem={({ item }) => (
          <Box mr={10}>
            <ExplorableCard {...item} />
          </Box>
        )}
      />
    </>
  );
}

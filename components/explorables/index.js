import React from "react";
import ExplorableCard from "components/explorables/card";
import CardImage1 from "assets/images/explorable/card-1.png";
import CardImage2 from "assets/images/explorable/card-2.png";
import CardImage3 from "assets/images/explorable/card-3.png";
import CardImage4 from "assets/images/explorable/card-4.png";
import CardImage5 from "assets/images/explorable/card-5.png";
import { FlatList } from "react-native";
import Box from "components/box";

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

export default function Explorables() {
  return (
    <FlatList
      horizontal
      data={cards}
      renderItem={({ item }) => (
        <Box mr={10}>
          <ExplorableCard {...item} />
        </Box>
      )}
    />
  );
}

import React, { useEffect, useState } from "react";
import {
  Text,
  Container,
  Canvas,
  Box,
  SongList,
  CategoryList,
  Explorables,
} from "components";
import { ScrollView } from "react-native";
import useSearch from "queries/useSearch";
import useCategories from "queries/useCategories";

export default function Home() {
  const bestNewSounds = useSearch();
  const { data: categories } = useCategories();

  useEffect(() => {
    bestNewSounds.mutate({ sort: "-createdAt" });
  }, []);

  return (
    <Canvas>
      <ScrollView>
        <Container>
          <Box mt="20px"></Box>
          <Text fontSize="h2" fontWeight="bold">
            Explore
          </Text>

          <Explorables />

          <CategoryList categories={categories} />
          <SongList
            title="Best New Sounds"
            songs={bestNewSounds?.data?.results || []}
          />

          <SongList
            title="Under 10 Minutes"
            songs={bestNewSounds?.data?.results || []}
          />

          <SongList
            title="Guided Meditations"
            songs={bestNewSounds?.data?.results || []}
          />

          <SongList
            title="Chill"
            songs={bestNewSounds?.data?.results || []}
            showDivider={false}
          />
          <Box mt="20px"></Box>
        </Container>
      </ScrollView>
    </Canvas>
  );
}

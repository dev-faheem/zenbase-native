import React, { useEffect, useState } from "react";
import {
  Text,
  Container,
  Canvas,
  Button,
  SongTile,
  CategoryTile,
  Box,
  SongList,
  CategoryList,
} from "components";
import { ScrollView } from "react-native";
import useSearch from "queries/useSearch";

export default function Home() {
  const bestNewSounds = useSearch();

  useEffect(() => {
    bestNewSounds.mutate({ sort: "createdAt" });
  }, []);

  return (
    <Canvas>
      <ScrollView>
        <Container center>
          <Text>Home Page Header Placeholder</Text>

          <CategoryList />
          <SongList
            title="Best New Sounds"
            songs={bestNewSounds?.data?.results || []}
          />
          {/* <SongList title="Under 10 minutes" mock={true} />
          <SongList title="Guided Meditations" mock={true} />
          <SongList title="Chill" mock={true} showDivider={false} /> */}
        </Container>
      </ScrollView>
    </Canvas>
  );
}

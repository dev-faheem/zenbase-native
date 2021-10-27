import React from "react";
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

export default function Home() {
  return (
    <Canvas>
      <ScrollView>
        <Container center screen>
          <Text>Home Page Header Placeholder</Text>
          {/* <Box m="50px" mt="100px">
            <SongTile mock={true} />
          </Box> */}
          {/* <CategoryTile mock={true} /> */}
          <CategoryList />
          <SongList title="Best New Sounds" mock={true} />
          <SongList title="Under 10 minutes" mock={true} />
          <SongList title="Guided Meditations" mock={true} />
          <SongList title="Chill" mock={true} />
        </Container>
      </ScrollView>
    </Canvas>
  );
}

import React from "react";
import Box from "components/box";
import Text from "components/text";
import { FlatList, TouchableOpacity } from "react-native";
import { useMock } from "services/mock";
import { SongTile } from "..";
import styled from "styled-components/native";
import Divider from "components/divider";

const TitleContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function SongList({ title, songs, mock }) {
  songs = useMock("songs", songs, mock);

  return (
    <>
      <TitleContainer>
        <Text fontSize="xl" color="white">
          {title}
        </Text>

        <TouchableOpacity onPress={() => {}}>
          <Text fontSize="md" color="primary">
            See All
          </Text>
        </TouchableOpacity>
      </TitleContainer>

      <FlatList
        horizontal
        data={songs}
        renderItem={({ item, index }) => (
          <Box ml="10px">
            <SongTile key={index} song={item} />
          </Box>
        )}
      />

      <Divider />
    </>
  );
}

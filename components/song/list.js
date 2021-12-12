import React from "react";
import Box from "components/box";
import Text from "components/text";
import { FlatList, TouchableOpacity } from "react-native";
import { useMock } from "services/mock";
import SongTile from "components/song/tile";
import styled from "styled-components/native";
import Divider from "components/divider";
import { useNavigation } from "@react-navigation/core";

const TitleContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  /* padding-left: 10px;
  padding-right: 10px; */
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function SongList({
  title,
  songs,
  mock = false,
  showDivider = true,
}) {
  const navigation = useNavigation();
  songs = useMock("songs", songs, mock);

  return (
    <>
      <TitleContainer>
        <Text fontSize="xl" color="white">
          {title}
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SongList", { songs, title });
          }}
        >
          <Text fontSize="md" color="primary">
            See All
          </Text>
        </TouchableOpacity>
      </TitleContainer>

      <FlatList
        horizontal
        data={songs.slice(0, 10)}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <Box mr={index === songs.length - 1 ? 0 : "10px"}>
            <SongTile key={index} song={item} />
          </Box>
        )}
      />

      {showDivider && <Divider />}
    </>
  );
}

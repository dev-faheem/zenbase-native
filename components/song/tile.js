import React from "react";
import { Image, Text, View } from "react-native";
import { useMock } from "services/mock";
import styled from "styled-components/native";

const SongTileView = styled.TouchableOpacity``;

const SongArtwork = styled.Image`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const SongName = styled.Text`
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.fontSize.sm};
  margin-top: 6px;
`;

const SongArtistName = styled.Text`
  color: ${(props) => props.theme.color.secondary};
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const SongLength = styled.Text`
  color: ${(props) => props.theme.color.white};
  position: absolute;
  z-index: 10;
  right: 8px;
  top: 8px;
`;

export default function SongTile({ song, mock = false }) {
  song = useMock("song", song, mock);

  return (
    <SongTileView
      onPress={() => {
        alert("Now playing: " + song.name);
      }}
    >
      <SongArtwork source={{ uri: song.artwork?.replace("https", "http") }} />
      <SongLength>{song.length}</SongLength>
      <SongName>{song.name}</SongName>
      <SongArtistName>{song.artist?.name}</SongArtistName>
    </SongTileView>
  );
}

import React from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";

const SongTileView = styled.View`
  width: 200px;
  height: 200px;
`;

const SongArtwork = styled.Image`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const SongName = styled.Text`
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const SongArtistName = styled.Text`
  color: ${(props) => props.theme.color.secondary};
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const SongLength = styled.Text`
  color: ${(props) => props.theme.color.white};
  position: absolute;
  z-index: 10;
  right: 30px;
  top: 8px;
`;

export default function SongTile({ song }) {
  return (
    <SongTileView>
      <SongArtwork source={song.artwork} />
      <SongLength>{song.length}</SongLength>
      <SongName>{song.name}</SongName>
      <SongArtistName>{song.artist.name}</SongArtistName>
    </SongTileView>
  );
}

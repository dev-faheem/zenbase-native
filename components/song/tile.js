import React from "react";
import { Dimensions } from "react-native";
import { useMock } from "services/mock";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";

const SongTileView = styled.View``;

const SongArtwork = styled.Image`
  position: relative;
  ${(props) => {
    if (props.inGrid) {
      const size = (Dimensions.get("window").width - 40) * 0.5 - 10;
      if (size < 180) {
        return `
          width: ${size}px;
          height: ${size}px;
        `;
      }
    }

    return `
      width: 180px;
      height: 180px;
    `;
  }}
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

const SongRemoveButton = styled.TouchableOpacity`
  color: ${(props) => props.theme.color.white};
  position: absolute;
  z-index: 10;
  right: -8px;
  top: -10px;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export default function SongTile({
  style,
  song,
  removable,
  onRemove,
  inGrid,
  mock = false,
}) {
  song = useMock("song", song, mock);

  return (
    <TouchableWithoutFeedback
      onPress={
        removable
          ? onRemove
          : () => {
              alert("Play song " + song?._id);
              console.log({ song });
            }
      }
    >
      <SongTileView style={style || null}>
        <SongArtwork
          source={
            mock
              ? song.artwork
              : { uri: song.artwork?.replace("https", "http") }
          }
          inGrid={inGrid || null}
        />
        {removable && (
          <SongRemoveButton onPress={onRemove || null}>
            <Ionicons
              name="ios-remove"
              size={15}
              style={{ marginLeft: 1 }}
              color="white"
            />
          </SongRemoveButton>
        )}
        <SongLength>{song.length}</SongLength>
        <SongName>{song.name}</SongName>
        <SongArtistName>{song.artist?.name}</SongArtistName>
      </SongTileView>
    </TouchableWithoutFeedback>
  );
}

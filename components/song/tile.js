import React from "react";
import { Dimensions } from "react-native";
import { useMock } from "services/mock";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSongQueue } from "stores/song-queue";
import Text from "components/text";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WINDOW_WIDTH = Dimensions.get("window").width;
const TILE_SIZE = (WINDOW_WIDTH - 40) * 0.5 - 10;

const SongTileView = styled.View`
  ${(props) => {
    if (props.inGrid) {
      const size = TILE_SIZE;
      if (size < 180) {
        return `
        width: ${size}px;
      `;
      }
    }

    return `
    width: 180px;
  `;
  }}
`;

const SongArtwork = styled.Image`
  position: relative;
  ${(props) => {
    if (props.inGrid) {
      const size = TILE_SIZE;
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
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
`;

const SongArtistName = styled.Text`
  margin-top: 7px;
  color: ${(props) => props.theme.color.secondary};
  /* font-size: ${(props) => props.theme.fontSize.sm}; */
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

const SongLength = styled.View`
  color: ${(props) => props.theme.color.white};
  position: absolute;
  z-index: 10;
  right: 8px;
  top: 8px;
  background: rgba(0, 0, 0, 0.3);
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 5px;
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
  inGrid = true,
  queue = [],
  mock = false,
}) {
  song = useMock("song", song, mock);
  const navigation = useNavigation();

  const { updateSongQueue } = useSongQueue();

  const onPressTile = async () => {
    navigation.navigate("Play", { _id: song?._id });
    await AsyncStorage.setItem("lastClickedSong", JSON.stringify(song));
    updateSongQueue(
      song?._id,
      queue.map((v) => v?._id)
    );
  };

  return (
    <TouchableWithoutFeedback onPress={removable ? onRemove : onPressTile}>
      <SongTileView style={style || null} inGrid={inGrid || null}>
        <SongArtwork
          source={mock ? song.artwork : { uri: song.artwork?.replace("https", "http") }}
          inGrid={inGrid || null}
        />
        {removable && (
          <SongRemoveButton onPress={onRemove || null}>
            <Ionicons name="ios-remove" size={15} style={{ marginLeft: 1 }} color="white" />
          </SongRemoveButton>
        )}
        <SongLength>
          <Text fontSize="12">{Math.round(song.duration / 60)} min</Text>
        </SongLength>

        <SongArtistName numberOfLines={1}>
          {song.artist?.map((artist) => artist.name)?.join(", ")}
        </SongArtistName>
        <SongName numberOfLines={1}>{song.name}</SongName>
        <CategoryHolder>
          <CategoryWrapper>
            <CategoryName>Meditation Sleep</CategoryName>
          </CategoryWrapper>
        </CategoryHolder>
      </SongTileView>
    </TouchableWithoutFeedback>
  );
}
const CategoryHolder = styled.View`
  display: flex;
  flex-direction: row;
`;
const CategoryWrapper = styled.View`
  background: #333333;
  border-radius: 7.5px;
  padding: 6px 14px;
  margin-top: 7px;
  width: auto;
`;
const CategoryName = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

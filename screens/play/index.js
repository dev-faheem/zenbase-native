import React, { useEffect, useState } from "react";
import { Text, Container, Canvas, NavigationPadding } from "components";
import { useRoute } from "@react-navigation/core";
import styled from "styled-components";
import axios from "services/axios";
import { useLoader } from "stores/loader";
import { Dimensions } from "react-native";
import { Shadow } from "react-native-shadow-2";

const ScreenContainer = styled.ScrollView`
  padding-left: 22px;
  padding-right: 22px;
`;

const ZenCounter = styled.View``;
const ZenCounterImage = styled.Image``;
const ZenCounterEarnings = styled.Text``;

const SongBackdrop = styled.Image`
  position: absolute;
  z-index: -1000;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

const SongArtworkContainer = styled.View`
  margin-left: 22px;
  margin-top: 64px;
  margin-bottom: 27px;
`;
const SongArtwork = styled.Image`
  width: ${Math.floor(Dimensions.get("window").width) - 22 - 22}px;
  height: ${Math.floor(Dimensions.get("window").width) - 22 - 22}px;
  border-radius: 10px;
`;
const SongTitle = styled.Text`
  font-size: 22px;
  color: white;
  font-weight: bold;
`;
const SongArtist = styled.Text`
  font-size: 22px;
  color: rgba(247, 248, 250, 0.6);
  font-weight: normal;
  margin-top: -5px;
`;

const SongSeekbarTimeContainer = styled.View``;
const SongSeekbarTime = styled.Text``;

const SongPlaybackButtonsContainer = styled.View``;

const SongVolumeControlContainer = styled.View``;
const SongVolumeControlContainerIcon = styled.View``;

const SongControls = styled.View``;
const SongControlsButton = styled.View``;

export default function Play() {
  const route = useRoute();
  const { _id } = route.params;

  const [song, setSong] = useState();
  const { setLoading, renderLoader } = useLoader();

  useEffect(() => {
    fetchSong(_id);
  }, [_id]);

  const fetchSong = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/songs/${id}`);
      setSong(data.data);
      setLoading(false);
    } catch (e) {
      axios.handleError(e);
    }
  };

  return (
    <Canvas>
      {renderLoader()}
      {song && (
        <>
          <SongBackdrop
            source={{ uri: song.artwork?.replace("https", "http") }}
            blurRadius={40}
          />
          <SongArtworkContainer>
            <Shadow distance={50} radius={10}>
              <SongArtwork
                source={{ uri: song.artwork?.replace("https", "http") }}
                style={{
                  shadowColor: "black",
                  shadowOffset: { height: 2 },
                  shadowOpacity: 1,
                }}
              />
            </Shadow>
          </SongArtworkContainer>
          <ScreenContainer>
            <SongTitle>{song.name}</SongTitle>
            <SongArtist>{song.artist?.name}</SongArtist>
          </ScreenContainer>
        </>
      )}

      <NavigationPadding />
    </Canvas>
  );
}

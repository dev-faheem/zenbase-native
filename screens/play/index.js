import React, { useEffect, useRef, useState } from 'react';
import { Text, Container, Canvas, NavigationPadding } from 'components';
import { useRoute } from '@react-navigation/core';
import styled from 'styled-components';
import axios from 'services/axios';
import { useLoader } from 'stores/loader';
import { Dimensions } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Slider from '@react-native-community/slider';
import {
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { Audio } from 'expo-av';

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
  width: ${Math.floor(Dimensions.get('window').width) - 22 - 22}px;
  height: ${Math.floor(Dimensions.get('window').width) - 22 - 22}px;
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
  margin-top: 0px;
`;

const SongControls = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const SongControlsButton = styled.TouchableOpacity``;

let audio = new Audio.Sound();

export default function Play() {
  const route = useRoute();
  const { _id } = route.params;

  const [song, setSong] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const { setLoading, renderLoader } = useLoader();

  useEffect(() => {
    fetchSong(_id);
  }, [_id]);

  const fetchSong = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/songs/${id}`);
      await setSong(data.data);
      await setLoading(false);
      await audio.unloadAsync();
      setPosition(0);
      setDuration(1);
      setIsPlaying(false);
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
            source={{ uri: song.artwork?.replace('https', 'http') }}
            blurRadius={40}
          />
          <SongArtworkContainer>
            <Shadow distance={50} radius={10}>
              <SongArtwork
                source={{ uri: song.artwork?.replace('https', 'http') }}
                style={{
                  shadowColor: 'black',
                  shadowOffset: { height: 2 },
                  shadowOpacity: 1,
                }}
              />
            </Shadow>
          </SongArtworkContainer>
          <ScreenContainer>
            <SongTitle>{song.name || 'Song Name'}</SongTitle>
            <SongArtist>{song.artist?.name || 'Artist Name'}</SongArtist>

            {/* Playback Slider / Seekbar */}
            <Slider
              minimumValue={0}
              value={position}
              maximumValue={duration}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />

            <SongControls>
              <SongControlsButton>
                <FontAwesome5 name="backward" size={24} color="white" />
              </SongControlsButton>

              {isPlaying ? (
                <SongControlsButton
                  onPress={async () => {
                    return;
                    setIsPlaying(false);
                    await audio.stopAsync();
                  }}
                >
                  <Foundation name="pause" size={48} color="white" />
                </SongControlsButton>
              ) : (
                <SongControlsButton
                  onPress={async () => {
                    await audio.unloadAsync();
                    await audio.loadAsync({ uri: song.source });
                    await audio.playAsync({ uri: song.source });

                    audio.setOnPlaybackStatusUpdate((status) => {
                      setDuration(status.durationMillis);
                      setPosition(status.positionMillis);
                    });

                    setIsPlaying(true);
                  }}
                >
                  <Foundation name="play" size={48} color="white" />
                </SongControlsButton>
              )}

              <SongControlsButton>
                <FontAwesome5 name="forward" size={24} color="white" />
              </SongControlsButton>
            </SongControls>

            {/* Volume Slider */}
            <Slider
              thumbSize={{
                width: 8,
                height: 8,
              }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={volume}
              onValueChange={async (_volume) => {
                await audio.setVolumeAsync(_volume);
                setVolume(_volume);
              }}
            />

            <SongControls>
              <SongControlsButton>
                <Ionicons name="ios-close-circle" size={24} color="white" />
              </SongControlsButton>
              <SongControlsButton>
                <Ionicons name="heart-circle-sharp" size={24} color="white" />
              </SongControlsButton>
              <SongControlsButton>
                <MaterialCommunityIcons
                  name="meditation"
                  size={24}
                  color="white"
                />
              </SongControlsButton>
              <SongControlsButton>
                <Feather name="more-horizontal" size={24} color="white" />
              </SongControlsButton>
            </SongControls>
          </ScreenContainer>
        </>
      )}

      <NavigationPadding />
    </Canvas>
  );
}

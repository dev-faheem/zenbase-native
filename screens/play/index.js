import React, { useEffect, useRef, useState } from 'react';
import { Text, Container, Canvas, ContextMenu } from 'components';
import { useRoute } from '@react-navigation/core';
import styled from 'styled-components';
import axios from 'services/axios';
import { useLoader } from 'stores/loader';
import { Dimensions, Image, View } from 'react-native';
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


// Import Images
import ZenbaseAddIcon from 'assets/vectors/zenbase-white-add.png';
import ZentokenIcon from 'assets/images/zentoken-logo-border.png';

const windowsHeight = Dimensions.get("window").height;

const ScreenContainer = styled.View`
  padding-left: 22px;
  padding-right: 22px;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
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
  margin-top: 40px;
  margin-bottom: 27px;
  flex-direction: row;
  justify-content: center;
`;
const SongArtwork = styled.Image`
  width: ${Math.floor(Dimensions.get('window').width - 44)}px;
  height: ${Math.floor(Dimensions.get('window').width - 44)}px;
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


const VolumnSliderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center; 
  align-items: center;
  border-radius: 100px;
  width: 30px; 
  height: 30px;
  background-color: rgba(247, 248, 250, 0.3);
`;

const ZenbaseAddImage = styled.Image`
  width: 18px;
  height: 18px;
`;

const ZentEarningWrapper = styled.View`
  padding-top: 30px; 
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ZentokenImage = styled.Image`
  width: 30px;
  height: 30px;
`

const SongTimingWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

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

  // Context Menu Config
  let contextMenuHeight = 145;
  const [contextMenuConfig, setContextMenuConfig] = useState({
    display: false,
    top: 0,
    left: 0
  });

  const openContextMenu = event => {
    contextMenuConfig.display = !contextMenuConfig.display;
    contextMenuConfig.top = event.nativeEvent.pageY - contextMenuHeight - 10;
    contextMenuConfig.left = event.nativeEvent.pageX - 150;

    setContextMenuConfig({ ...contextMenuConfig });
  }

  const closeContextMenu = event => {
    contextMenuConfig.display = false;
    contextMenuConfig.top = 0;
    contextMenuConfig.left = 0;

    setContextMenuConfig({ ...contextMenuConfig });
  }

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
            blurRadius={100}
            style={{ opacity: 0.7 }}
          />

          <ZentEarningWrapper>
            <ZentokenImage source={ZentokenIcon} style={{ marginRight: 8 }} />
            <Text fontWeight='600'>5:25 • 0.01 ZENT earned</Text>
          </ZentEarningWrapper>

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
            <View>
              <SongTitle>{song.name || 'Song Name'}</SongTitle>
              <SongArtist>{song.artist?.name || 'Artist Name'}</SongArtist>
            </View>

            {/* Playback Slider / Seekbar */}
            <View>
              <Slider
                minimumValue={0}
                value={position}
                maximumValue={duration}
                minimumTrackTintColor="#FFFFFF5A"
                maximumTrackTintColor="#FFFFFF1E"
              />
              <SongTimingWrapper>
                <Text style={{ color: '#FFFFFF5A' }}>0:00</Text>
                <Text style={{ color: '#FFFFFF5A' }}>20:00</Text>
              </SongTimingWrapper>
            </View>

            <SongControls style={{ position: 'relative', top: -7 }}>
              <SongControlsButton>
                <FontAwesome5 name="backward" size={24} color="white" />
              </SongControlsButton>

              {isPlaying ? (
                <SongControlsButton
                  onPress={async () => {
                    // return;
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
            <VolumnSliderWrapper>
              <Ionicons name="ios-volume-off" color='#FFFFFF4B' size={25} />
              <Slider
                style={{
                  width: '86%',
                  marginRight: 5
                }}
                thumbSize={{
                  width: 8,
                  height: 8,
                }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF5A"
                maximumTrackTintColor="#FFFFFF1E"
                value={volume}
                onValueChange={async (_volume) => {
                  await audio.setVolumeAsync(_volume);
                  setVolume(_volume);
                }}
              />
              <Ionicons name="ios-volume-high" color='#FFFFFF4B' size={25} />
            </VolumnSliderWrapper>

            <SongControls style={{ marginBottom: 20, marginTop: 10 }}>
              <OptionButton style={{ backgroundColor: 'white' }}>
                <Ionicons name="ios-close" size={18} style={{ marginLeft: .5, marginTop: .5 }} />
              </OptionButton>
              {/* <OptionButton style={{ backgroundColor: 'white'}}>
                <Ionicons name="heart" size={17} style={{ marginLeft: .5, marginTop: 1 }} />
              </OptionButton> */}
              <OptionButton>
                <Ionicons name="heart" size={17} color="white" style={{ marginLeft: .5, marginTop: 1 }} />
              </OptionButton>
              <OptionButton>
                <ZenbaseAddImage source={ZenbaseAddIcon} resizeMode='contain' style={{ marginLeft: .5, marginBottom: 2 }} />
              </OptionButton>
              <OptionButton onPress={openContextMenu}>
                <Feather name="more-horizontal" size={18} color="white" />
              </OptionButton>
            </SongControls>
          </ScreenContainer>
        </>
      )}

      <ContextMenu
        display={contextMenuConfig.display}
        top={contextMenuConfig.top}
        left={contextMenuConfig.left}
        closeHandler={closeContextMenu}
        
        menuList={[
          // {
          //   title: 'Delete from Library',
          //   icon: <Ionicons name="ios-trash-outline" size={16} color='white' />,
          //   onPress: () => { }
          // },
          {
            title: 'Add to Library',
            icon: <Ionicons name="heart-outline" size={16} color='white' />,
            onPress: () => { }
          },
          {
            divider: true
          },
          {
            title: 'Listen with Friends',
            icon: (
              <View style={{ width: 16, height: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderWidth: 1, borderColor: 'white'}}>
                <Image source={ZenbaseAddIcon} resizeMode='contain' style={{ width: 10, height: 10}} />
              </View>
            ),
            onPress: () => { }
          },
          {
            title: 'Share Song...',
            icon: <Ionicons name="ios-share-outline" size={16} color='white' />,
            onPress: () => { }
          },
        ]} />
    </Canvas>
  );
}

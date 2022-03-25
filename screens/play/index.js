import React, { useEffect, useRef, useState } from "react";
import { Text, Container, Canvas, ContextMenu, Button } from "components";
import { useRoute } from "@react-navigation/core";
import styled from "styled-components";
import axios from "services/axios";
import { useLoader } from "stores/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import Slider from "@react-native-community/slider";
import {
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { Audio } from "expo-av";

// Import Images
import ZenbaseAddIcon from "assets/vectors/zenbase-white-add.png";
import ZentokenIcon from "assets/images/zentoken-logo-border.png";
import { playAds } from "services/playAds";
import { useAuth } from "stores/auth";
import ReactNativeShare from "helpers/react-native-share";

const GIVEAWAY_TOKEN_AFTER_SECONDS = 10; // seconds
const CONTINUE_LISTENING = 30; //seconds

const windowsWidth = Dimensions.get("window").width;
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
  width: ${Math.floor(Dimensions.get("window").width - 44)}px;
  height: ${Math.floor(Dimensions.get("window").width - 44)}px;
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
`;

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
`;

const ZentokenImage = styled.Image`
  width: 30px;
  height: 30px;
`;

const SongTimingWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FooterWrapper = styled.View`
  padding-left: ${(props) => props.theme.spacing.xxl};
  padding-right: ${(props) => props.theme.spacing.xxl};
  width: 100%;
  flex: 1;
`;

const FooterBody = styled.View`
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterButtons = styled.View`
  flex: 0.9;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ContinueButton = styled.TouchableOpacity`
  width: 100%;
  height: 42px;
  background-color: rgba(223, 224, 226, 0.35);
  border-radius: ${(props) => props.theme.borderRadius.xl};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 0.4px;
  border-color: rgba(247, 248, 250, 0.9);
  position: relative;
`;

const ContinueButtonProgressBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 50%;
  height: 42px;
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius.xl};
`;

let audio = new Audio.Sound();

function renderMsToTiming(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    seconds = seconds % 60;
  }
  let hours = Math.floor(minutes / 60);
  if (hours > 0) {
    minutes = minutes % 60;
    return `0${hours}:${minutes}:${seconds}`;
  }
  let zeroFixMinutes = minutes >= 10 ? "" : "0";
  let zeroFixSeconds = seconds >= 10 ? "" : "0";
  return `${zeroFixMinutes}${minutes}:${zeroFixSeconds}${seconds}`;
}

export default function Play({ navigation }) {
  const route = useRoute();
  const { _id } = route.params;
  const { user, updateUser, secondsWorth } = useAuth();

  const progressBarWidth = useRef(
    new Animated.Value(windowsWidth - 40)
  ).current;

  const [song, setSong] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [adBonus, setAdBonus] = useState(0);
  const { setLoading, renderLoader } = useLoader();
  const [continueListening, setContinueListening] = useState(false);
  const clickContinueListeningRef = useRef(false);
  const [zentokens, setZentokens] = useState(0);

  // Function to Init continue button animation
  const startProgressBarAnimation = () => {
    setContinueListening(true);
    progressBarWidth.setValue(windowsWidth - 40);
    clickContinueListeningRef.current = false;

    Animated.timing(progressBarWidth, {
      toValue: 0,
      duration: 20000,
      useNativeDriver: false,
      isInteraction: true,
    }).start(() => {
      animationFinished();
    });
  };
  const animationFinished = () => {
    if (clickContinueListeningRef.current !== true) {
      navigation.navigate("Home");
    } else {
      clickContinueListeningRef.current = false;
    }
  };

  // Context Menu Config
  let contextMenuHeight = 145;
  const [contextMenuConfig, setContextMenuConfig] = useState({
    display: false,
    top: 0,
    left: 0,
  });

  const openContextMenu = (event) => {
    contextMenuConfig.display = !contextMenuConfig.display;
    contextMenuConfig.top = event.nativeEvent.pageY - contextMenuHeight - 10;
    contextMenuConfig.left = event.nativeEvent.pageX - 150;

    setContextMenuConfig({ ...contextMenuConfig });
  };

  const closeContextMenu = (event) => {
    contextMenuConfig.display = false;
    contextMenuConfig.top = 0;
    contextMenuConfig.left = 0;

    setContextMenuConfig({ ...contextMenuConfig });
  };

  //
  useEffect(() => {
    playAds(
      user.ads || 0,
      () => {},
      () => {
        // setAdBonus(adBonus + 1);
        // Giveaway 30 seconds worth of token on an ad play
        setZentokens(zentoken + 30 * secondsWorth);
      }
    );
  }, []);

  // Continue Listening
  useEffect(() => {
    const interval = setInterval(() => {
      startProgressBarAnimation();
    }, CONTINUE_LISTENING * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Token Counter
  const secondsRef = useRef(0);
  const tokenInterval = useRef(null);
  const startTokenTimer = () => {
    const intervalId = setInterval(() => {
      secondsRef.current++;

      if (secondsRef.current > GIVEAWAY_TOKEN_AFTER_SECONDS) {
        setZentokens((oldZentoken) => {
          return oldZentoken + secondsWorth;
        });
      }
    }, 1000);
    tokenInterval.current = intervalId;
  };

  const stopTokenTimer = () => {
    clearInterval(tokenInterval.current);
  };

  // Fetch and Add To Recents
  useEffect(() => {
    fetchSong(_id);
    addToRecents(_id);
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

  const addToRecents = async (id) => {
    try {
      let recents = JSON.parse(await AsyncStorage.getItem("recents"));
      if (!recents) {
        recents = [id];
      } else {
        recents = [id, ...recents];
      }
      recents = [...new Set(recents)];
      if (recents.length > 5) {
        recents.pop();
      }
      await AsyncStorage.setItem("recents", JSON.stringify(recents));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLikedTrack = () => {
    if (isSongLiked()) {
      updateUser(
        "likedSongs",
        user.likedSongs.filter((_) => {
          if (_ == song?._id) return false;
          return true;
        })
      );
    } else {
      updateUser("likedSongs", [...user.likedSongs, song?._id]);
    }
  };

  const isSongLiked = () => {
    return user.likedSongs?.includes(song?._id);
  };

  return (
    <Canvas>
      {renderLoader()}
      {song && (
        <>
          <SongBackdrop
            source={{ uri: song?.artwork?.replace("https", "http") }}
            blurRadius={100}
            style={{ opacity: 0.7 }}
          />

          <ZentEarningWrapper>
            <ZentokenImage source={ZentokenIcon} style={{ marginRight: 8 }} />
            <Text fontWeight="600">
              {renderMsToTiming(position) || "00:00"} •{" "}
              {Number(zentokens).toPrecision(4)} ZENT earned
            </Text>
          </ZentEarningWrapper>

          <SongArtworkContainer>
            <Shadow distance={50} radius={10}>
              <SongArtwork
                source={{ uri: song?.artwork?.replace("https", "http") }}
                style={{
                  shadowColor: "black",
                  shadowOffset: { height: 2 },
                  shadowOpacity: 1,
                }}
              />
            </Shadow>
          </SongArtworkContainer>

          {/**
           * ****************************
           * Continue to listen Animation
           * ****************************
           *
           * startProgressBarAnimation() is used to start the animation
           */}
          {continueListening && (
            <FooterWrapper>
              <FooterBody>
                <Text
                  fontSize="20"
                  fontWeight="bold"
                  style={{ color: "rgba(247, 248, 250, 0.9)" }}
                >
                  Are you still listening to
                </Text>
                <Text
                  fontSize="20"
                  fontWeight="bold"
                  style={{ color: "rgba(247, 248, 250, 0.9)" }}
                >
                  "{song?.name}"?
                </Text>
              </FooterBody>
              <FooterButtons>
                <ContinueButton
                  onPress={() => {
                    setContinueListening(false);
                    clickContinueListeningRef.current = true;
                  }}
                >
                  <Animated.View
                    style={[
                      { width: progressBarWidth },
                      {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        height: 42,
                        backgroundColor: "white",
                        borderRadius: 12,
                      },
                    ]}
                  />
                  <Text
                    fontSize="16"
                    color="black"
                    style={{ position: "relative", zIndex: 2 }}
                  >
                    Continue listening
                  </Text>
                </ContinueButton>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text>Exit</Text>
                </TouchableOpacity>
              </FooterButtons>
            </FooterWrapper>
          )}

          {/**
           * *************
           * Song Controls
           * *************
           */}
          {!continueListening && (
            <ScreenContainer>
              <View>
                <SongTitle>{song?.name || "Song Name"}</SongTitle>
                <SongArtist>
                  {song?.artist
                    ?.map((artist) => {
                      return artist?.name || "Unknown Artist";
                    })
                    .join(", ") || "Unknown Artists"}
                </SongArtist>
              </View>

              {/* Playback Slider / Seekbar */}
              <View>
                <Slider
                  minimumValue={0}
                  value={position}
                  maximumValue={duration}
                  minimumTrackTintColor="rgba(255, 255, 255, 0.6)"
                  maximumTrackTintColor="rgba(255, 255, 255, 0.1)"
                />
                <SongTimingWrapper>
                  <Text style={{ color: "rgba(255, 255, 255, 0.35)" }}>
                    {renderMsToTiming(position) || "00:00"}
                  </Text>
                  <Text style={{ color: "rgba(255, 255, 255, 0.35)" }}>
                    {renderMsToTiming(duration) || "00:00"}
                  </Text>
                </SongTimingWrapper>
              </View>

              <SongControls style={{ position: "relative", top: -7 }}>
                <SongControlsButton>
                  <FontAwesome5 name="backward" size={24} color="white" />
                </SongControlsButton>

                {isPlaying ? (
                  // Pause Button
                  <SongControlsButton
                    onPress={async () => {
                      // return;
                      setIsPlaying(false);
                      await audio.stopAsync();
                      stopTokenTimer();
                    }}
                  >
                    <Foundation name="pause" size={48} color="white" />
                  </SongControlsButton>
                ) : (
                  // Play Button
                  <SongControlsButton
                    onPress={async () => {
                      await audio.unloadAsync();
                      await audio.loadAsync({ uri: song?.source });
                      await audio.playAsync({ uri: song?.source });

                      startTokenTimer();
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
                <Ionicons
                  name="ios-volume-off"
                  color="rgba(255, 255, 255, 0.7)"
                  size={25}
                />
                <Slider
                  style={{
                    width: "86%",
                    marginRight: 5,
                  }}
                  thumbSize={{
                    width: 8,
                    height: 8,
                  }}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="rgba(255, 255, 255, 0.6)"
                  maximumTrackTintColor="rgba(255, 255, 255, 0.1)"
                  value={volume}
                  onValueChange={async (_volume) => {
                    await audio.setVolumeAsync(_volume);
                    setVolume(_volume);
                  }}
                />
                <Ionicons
                  name="ios-volume-high"
                  color="rgba(255, 255, 255, 0.7)"
                  size={25}
                />
              </VolumnSliderWrapper>

              <SongControls style={{ marginBottom: 20, marginTop: 10 }}>
                <OptionButton
                  style={{ backgroundColor: "white" }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Ionicons
                    name="ios-close"
                    size={18}
                    style={{ marginLeft: 0.5, marginTop: 0.5 }}
                  />
                </OptionButton>
                {/* <OptionButton style={{ backgroundColor: 'white'}}>
                <Ionicons name="heart" size={17} style={{ marginLeft: .5, marginTop: 1 }} />
              </OptionButton> */}
                <OptionButton
                  onPress={() => {
                    toggleLikedTrack();
                  }}
                  style={{
                    backgroundColor: isSongLiked()
                      ? "white"
                      : "rgba(247, 248, 250, 0.3)",
                  }}
                >
                  <Ionicons
                    name="heart"
                    size={17}
                    {...{
                      color: isSongLiked() ? "black" : "white",
                    }}
                    style={{
                      marginLeft: 0.5,
                      marginTop: 1,
                    }}
                  />
                </OptionButton>
                <OptionButton
                  onPress={() => {
                    navigation.navigate("AddJournal", { song, zentokens });
                  }}
                >
                  <ZenbaseAddImage
                    source={ZenbaseAddIcon}
                    resizeMode="contain"
                    style={{ marginLeft: 0.5, marginBottom: 2 }}
                  />
                </OptionButton>
                <OptionButton onPress={openContextMenu}>
                  <Feather name="more-horizontal" size={18} color="white" />
                </OptionButton>
              </SongControls>
            </ScreenContainer>
          )}
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
            title: isSongLiked() ? "Remove from Library" : "Add to Library",
            icon: <Ionicons name="heart-outline" size={16} color="white" />,
            onPress: () => {
              toggleLikedTrack();
            },
          },
          {
            divider: true,
          },
          {
            title: "Listen with Friends",
            icon: (
              <View
                style={{
                  width: 16,
                  height: 16,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              >
                <Image
                  source={ZenbaseAddIcon}
                  resizeMode="contain"
                  style={{ width: 10, height: 10 }}
                />
              </View>
            ),
            onPress: () => {
              ReactNativeShare(
                `${user?.name} is inviting you to meditate with him.\n\nJoin here: www.zenbase.us`,
                () => {
                  // Success
                },
                () => {
                  // Dismissed
                },
                (err) => {
                  // Error
                }
              );
            },
          },
          {
            title: "Share Song...",
            icon: <Ionicons name="ios-share-outline" size={16} color="white" />,
            onPress: () => {
              ReactNativeShare(
                `${user?.name} is inviting you to listen the "${song?.name}"! Meditate with ${user?.name} only on Zenbase.`,
                () => {
                  // Success
                },
                () => {
                  // Dismissed
                },
                (err) => {
                  // Error
                }
              );
            },
          },
        ]}
      />
    </Canvas>
  );
}

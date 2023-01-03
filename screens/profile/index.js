// Import Dependencies
import React, { useState, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Text,
  Container,
  Canvas,
  Button,
  IOSList,
  SongTile,
  Box,
  NavigationPadding,
} from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "stores/theme";

// Import Images
import profileImage from "assets/images/artist.png";
import journalIcon from "assets/icons/journal.png";
import zentokenIcon from "assets/icons/zentoken.png";
import followingIcon from "assets/icons/following.png";
import followersIcon from "assets/icons/followers.png";

// Import Profile Header
import ProfileHeader from "screens/profile/header";
import { useAuth } from "stores/auth";
import axios from "services/axios";
import { useFocusEffect } from "@react-navigation/native";
import { useSongQueue } from "stores/song-queue";

// Styled Component
const SongListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Icon = styled.Image``;

export default function Profile({ route, navigation }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchRecentlyPlayedSongs();
    }, [])
  );

  useEffect(() => {
    fetchRecentlyPlayedSongs();
  }, []);

  const fetchRecentlyPlayedSongs = async () => {
    try {
      let recents = JSON.parse(await AsyncStorage.getItem("recents"));
      if (!recents) {
        return setRecentlyPlayedSongs([]);
      }
      const { data } = await axios.get("/songs/ids?ids=" + recents.join(","));
      const songs = [];

      for (let songId of recents) {
        const song = data.data.results.find((song) => song._id == songId);
        if (song) {
          songs.push(song);
        }
      }

      setRecentlyPlayedSongs(songs);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader profilePicture={profileImage} route={route} navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: theme.color.background }}>
        <ScrollView>
          <Container>
            <IOSList
              style={{ marginTop: 12, borderRadius: 10 }}
              notDefault
              transparent
              data={[
                // {
                //   icon: <Ionicons name="ios-musical-note" size={24} color={theme.color.primary} />,
                //   title: 'Sounds',
                //   onPress: () => {
                //     navigation.navigate('Sounds');
                //   }
                // },
                {
                  icon: (
                    <Icon
                      style={{ width: 24, height: 24 }}
                      source={journalIcon}
                      resizeMode="contain"
                    />
                  ),
                  title: "My Journal",
                  onPress: () => {
                    navigation.navigate("Journal");
                  },
                },
                {
                  icon: (
                    <Icon
                      style={{ width: 24, height: 24 }}
                      source={zentokenIcon}
                      resizeMode="contain"
                    />
                  ),
                  title: "Earning Team",
                  onPress: () => {},
                },
                {
                  icon: (
                    <Icon
                      style={{ width: 24, height: 22 }}
                      source={followingIcon}
                      resizeMode="contain"
                    />
                  ),
                  title: "Following",
                  onPress: () => {
                    navigation.navigate("Followers", {
                      title: "Following",
                    });
                  },
                },
                {
                  icon: (
                    <Icon
                      style={{ width: 34, height: 24, marginLeft: -10 }}
                      source={followersIcon}
                      resizeMode="contain"
                    />
                  ),
                  title: "Followers",
                  onPress: () => {
                    navigation.navigate("Followers", {
                      title: "Followers",
                    });
                  },
                },
              ]}
            />

            {recentlyPlayedSongs.length > 0 && (
              <Text fontSize="24" fontWeight="600" style={{ marginTop: 22, marginBottom: 22 }}>
                Wellness Activity
              </Text>
            )}

            <SongListWrapper>
              {recentlyPlayedSongs.map((song) => (
                <SongTile
                  style={{ marginBottom: 20 }}
                  inGrid
                  song={song}
                  queue={recentlyPlayedSongs}
                />
              ))}
            </SongListWrapper>
          </Container>

          <NavigationPadding withSafeAreaInsets />
        </ScrollView>
      </View>
    </View>
  );
}

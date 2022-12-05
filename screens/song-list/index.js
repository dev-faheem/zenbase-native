// Import Dependencies
import React, { useState, useRef } from "react";
import { ScrollView, Platform, View, TouchableOpacity } from "react-native";
import { Text, Container, Canvas, Button, IOSList, SongTile, NavigationPadding } from "components";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";

// Import Icons
import { Ionicons } from "@expo/vector-icons";

// Import Images
import MeditateImage from "assets/images/favorites/meditate.png";
import ChillImage from "assets/images/favorites/chill.png";
import { useTheme } from "stores/theme";

// Styled Component
const Header = styled.SafeAreaView`
  background-color: #0f0f10;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${(Platform.OS == "ios" ? Constants.statusBarHeight : 5) + 45}px;
`;

const HeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: ${() => (Platform.OS == "android" ? "12px" : Constants.statusBarHeight + 5 + "px")};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-left: ${(props) => props.theme.spacing.md};
`;

const SongListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListImage = styled.Image`
  width: 51px;
  height: 30px;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

export default function SongList({ route, navigation }) {
  const { title = "Explore", songs } = route.params;
  const { theme } = useTheme();
  return (
    <>
      <HeaderButtons>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
        </TouchableOpacity>
      </HeaderButtons>
      <Header>
        <Text>{title}</Text>
      </Header>
      <Canvas>
        <ScrollView style={{ flex: 1, paddingTop: 10 }} showsVerticalScrollIndicator={false}>
          <Container style={{ flex: 1 }}>
            <SongListWrapper style={{ marginTop: 20 }}>
              {songs.map((song) => (
                <SongTile style={{ marginBottom: 20 }} inGrid song={song} queue={songs} />
              ))}
            </SongListWrapper>
          </Container>
          <NavigationPadding />
        </ScrollView>
      </Canvas>
    </>
  );
}

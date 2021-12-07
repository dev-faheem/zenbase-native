// Import Dependencies
import React, { useState, useRef } from "react";
import { Animated, Platform } from "react-native";
import {
  Text,
  Container,
  Canvas,
  Button,
  IOSList,
  SongTile,
  NavigationPadding,
} from "components";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";

// Import Images
import MeditateImage from "assets/images/favorites/meditate.png";
import ChillImage from "assets/images/favorites/chill.png";

// Styled Component
const Header = styled.View`
  width: 100%;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;
const BlurHeaderWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${Constants.statusBarHeight}px;
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
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isEdit, setIsEdit] = useState(false);

  return (
    <Canvas>
      <Animated.ScrollView
        style={{ flex: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <Button
            variant={"silent"}
            title={isEdit ? "Done" : "Edit"}
            onPress={() => setIsEdit(!isEdit)}
          />
        </Header>
        <Container style={{ flex: 1 }}>
          <Text fontWeight="bold" fontSize="h2">
            Song List
          </Text>

          <SongListWrapper style={{ marginTop: 20 }}>
            <SongTile style={{ marginBottom: 20 }} inGrid mock />
            <SongTile style={{ marginBottom: 20 }} inGrid mock />
            <SongTile style={{ marginBottom: 20 }} inGrid mock />
            <SongTile style={{ marginBottom: 20 }} inGrid mock />
            <SongTile style={{ marginBottom: 20 }} inGrid mock />
            <SongTile style={{ marginBottom: 20 }} inGrid mock />
          </SongListWrapper>
        </Container>
        <NavigationPadding />
      </Animated.ScrollView>

      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: scrollY.interpolate({
            inputRange: [20, 50],
            outputRange: [-1, 1],
          }),
          opacity: scrollY.interpolate({
            inputRange: [20, 50],
            outputRange: [0, 1],
          }),
        }}
      >
        <BlurView
          intensity={150}
          style={{
            width: "100%",
            height:
              (Platform.OS == "ios" ? Constants.statusBarHeight : 15) + 30,
            paddingBottom: Platform.OS == "android" ? 10 : 0,
          }}
          tint="dark"
        >
          <BlurHeaderWrapper>
            <Text style={{ marginBottom: 15 }}>Liked Tracks</Text>
          </BlurHeaderWrapper>
        </BlurView>
      </Animated.View>
    </Canvas>
  );
}

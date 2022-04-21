import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Container,
  Canvas,
  Box,
  SongList,
  CategoryList,
  Explorables,
  NavigationPadding,
} from "components";
import {
  ScrollView,
  Animated,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import useSearch from "queries/useSearch";
import useCategories from "queries/useCategories";
import Constants from "expo-constants";
import { useTheme } from "stores/theme";
import Divider from "components/divider";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "stores/auth";
import { useNavigation } from "@react-navigation/native";
import axios from "services/axios";

// Import Images
import zentBackground from "assets/images/wallet/zent-bg.png";
import ActivelyListing from "components/actively-listening";

const PremiumTextWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

const BlurHeaderWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${Constants.statusBarHeight}px;
`;

const ListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

const ListContentWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${(props) => props.theme.spacing.lg};
`;

const VAlignCenter = styled.View`
  padding-top: ${(props) => props.theme.spacing.md};
  padding-bottom: ${(props) => props.theme.spacing.sm};
  flex-direction: column;
  justify-content: center;
`;

const ZentImage = styled.Image`
  height: 30px;
  width: 51px;
  border-radius: 2px;
`;

export default function Home({ navigation, route }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const bestNewSounds = useSearch();
  const { data: categories } = useCategories();
  const { theme } = useTheme();
  const { user, walletAmount, logout } = useAuth();

  const [under10MinSongs, setUnder10MinSongs] = useState([]);
  const [guidedMeditationSongs, setGuidedMeditationSongs] = useState([]);
  const [chillSongs, setChillSongs] = useState([]);

  const fetchSongsUnder10Min = async () => {
    try {
      const { data } = await axios.get("/songs/duration/600");
      setUnder10MinSongs(data.data.results);
    } catch (e) {
      axios.handleError(e);
    }
  };

  const fetchGuidedMeditation = async () => {
    try {
      const { data } = await axios.get(
        "/songs/category-name/guided meditation"
      );
      setGuidedMeditationSongs(data.data.results);
    } catch (e) {
      axios.handleError(e);
    }
  };

  const fetchChill = async () => {
    try {
      const { data } = await axios.get("/songs/category-name/chill");
      setChillSongs(data.data.results);
    } catch (e) {
      axios.handleError(e);
    }
  };

  useEffect(() => {
    bestNewSounds.mutate({ sort: "-createdAt" });
    fetchSongsUnder10Min();
    fetchGuidedMeditation();
    fetchChill();
  }, []);

  if (route.params?.performLogout === true) {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Animated.ScrollView
        style={{ backgroundColor: theme.color.background }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Box mt={`${Constants.statusBarHeight}px`} />

          <PremiumTextWrapper>
            {user?.isPremium && <Text>Premium</Text>}
          </PremiumTextWrapper>

          <Text fontSize="h2" fontWeight="bold">
            Explore
          </Text>
          <ActivelyListing />
        </Container>

        <Explorables />

        <Container>
          {!user.isPremium && (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PremiumTrailEnded");
                }}
              >
                <ListWrapper>
                  <VAlignCenter style={{ marginLeft: 5 }}>
                    <ZentImage source={zentBackground} />
                  </VAlignCenter>
                  <ListContentWrapper>
                    <VAlignCenter>
                      <Text color="white">
                        {Number(walletAmount).toPrecision(6)} ZENT
                      </Text>
                      <Text
                        color="secondary"
                        fontSize={12}
                        style={{ marginTop: 2 }}
                      >
                        Earning 10% more with Zenbase Premium
                      </Text>
                    </VAlignCenter>
                    <VAlignCenter style={{ paddingRight: 5 }}>
                      <Ionicons
                        name="ios-chevron-forward"
                        size={24}
                        color={theme.color.information}
                      />
                    </VAlignCenter>
                  </ListContentWrapper>
                </ListWrapper>
              </TouchableOpacity>
              <Divider style={{ marginTop: 5, marginBottom: 20 }} />
            </>
          )}

          <CategoryList categories={categories} />
          <SongList
            title="Best New Sounds"
            songs={bestNewSounds?.data?.results || []}
          />

          <SongList title="Under 10 Minutes" songs={under10MinSongs} />

          <SongList title="Guided Meditation" songs={guidedMeditationSongs} />

          <SongList title="Chill" songs={chillSongs} showDivider={false} />
          <Box mt="20px"></Box>
        </Container>

        <NavigationPadding padding={50} />
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
            <Text style={{ marginBottom: 15 }}>Explore</Text>
          </BlurHeaderWrapper>
        </BlurView>
      </Animated.View>
    </>
  );
}

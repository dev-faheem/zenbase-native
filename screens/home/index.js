import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Text,
  Container,
  Box,
  SongList,
  CategoryList,
  Explorables,
  NavigationPadding,
  Button,
} from "components";
import {
  ScrollView,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Dimensions,
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "services/axios";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "helpers/notifications";

// Import Images
import zentBackground from "assets/images/wallet/zent-bg.png";
import ActivelyListing from "components/actively-listening";

const windowHeight = Dimensions.get("window").height;

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
  const { user, walletAmount, logout, fetchTransactions, updateUser } =
    useAuth();

  // if (route.params?.performLogout === true) {
  //   logout();
  //   AsyncStorageLib.clear();
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "Login" }],
  //   });

  //   return <></>;
  // }

  const scrollY = useRef(new Animated.Value(0)).current;

  const bestNewSounds = useSearch();
  const { data: categories } = useCategories();
  const { theme } = useTheme();

  const [under10MinSongs, setUnder10MinSongs] = useState([]);
  const [guidedMeditationSongs, setGuidedMeditationSongs] = useState([]);
  const [chillSongs, setChillSongs] = useState([]);

  const [isFirstTimeModel, setIsFirstTimeModal] = useState(true);

  const notificationListener = useRef();
  const responseListener = useRef();

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

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("notification", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response notification", response);
      });

    (async () => {
      try {
        if ((await AsyncStorage.getItem("isFirstTimeModal")) == "0") {
          return setIsFirstTimeModal(false);
        }
      } catch (e) {
        console.log(e);
      }
    })();

    (async () => {
      try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await Notifications.scheduleNotification(
          {
            title: `Don't Forget to Earn Zentokens!`,
            body: "Take time to clear your mind. Come back to keep earning Zentokens!",
          },
          { seconds: 2 * 60 * 60 }
        );
        await Notifications.scheduleNotification(
          {
            title: `Crazy Day? Meditate for 5 minutes`,
            body: `With a clear head you'll better able to manage your day.`,
          },
          { seconds: 8 * 60 * 60 }
        );
        await Notifications.scheduleNotification(
          {
            title: `Need Something Chill?`,
            body: "Listen to chill vibes while taking time for yourself.",
          },
          { seconds: 5 * 60 * 60 }
        );
        await Notifications.scheduleNotification(
          {
            title: `Relax Before Bedtime`,
            body: `Take time tonight to clear your mind and catch good zzz's.`,
          },
          { repeats: true, hour: 21, minute: 15 }
        );
        await Notifications.scheduleNotification(
          {
            title: `Start Your Morning Right`,
            body: `Take some time to express gratitude and feel grateful throughout the day.`,
          },
          { repeats: true, hour: 6, minute: 30 }
        );
      } catch (e) {
        console.log(e);
      }
    })();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // useEffect(() => {
  //   verifyZenbasePremium()
  // }, [])

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
      verifyZenbasePremium();

      return () => {
        removeFirstTimeModal();
      };
    }, [])
  );

  const removeFirstTimeModal = async () => {
    try {
      setIsFirstTimeModal(false);
      await AsyncStorage.setItem("isFirstTimeModal", "0");
    } catch (e) {
      console.log(e);
    }
  };

  const verifyZenbasePremium = async () => {
    try {
      const response = await axios.get("/subscriptions");
      if (user.isPremium == true && response.data.data.isPremium == false) {
        // User premium has ended
      }
      updateUser("isPremium", response.data.data.isPremium);
      updateUserLocal("hours", response.data.data.hours);
    } catch (e) {
      axios.handleError(e);
    }
  };

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
        scrollEnabled={!isFirstTimeModel}
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
          <>
            <TouchableOpacity
              onPress={() => {
                if (user?.isPremium) {
                  navigation.navigate("Wallet");
                } else {
                  navigation.navigate("PremiumTrailEnded");
                }
              }}
            >
              <ListWrapper>
                <VAlignCenter style={{ marginLeft: 5 }}>
                  <ZentImage source={zentBackground} />
                </VAlignCenter>
                <ListContentWrapper>
                  <VAlignCenter>
                    <Text color="white">
                      {Number(walletAmount).toFixed(6)} ZENT
                    </Text>
                    {!user?.isPremium && (
                      <Text
                        color="secondary"
                        fontSize={12}
                        style={{ marginTop: 2 }}
                      >
                        Earning 10% more with Zenbase Premium
                      </Text>
                    )}
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

          <CategoryList categories={categories} />
          <SongList
            title="Best New Meditations"
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

      {isFirstTimeModel && (
        <TouchableWithoutFeedback onPress={removeFirstTimeModal}>
          <BlurView
            intensity={150}
            style={{
              position: "absolute",
              width: "100%",
              height:
                windowHeight -
                (Platform.OS == "ios" ? Constants.statusBarHeight : 15) -
                310,
              bottom: 0,
              left: 0,
              zIndex: 99999,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            tint="dark"
          >
            <AntDesign
              name="arrowup"
              size={50}
              color="white"
              style={{ marginTop: 20 }}
            />
            <Text
              style={{ marginTop: 25, textAlign: "center" }}
              fontSize={22}
              fontWeight={600}
            >
              Welcome!
            </Text>
            <Text
              style={{ marginTop: 10, textAlign: "center" }}
              fontSize={22}
              fontWeight={600}
            >
              If you’re new to meditation, we recommend you start here.
            </Text>
            <Text
              style={{ marginTop: "30%", textAlign: "center" }}
              fontSize={14}
            >
              No thanks, I know how to meditate
            </Text>
          </BlurView>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

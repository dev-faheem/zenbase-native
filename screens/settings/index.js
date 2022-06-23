// Import Dependencies
import React, { useState, useEffect } from "react";
import { Alert, ScrollView, View, Image, Switch } from "react-native";
import {
  Text,
  Container,
  Canvas,
  Button,
  IOSList,
  SongTile,
  Box,
} from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "stores/theme";

// Import Images
import ZenbaseVector from "assets/vectors/zenbase.png";
import AdVector from "assets/vectors/Ad.png";
import ZentTokenVector from "assets/vectors/zen-token.png";
import profileImage from "assets/images/artist.png";

// Import Profile Header
import ProfileHeader from "screens/profile/header";
import { useAuth } from "stores/auth";
import { CommonActions, useNavigation } from "@react-navigation/native";
import ReactNativeShare from "helpers/react-native-share";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

// Styled Component
const SwitchWrapper = styled.View`
  height: 47px;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background-color: ${(props) => props.theme.color.hud};
  margin-top: ${(props) => props.theme.spacing.lg};
  padding-left: ${(props) => props.theme.spacing.md};
  padding-right: ${(props) => props.theme.spacing.md};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Settings({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { user, updateUser, logout } = useAuth();
  // States
  const [autoRenew, setAutoRenew] = useState(
    user?.renewZenbasePremiumAutomatically || false
  );

  const toggleAutoRenew = () => {
    setAutoRenew(!autoRenew);
  };

  useEffect(() => {
    if (user?.renewZenbasePremiumAutomatically != autoRenew) {
      updateUser("renewZenbasePremiumAutomatically", autoRenew);
    }
  }, [autoRenew]);

  const inviteFriend = (message) => {
    ReactNativeShare(
      message,
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
  };

  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader
        editable
        profilePicture={profileImage}
        route={route}
        navigation={navigation}
      />
      <View style={{ flex: 1, backgroundColor: theme.color.black }}>
        <ScrollView>
          <Container>
            <IOSList
              style={{ marginTop: 20, borderRadius: 10, paddingLeft: 10 }}
              data={[
                // {
                //   icon: <Ionicons name="ios-add-circle" size={24} color={theme.color.primary} />,
                //   title: 'Post new sound',
                //   onPress: () => {

                //   }
                // },
                {
                  icon: (
                    <FontAwesome5
                      name="user-plus"
                      size={19}
                      color={theme.color.primary}
                      style={{ marginLeft: 2 }}
                    />
                  ),
                  title: "Invite Friends",
                  onPress: () =>
                    inviteFriend(
                      `${user?.name} is inviting you to meditate with him/her. Zenbase is the fastest-growing meditation app with cryptocurrency rewards. \n\nJoin Here: https://zenbase.us`
                    ),
                },
                user?.isPremium
                  ? {
                      icon: (
                        <Image
                          source={ZenbaseVector}
                          style={{ marginRight: 3, width: 23, height: 23 }}
                          resizeMode="contain"
                        />
                      ),
                      title: user?.isPremium
                        ? "Cancel Zenbase Premium"
                        : "Zenbase Premium",
                      onPress: () => {
                        if (user?.isPremium) {
                          navigation.navigate("CancelPremium");
                        } else {
                          navigation.navigate("");
                        }
                      },
                    }
                  : null,
                {
                  icon: (
                    <Image
                      source={AdVector}
                      style={{ marginRight: 3, width: 23, height: 23 }}
                      resizeMode="contain"
                    />
                  ),
                  title: "Zenbase Ads",
                  onPress: () => {
                    navigation.navigate("ZenbaseAds", { isForLogin: false });
                  },
                },
                // {
                //   icon: (
                //     <Image
                //       source={ZentTokenVector}
                //       style={{ marginRight: 3, width: 21, height: 21 }}
                //       resizeMode="cover"
                //     />
                //   ),
                //   title: "Rewards",
                //   onPress: () => {},
                // },
                {
                  icon: (
                    <View
                      style={{
                        marginRight: 3,
                        width: 21,
                        height: 21,
                        borderRadius: 50,
                        backgroundColor: theme.color.primary,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="arrow-forward"
                        size={20}
                        color={theme.color.hud}
                        style={{ marginLeft: -4 }}
                      />
                    </View>
                  ),
                  title: "Sign Out",
                  onPress: async () => {
                    await AsyncStorageLib.removeItem("recents");
                    await AsyncStorageLib.removeItem("@zenbase_user");
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Login" }],
                    });
                    return;
                    navigation.navigate("Home", {
                      performLogout: true,
                    });
                  },
                },
              ].filter((_) => _ != null)}
            />
            {/* <SwitchWrapper>
              <Text numberOfLines={1}>Renew Zenbase Premium Automatically</Text>
              <Switch onValueChange={toggleAutoRenew} value={autoRenew} />
            </SwitchWrapper>
            <Text
              fontSize="sm"
              color="information"
              style={{ marginTop: 8, paddingLeft: 8 }}
            >
              When you have enough Zentoken your tokens will be redeemed for
              Zenbase Premium automatically.
            </Text> */}
          </Container>
        </ScrollView>
      </View>
    </View>
  );
}

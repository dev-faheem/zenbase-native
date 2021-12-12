// Import Dependencies
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "stores/auth";

// Import Components
import { TabBar } from "components";

// Import Screens
import Login from "screens/auth/login";
import Register from "screens/auth/register";
import Home from "screens/home";
import Profile from "screens/profile";
import Favorites from "screens/favorites";
import Wallet from "screens/wallet";
import Search from "screens/search";
import Followers from "screens/followers";
import Sounds from "screens/sounds";
import Settings from "screens/settings";
import EditProfile from "screens/edit-profile";
import Journal from "screens/journal";
import DeleteJournal from "screens/journal/delete";
import ZentDonation from "screens/zent-donation";
import DonationThanks from "screens/zent-donation/donation-thanks";
import FavoritesType from "screens/favorites/favorites-type";
import ForgotPassword from "screens/auth/forgot-password";
import OneTimePassword from "screens/auth/otp";
import SignupBonus from "screens/signup-bonus";
import ReferFriends from "screens/refer-friends";
import ZenbaseAds from "screens/zenbase-ads";
import RegisterRewards from "screens/auth/register-rewards";
import PremiumTrial from "screens/auth/premium-trial";
import PremiumTrailEnded from "screens/home/premium-trail-ended";
import WalletRewards from "screens/wallet/wallet-rewards";
import WalletPremium from "screens/wallet/wallet-premium";
import CancelPremium from "screens/profile/cancel-premium";
import PremiumUpgrade1 from "screens/play/premium-upgrade-1";
import PremiumUpgrade2 from "screens/play/premium-upgrade-2";

// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Create Bottom Tab Navigator
const Tabs = createBottomTabNavigator();

/**
 * **********
 * Components
 * **********
 */

// Bottom Tab Navigator
export function HomeStack() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
      backBehavior="history"
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Wallet" component={Wallet} />
      <Tabs.Screen name="Favorites" component={Favorites} />
      <Tabs.Screen name="FavoritesType" component={FavoritesType} />
      <Tabs.Screen name="Profile" component={Profile} />
      <Tabs.Screen name="Followers" component={Followers} />
      <Tabs.Screen name="Sounds" component={Sounds} />
    </Tabs.Navigator>
  );
}

// Navigation Component (Default)
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PremiumUpgrade2"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name="App" component={HomeStack} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Journal" component={Journal} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OTP" component={OneTimePassword} />
          <Stack.Screen name="SignupBonus" component={SignupBonus} />
          <Stack.Screen name="ReferFriends" component={ReferFriends} />
          
        </Stack.Group>

        <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="DeleteJournal" component={DeleteJournal} />
          <Stack.Screen name="ZentDonation" component={ZentDonation} />
          <Stack.Screen name="DonationThanks" component={DonationThanks} />
          <Stack.Screen name="ZenbaseAds" component={ZenbaseAds} />

          {/* CTAs */}
          <Stack.Screen name="RegisterRewards" component={RegisterRewards} />
          <Stack.Screen name="PremiumTrial" component={PremiumTrial} />
          <Stack.Screen name="PremiumTrailEnded" component={PremiumTrailEnded} />
          <Stack.Screen name="WalletRewards" component={WalletRewards} />
          <Stack.Screen name="WalletPremium" component={WalletPremium} />
          <Stack.Screen name="CancelPremium" component={CancelPremium} />
          <Stack.Screen name="PremiumUpgrade1" component={PremiumUpgrade1} />
          <Stack.Screen name="PremiumUpgrade2" component={PremiumUpgrade2} />
        </Stack.Group>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

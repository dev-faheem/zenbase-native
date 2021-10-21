import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "screens/auth/login";
import Register from "screens/auth/register";
import Home from "screens/home";
import Profile from "screens/profile";
import Favorites from "screens/favorites";
import Wallet from "screens/wallet";
import Search from "screens/search";
import { useAuth } from "stores/auth";
import { Text } from "react-native";

const Tabs = createBottomTabNavigator();

export function AuthWall() {
  const { isLoggedIn } = useAuth();

  // Auth Guard
  // if (!isLoggedIn) {
  //   return (
  //     <Text>
  //       You are not logged in. You must log in before accessing these screens
  //     </Text>
  //   );
  // }

  return (
    <Tabs.Navigator
      initialRouteName="Search"
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Wallet" component={Wallet} />
      <Tabs.Screen name="Favorite" component={Favorites} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="App" component={AuthWall} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

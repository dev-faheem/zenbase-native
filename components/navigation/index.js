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

// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Create Bottom Tab Navigator
const Tabs = createBottomTabNavigator();

/**
 * **********
 * Components
 * **********
 */

// Auth Wall
export function AuthWall() {
  const { isLoggedIn } = useAuth();

  // Auth Guard
  if (!isLoggedIn) {
    return (
      <Text>
        You are not logged in. You must log in before accessing these screens
      </Text>
    );
  }

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
      <Tabs.Screen name="Favorite" component={Favorites} />
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
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="App" component={AuthWall} />
        </Stack.Group>

        <Stack.Group screenOPtions={{ presentation: 'modal' }}>
          
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

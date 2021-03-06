/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/common/ModalScreen";
import NotFoundScreen from "../screens/common/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import TabThreeScreen from "../screens/TabThreeScreen";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/root/HomeScreen";
import SearchScreen from "../screens/root/SearchScreen";
import LoveScreen from "../screens/root/LoveScreen";
import ProfileScreen from "../screens/root/ProfileScreen";
import StoryScreen from "../screens/root/StoryScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { Text, View } from "../components/Themed";
import { fontSizes } from "../constants";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MonoText } from "../components/StyledText";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerStyle: {
          backgroundColor: "blue",
        },
      }}
    >
      <Stack.Screen
        name="Auth"
        component={AuthTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "yellow",
          },
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const AuthTab = createNativeStackNavigator<RootTabParamList>();
function AuthTabNavigator() {
  return (
    <AuthTab.Navigator initialRouteName="LoginScreen">
      <BottomTab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />
      <BottomTab.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register",
        }}
      />
    </AuthTab.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          height: 60,
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerTitle: "",
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerLeft: () => (
          <View
            style={{
              flex: 1,
              position: "absolute",
              paddingHorizontal: 14,
              backgroundColor: "transparent",
            }}
          >
            <MonoText
              style={{
                fontSize: fontSizes.h2,
              }}
            >
              C.Instagram
            </MonoText>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              flex: 1,
              flexWrap: "nowrap",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 14,
              height: "100%",
              backgroundColor: "transparent",
            }}
          >
            <Pressable
              onPress={() => console.log(123)}
              style={({ pressed }) => ({
                opacity: pressed ? 1 : 0.5,
              })}
            >
              <MaterialCommunityIcons
                name="home"
                size={20}
                style={{ paddingHorizontal: 7 }}
                color={Colors[colorScheme].tint}
              />
            </Pressable>
            <Pressable
              onPress={() => console.log(123)}
              style={({ pressed }) => ({
                opacity: pressed ? 1 : 0.5,
              })}
            >
              <MaterialCommunityIcons
                name="facebook-messenger"
                size={20}
                style={{ paddingHorizontal: 7 }}
                color={Colors[colorScheme].tint}
              />
            </Pressable>
          </View>
        ),
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon fontSize={20} name="home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="StoryScreen"
        component={StoryScreen}
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon fontSize={20} name="bookmark-o" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon fontSize={20} name="search" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="LoveScreen"
        component={LoveScreen}
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon fontSize={20} name="heart" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon fontSize={20} name="user" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  fontSize: number | 30;
}) {
  return (
    <FontAwesome
      size={props.fontSize}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

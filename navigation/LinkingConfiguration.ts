/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Auth: {
        screens: {
          LoginScreen: "login",
          RegisterScreen: "register",
        },
      },
      Root: {
        screens: {
          HomeScreen: "home",
          StoryScreen: "story",
          SearchScreen: "search",
          ProfileScreen: "profile",
          LoveScreen: "love",
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { fontSizes } from "../../constants";
import { IPost } from "../../services/PostService";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MonoText } from "../StyledText";

export default function PostAvatar({ postItem }: { postItem: IPost }) {
  const colorScheme = useColorScheme();

  const calTimeSince = (fromDateString: string) => {
    const fromDate: Date = new Date(fromDateString);
    const nowDate: Date = new Date();
    const seconds = Math.floor((nowDate.getTime() - fromDate.getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "M";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval < 1) {
      return "now";
    }
    return Math.floor(interval) + "m";
  };

  return (
    <View
      style={{
        ...styles.item,
        backgroundColor: "transparent",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          style={styles.circular}
          source={{
            uri: postItem.avatarUrl,
          }}
        />
        <MonoText
          style={{
            color: Colors[colorScheme].text,
            fontSize: fontSizes.h5,
            paddingHorizontal: 14,
          }}
        >
          {postItem.userName}
        </MonoText>
        <MonoText
          style={{
            color: Colors[colorScheme].text,
            fontSize: fontSizes.h5,
            paddingHorizontal: 8,
          }}
        >
          {calTimeSince(postItem.createdDate)}
        </MonoText>
      </View>
      <MaterialCommunityIcons
        name="dots-horizontal"
        size={20}
        color={Colors[colorScheme].tint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    padding: 0,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 35,
    height: 35,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 50,
  },
});

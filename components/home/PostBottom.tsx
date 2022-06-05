import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Touchable,
  Pressable,
} from "react-native";
import { fontSizes } from "../../constants";
import { IPost } from "../../services/PostService";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { screenHeight, screenWidth } from "../../utilies/Device";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthService from "../../services/AuthService";
import { MonoText } from "../StyledText";

export default function PostBottom({
  postItem,
  onPressLikeImage,
}: {
  postItem: IPost;
  onPressLikeImage: Function;
}) {
  const colorScheme = useColorScheme();
  const [isShowComment, setIsShowComment] = useState(true);
  const [numberPicture, setNumberPicture] = useState(
    postItem.listImageUrl.length
  );
  const [user, setUser] = useState(null);
  useEffect(() => {
    AuthService.getCurrentUser().then((user) => {
      setUser(user);
    });
  }, [postItem]);

  const buildLinePicture = (numberPicture: number) => {
    return (
      // <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          zIndex: 100,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginHorizontal: 5,
          marginVertical: 3,
          height: 10,
          // backgroundColor: "blue",
        }}
        style={{
          maxHeight: 10,
          width: screenWidth,
          padding: 0,
          margin: 0,
          // backgroundColor: "yellow",
        }}
      >
        {[...Array(numberPicture).keys()].map((item, index) => (
          <TouchableOpacity
            key={`index${index}`}
            style={{
              flex: 1,
              paddingVertical: 1,
              paddingHorizontal: 2,
              height: 1,
              // backgroundColor: "yellow",
            }}
          >
            <View
              style={{
                paddingHorizontal: 15,
                height: 1.5,
                backgroundColor:
                  index == postItem.selectedIndexImage
                    ? Colors[colorScheme].text
                    : Colors[colorScheme].blurText,
                // backgroundColor: "red",
              }}
            ></View>
            {/* <MaterialCommunityIcons
                name="circle"
                style={{
                  backgroundColor: "green",
                }}
                size={index == postItem.selectedIndexImage ? 12 : 8}
                color={
                  index == postItem.selectedIndexImage
                    ? Colors.icon.color
                    : Colors[colorScheme].tint
                }
              /> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
      // </SafeAreaView>
    );
  };

  return (
    <View
      style={{
        ...styles.item,
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        // paddingsTop: 30,
        backgroundColor: "transparent",
      }}
    >
      {isShowComment ? (
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: screenWidth,
          }}
        >
          <TouchableOpacity>
            <MonoText
              style={{
                color: Colors[colorScheme].text,
                fontSize: fontSizes.h6,
                padding: 8,
                textAlign: "left",
                fontWeight: "600",
              }}
            >
              Add a comment ...
            </MonoText>
            {buildLinePicture(numberPicture)}
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        {/* <MonoText>dsadasdas</MonoText> */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",

            alignItems: "flex-start",
            paddingLeft: 7,
            justifyContent: "flex-start",
            backgroundColor: "transparent",
          }}
        >
          <Pressable onPress={() => onPressLikeImage(true)}>
            <MaterialCommunityIcons
              name="heart"
              size={22}
              style={{ paddingVertical: 0, paddingHorizontal: 7 }}
              color={
                user && postItem.likedUsers.includes(user.userId)
                  ? Colors.icon.color
                  : Colors[colorScheme].tint
              }
            />
          </Pressable>
          <MaterialCommunityIcons
            name="comment"
            size={22}
            style={{ paddingVertical: 0, paddingHorizontal: 4 }}
            color={Colors[colorScheme].tint}
          />
          <MaterialCommunityIcons
            name="share"
            size={22}
            style={{ paddingVertical: 0, paddingHorizontal: 4 }}
            color={Colors[colorScheme].tint}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingVertical: 10,
            paddingRight: 7,
            flexWrap: "nowrap",
            paddingHorizontal: 10,
            backgroundColor: "transparent",
          }}
        >
          <MonoText
            style={{
              color: Colors[colorScheme].text,
              fontSize: fontSizes.h6,
              paddingVertical: 1,
              textAlign: "auto",
            }}
          >
            45k like
          </MonoText>
          <MonoText
            style={{
              color: Colors[colorScheme].text,
              fontSize: fontSizes.h6,
              paddingVertical: 1,

              textAlign: "left",
            }}
          >
            3k comment
          </MonoText>
        </View>
      </View>
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

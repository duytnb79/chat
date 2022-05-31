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
} from "react-native";
import { fontSizes } from "../../constants";
import { IPost } from "../../services/PostService";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { screenHeight, screenWidth } from "../../utilies/Device";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostBottom({ postItem }: { postItem: IPost }) {
  const colorScheme = useColorScheme();
  const [isShowComment, setIsShowComment] = useState(false);
  const [numberPicture, setNumberPicture] = useState(
    postItem.listImageUrl.length
  );

  const buildLinePicture = (numberPicture: number) => {
    return (
      <ScrollView
        style={{
          flex: 1,
          maxHeight: 10,
          paddingHorizontal: 10,
          paddingBottom: 4,
          paddingTop: 40,
          // justifyContent: "center",
          // alignItems: "center",
          width: screenWidth,
          padding: 0,
          margin: 0,
          // backgroundColor: "red",
        }}
      >
        {/* <Text style={{ color: "green" }}>dsadsa</Text> */}
        <FlatList
          data={[...Array(numberPicture).keys()]}
          numColumns={numberPicture}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={`index${index}`}
              style={{
                // width: "8%",
                height: 2.4,
                flex: 0.5,
                paddingHorizontal: 3,
                // marginVertical: 5,
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  // width: "8%",
                  height: 2.4,
                  flex: 0.5,
                  backgroundColor:
                    index == postItem.selectedIndexImage
                      ? Colors[colorScheme].text
                      : Colors[colorScheme].blurText,
                }}
              >
                <Text> dsa</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
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
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // paddingsTop: 30,
        backgroundColor: "transparent",
      }}
    >
      {isShowComment ? (
        <TouchableOpacity>
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: fontSizes.h5,
              paddingTop: 10,
              paddingHorizontal: 8,
              textAlign: "left",
              fontWeight: "500",
            }}
          >
            Add a comment ...
          </Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      {buildLinePicture(numberPicture)}

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Text>dsadasdas</Text> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "transparent",
          }}
        >
          <MaterialCommunityIcons
            name="heart"
            size={22}
            style={{ paddingVertical: 0, paddingHorizontal: 7 }}
            color={Colors[colorScheme].tint}
          />
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
            flexWrap: "nowrap",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: fontSizes.h6,
              paddingVertical: 1,
              textAlign: "auto",
            }}
          >
            45k like
          </Text>
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: fontSizes.h6,
              paddingVertical: 1,
              textAlign: "left",
            }}
          >
            3k comment
          </Text>
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

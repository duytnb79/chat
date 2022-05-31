import React, { useEffect, useRef, useState } from "react";
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
import { Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import PostAvatar from "./PostAvatar";
import PostBottom from "./PostBottom";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Post({ postItem }: { postItem: IPost }) {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const heightPost = screenHeight * 0.5;
  const colorScheme = useColorScheme();

  const [isReduceText, setIsReduceText] = useState(true);
  const [reduceText, setReduceText] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState() as any;

  useEffect(() => {
    const row = getReduceText(postItem.content) as JSX.Element;
    setReduceText(row as any);
    postItem.selectedIndexImage = activeIndex;
  }, [isReduceText, activeIndex]);

  const getReduceText = (text: string): JSX.Element => {
    console.log("isReduceText", isReduceText);
    if (text && text.length && isReduceText) {
      text = text.slice(0, 10);
      return (
        <TouchableOpacity onPress={() => setIsReduceText(!isReduceText)}>
          <Text
            style={{
              color: Colors[colorScheme].text,
            }}
          >
            {text}...{" "}
            <Text
              style={{
                color: Colors[colorScheme].blurText,
              }}
            >
              more
            </Text>
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => setIsReduceText(!isReduceText)}>
        <Text
          style={{
            color: Colors[colorScheme].text,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const buildImageSlider = () => {
    const rows: JSX.Element[] = [];
    for (const imageUrl of postItem.listImageUrl) {
      rows.push(
        <Image
          key={imageUrl}
          style={{
            width: screenWidth,
            height: "100%",
            resizeMode: "cover",
            opacity: isReduceText ? 1 : 0.5,
          }}
          source={{
            uri: imageUrl,
          }}
        />
      );
    }
    return rows;
  };

  const buildReduceText = () => {
    // return <View></View>;
    return (
      <View
        style={{
          maxHeight: isReduceText ? 20 : 1000,
          paddingHorizontal: 8,
          position: "absolute",
          bottom: 10,
          left: 8,
          backgroundColor: "transparent",
        }}
      >
        <Text
          adjustsFontSizeToFit={true}
          ellipsizeMode="tail"
          style={{
            lineHeight: 20,
            color: Colors[colorScheme].text,
            fontSize: fontSizes.h5,
          }}
        >
          {reduceText}
        </Text>
      </View>
    );
  };

  const handleOnMomentumScrollEnd = (e: any, state: any, context: any) => {
    console.log(state.index, context.state.index, activeIndex);
    postItem.selectedIndexImage = context.state.index;
  };
  console.log("activeIndex", activeIndex);

  const handleOnIndexChanged = (index: number) => {
    console.log(index, "ss");
    console.log(swiper);
    console.log("setActiveIndex", activeIndex);
  };

  return (
    <View
      style={{
        ...styles.item,
        height: "100%",
        // borderWidth: 0.1,
        backgroundColor: "transparent",
        // borderColor: "white",
      }}
    >
      <PostAvatar postItem={postItem} />
      <ImageBackground
        style={{
          width: screenWidth,
          height: screenHeight,
          zIndex: -1,
          position: "absolute",
          opacity: 0.25,
          maxHeight: screenHeight + 20,
        }}
        blurRadius={20}
        source={{
          uri: postItem.listImageUrl[0],
        }}
      />
      <View style={{ width: screenWidth, height: heightPost }}>
        <Swiper
          key={3}
          scrollEnabled={true}
          loop={false}
          showsButtons={false}
          horizontal={true}
          bounces={true}
          pagingEnabled={true}
          showsPagination={false}
          index={activeIndex}
          onIndexChanged={setActiveIndex}
          showsVerticalScrollIndicator={true}
          ref={(swiper) => setSwiper(swiper)}
          // loadMinimal
          // loadMinimalSize={0}
          // onTouchStart={handleOnMomentumScrollEnd}
          // onResponderRelease={handleOnMomentumScrollEnd}
          // loadMinimalLoader={
          //   <LivePlayerSpinner
          //     cover={channels[loadingIndex].cover}
          //     title={channels[loadingIndex]['current-schedule-program'].title}
          //   />
          // }

          scrollEventThrottle={16}
        >
          {buildImageSlider()}
        </Swiper>
        {buildReduceText()}
      </View>
      <PostBottom postItem={postItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    padding: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

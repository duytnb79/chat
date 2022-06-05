import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { fontSizes } from "../../constants";
import { IPost } from "../../services/PostService";
import { Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import PostAvatar from "./PostAvatar";
import PostBottom from "./PostBottom";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthService from "../../services/AuthService";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../services/UserService";
import { MonoText } from "../StyledText";

interface Props {
  First: React.ElementType<any>;
  Second: React.ElementType<any>;
}

export default function Post({ postItem }: { postItem: IPost }) {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const heightPost = screenHeight * 0.7;
  const colorScheme = useColorScheme();

  const [user, setUser] = useState(null);
  useEffect(() => {
    AuthService.getCurrentUser().then((user) => {
      setUser(user);
    });
  }, [postItem]);
  const [isDisplayLikeHeart, setIsDisplayLikeHeart] = useState(false);

  const [isReduceText, setIsReduceText] = useState(true);
  const [reduceText, setReduceText] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState() as any;

  useEffect(() => {
    const content = getReduceText(postItem.content) as JSX.Element;
    setReduceText(content as any);
    postItem.selectedIndexImage = activeIndex;
  }, [isReduceText, activeIndex]);

  const getReduceText = (text: string): JSX.Element => {
    if (text && text.length > 30 && isReduceText) {
      text = text.slice(0, 30);
      return (
        <TouchableOpacity onPress={() => setIsReduceText(!isReduceText)}>
          <MonoText
            style={{
              color: Colors[colorScheme].text,
            }}
          >
            {text}...{" "}
            <MonoText
              style={{
                color: Colors[colorScheme].blurText,
              }}
            >
              more
            </MonoText>
          </MonoText>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => setIsReduceText(!isReduceText)}>
        <MonoText
          style={{
            color: Colors[colorScheme].text,
          }}
        >
          {text}
        </MonoText>
      </TouchableOpacity>
    );
  };
  const ref = React.useRef<TransitioningView | null>(null);
  const [isLikeImage, setIsLikeImage] = React.useState(false);
  const onPressLikeImage = (isFromChild?: any) => {
    const nextStateIsLikeImage = !isLikeImage;
    setIsDisplayLikeHeart(true);
    setTimeout(() => {
      setIsDisplayLikeHeart(false);
    }, 700);
    if (!nextStateIsLikeImage && !isFromChild) return;
    if (nextStateIsLikeImage && !postItem.likedUsers.includes(user.userId)) {
      postItem.likedUsers.push(user.userId);
    } else if (
      !nextStateIsLikeImage &&
      postItem.likedUsers.includes(user.userId)
    ) {
      postItem.likedUsers.splice(
        postItem.likedUsers.findIndex((i) => i == user.userId)
      );
    }
    setIsLikeImage(!isLikeImage);
  };

  // const onPressLikeImage = () => {
  //   toggleLikeImage();
  // };

  const transition = (
    <Transition.Together>
      <Transition.Out type="scale" durationMs={100} />
      <Transition.Change interpolation="easeInOut" />
      <Transition.In type="scale" durationMs={100} delayMs={50} />
    </Transition.Together>
  );

  const buildImageSlider = () => {
    const rows: JSX.Element[] = [];
    for (const imageUrl of postItem.listImageUrl) {
      rows.push(
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 1 : 1,
          })}
          onPress={onDoublePress}
          key={imageUrl}
        >
          {!isDisplayLikeHeart ? (
            <View></View>
          ) : (
            <Pressable
              // onPress={onPressLikeImage}

              style={({ pressed }) => ({
                opacity: pressed ? 1.2 : 1,
                position: "absolute",
                zIndex: isDisplayLikeHeart ? 1000 : 0,
                alignItems: "center",
                justifyContent: "center",
                width: screenWidth,
                height: contentHeight * 0.85,
              })}
            >
              <MaterialCommunityIcons
                name="heart"
                size={80}
                style={{
                  shadowColor: "#000",
                }}
                color={isLikeImage ? Colors.icon.color : "white"}
              />
            </Pressable>
          )}

          <Image
            style={{
              width: screenWidth,
              height: contentHeight,
              resizeMode: "cover",
              opacity:
                isDisplayLikeHeart || !isReduceText
                  ? !isReduceText
                    ? 0.5
                    : 0.95
                  : 1,
            }}
            source={{
              uri: imageUrl,
            }}
          />
        </Pressable>
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
          paddingHorizontal: 0,
          position: "absolute",
          bottom: isReduceText ? 10 : 45,
          left: 8,
          backgroundColor: "transparent",
        }}
      >
        <MonoText
          adjustsFontSizeToFit={true}
          ellipsizeMode="tail"
          style={{
            paddingHorizontal: 0,
            color: Colors[colorScheme].text,
            fontSize: fontSizes.h5,
          }}
        >
          {reduceText}
        </MonoText>
      </View>
    );
  };

  const handleOnMomentumScrollEnd = (e: any, state: any, context: any) => {
    // console.log(state.index, context.state.index, activeIndex);
    postItem.selectedIndexImage = context.state.index;
  };

  const headerHeight = 70;
  const contentHeight = 560;
  const paddingImage = 40;
  const [lastPressTime, setLastPressTime] = useState(new Date().getTime());
  const [footerHeight, setFooterHeight] = useState(0);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setFooterHeight(height - headerHeight - contentHeight);
  };

  const onDoublePress = (date) => {
    const time = new Date().getTime();
    const delta = time - lastPressTime;

    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      // Success double press
      onPressLikeImage();
    } else {
      if (!isReduceText) {
        setIsReduceText(true);
      }
    }
    setLastPressTime(time);
  };

  return (
    <View
      onLayout={onLayout}
      style={{
        ...styles.item,
        height: "100%",
      }}
    >
      <ImageBackground
        style={{
          width: screenWidth,
          height: "100%",
          zIndex: -10,
          opacity: 0.35,
          position: "absolute",
          top: 0,
        }}
        blurRadius={35}
        source={{
          uri: postItem.listImageUrl[0],
        }}
      />
      <View style={{ height: headerHeight, backgroundColor: "transparent" }}>
        <PostAvatar postItem={postItem} />
      </View>

      <View
        style={{
          width: screenWidth,
          height: contentHeight,
          paddingVertical: paddingImage,
        }}
      >
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

      <View style={{ height: footerHeight }}>
        <PostBottom postItem={postItem} onPressLikeImage={onPressLikeImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    padding: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
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

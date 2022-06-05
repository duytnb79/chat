import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import { RootTabScreenProps } from "../../types";
import Post from "../../components/home/Post";
import { Dimensions } from "react-native";
import moment from "moment-timezone";
import { IPost } from "../../services/PostService";
import { screenHeight } from "../../utilies/Device";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const screenWidth = Dimensions.get("window").width;
  const [postItems, setPostItems] = useState([
    {
      uid: 3,
      text: "Post 3",
      avatarUrl: "https://randomuser.me/api/portraits/men/40.jpg",
      listImageUrl: [
        "https://picsum.photos/seed/410/400/500",
        "https://picsum.photos/seed/440/400/500",
        "https://picsum.photos/seed/420/400/500",
        "https://picsum.photos/seed/430/400/500",
        "https://picsum.photos/seed/460/400/500",
        "https://picsum.photos/seed/470/400/500",
      ],
      userName: "Idys.ci",
      content:
        "Hello các bạn, mình là Trình. Mình là một front-end developer đã có gần 4 năm kinh nghiệm trong ngành. Dạo gần đây mình thấy có khá nhiều bạn cần người support trong việc học front-end nên mình đăng bài viết này với hy vọng sẽ kết nạp được một bạn như thế.\n Có vấn đề gì không hiểu bạn có thể hỏi mình, mình sẽ truyền đạt lại theo ý hiểu của bản thân. \n Những công nghệ mình có thể support: HTML, CSS, JavaScript, TypeScript, Phaser, ReactJS. \n Mình nhận support với mục đích phi lợi nhuận, bạn nào muốn có thể inbox mình để trao đổi nhé.\nUpdate:\n- Các bạn cứ inbox, mình sẽ check nhé. Gửi lời mời kết bạn nhiều quá mình không thể accept hết được.\n- Hiện đã có rất nhiều bạn inbox cho mình, mình sẽ check và reply.\n- Mình sẽ dừng việc tiếp nhận thêm nên cho mình xin phép đóng comment nhé. Rất cảm ơn sự quan tâm của mọi người.\n",
      selectedIndexImage: 0,
      createdDate: moment().subtract(34, "m").toISOString(),
      likedUsers: [],
    },
    {
      uid: 1,
      text: "Post 1",
      avatarUrl: "https://randomuser.me/api/portraits/men/30.jpg",
      listImageUrl: [
        "https://picsum.photos/seed/210/400/500",
        "https://picsum.photos/seed/220/400/500",
      ],
      userName: "prsa_dsa",
      content:
        "Thực ra lý do chính xác là: “chả có lý do gì cả, t thích đuổi vậy thoi” 🙂",
      selectedIndexImage: 0,
      createdDate: moment().subtract(1, "m").toISOString(),
      likedUsers: [],
    },
    {
      uid: 2,
      text: "Post 2",
      avatarUrl: "https://randomuser.me/api/portraits/men/70.jpg",
      listImageUrl: [
        "https://picsum.photos/seed/300/400/500",
        "https://picsum.photos/seed/310/400/500",
        "https://picsum.photos/seed/320/400/500",
      ],
      userName: "Odxan",
      content:
        'Shark Bình: "Ban ngày đi làm, tối về lướt Facebook là vật vờ, là kiếm sống chứ không phải kiếm tiền".',
      selectedIndexImage: 0,
      createdDate: moment().subtract(13, "m").toISOString(),
      likedUsers: [],
    },

    {
      uid: 4,
      text: "Post 3",
      avatarUrl: "https://randomuser.me/api/portraits/men/50.jpg",
      listImageUrl: ["https://picsum.photos/seed/650/400/500"],
      userName: "PQosfg_scj",
      content:
        "What I did today?\nThanks  MFest2022 - Content 4.0 for having me",
      selectedIndexImage: 0,
      createdDate: moment().subtract(1, "h").toISOString(),
      likedUsers: [],
    },
    {
      uid: 5,
      text: "Post 3",
      avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      listImageUrl: ["https://picsum.photos/seed/350/400/500"],
      userName: "Qeswmvi",
      content: "Có đầu tư =)))",
      selectedIndexImage: 0,
      createdDate: moment().subtract(3, "h").toISOString(),
      likedUsers: [],
    },
    {
      uid: 6,
      text: "Post 3",
      avatarUrl: "https://randomuser.me/api/portraits/men/40.jpg",
      listImageUrl: [
        "https://picsum.photos/seed/410/400/500",
        "https://picsum.photos/seed/440/400/500",
        "https://picsum.photos/seed/420/400/500",
        "https://picsum.photos/seed/430/400/500",
        "https://picsum.photos/seed/460/400/500",
        "https://picsum.photos/seed/470/400/500",
      ],
      userName: "Idys.ci",
      content:
        "Hello các bạn, mình là Trình. Mình là một front-end developer đã có gần 4 năm kinh nghiệm trong ngành. Dạo gần đây mình thấy có khá nhiều bạn cần người support trong việc học front-end nên mình đăng bài viết này với hy vọng sẽ kết nạp được một bạn như thế.\n Có vấn đề gì không hiểu bạn có thể hỏi mình, mình sẽ truyền đạt lại theo ý hiểu của bản thân. \n Những công nghệ mình có thể support: HTML, CSS, JavaScript, TypeScript, Phaser, ReactJS. \n Mình nhận support với mục đích phi lợi nhuận, bạn nào muốn có thể inbox mình để trao đổi nhé.\nUpdate:\n- Các bạn cứ inbox, mình sẽ check nhé. Gửi lời mời kết bạn nhiều quá mình không thể accept hết được.\n- Hiện đã có rất nhiều bạn inbox cho mình, mình sẽ check và reply.\n- Mình sẽ dừng việc tiếp nhận thêm nên cho mình xin phép đóng comment nhé. Rất cảm ơn sự quan tâm của mọi người.\n",
      selectedIndexImage: 0,
      createdDate: moment().subtract(34, "m").toISOString(),
      likedUsers: [],
    },
    {
      uid: 7,
      text: "Post 1",
      avatarUrl: "https://randomuser.me/api/portraits/men/30.jpg",
      listImageUrl: [
        "https://picsum.photos/seed/210/400/500",
        "https://picsum.photos/seed/220/400/500",
      ],
      userName: "prsa_dsa",
      content:
        "Thực ra lý do chính xác là: “chả có lý do gì cả, t thích đuổi vậy thoi” 🙂",
      selectedIndexImage: 0,
      createdDate: moment().subtract(1, "m").toISOString(),
      likedUsers: [],
    },
    {
      uid: 8,
      text: "Post 2",
      avatarUrl: "https://randomuser.me/api/portraits/men/70.jpg",
      listImageUrl: [
        "https://picsum.photos/seed/300/400/500",
        "https://picsum.photos/seed/310/400/500",
        "https://picsum.photos/seed/320/400/500",
      ],
      userName: "Odxan",
      content:
        'Shark Bình: "Ban ngày đi làm, tối về lướt Facebook là vật vờ, là kiếm sống chứ không phải kiếm tiền".',
      selectedIndexImage: 0,
      createdDate: moment().subtract(13, "m").toISOString(),
      likedUsers: [],
    },

    {
      uid: 9,
      text: "Post 3",
      avatarUrl: "https://randomuser.me/api/portraits/men/50.jpg",
      listImageUrl: ["https://picsum.photos/seed/650/400/500"],
      userName: "PQosfg_scj",
      content:
        "What I did today?\nThanks  MFest2022 - Content 4.0 for having me",
      selectedIndexImage: 0,
      createdDate: moment().subtract(1, "h").toISOString(),
      likedUsers: [],
    },
    {
      uid: 10,
      text: "Post 3",
      avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      listImageUrl: ["https://picsum.photos/seed/350/400/500"],
      userName: "Qeswmvi",
      content: "Có đầu tư =)))",
      selectedIndexImage: 0,
      createdDate: moment().subtract(3, "h").toISOString(),
      likedUsers: [],
    },
  ]);
  useEffect(() => {
    // AuthService.logout(navigation);
  });

  const buildPostItems = (): JSX.Element[] => {
    const rows = [] as JSX.Element[];

    for (const postItem of postItems) {
      rows.push(<Post postItem={postItem} key={postItem.uid} />);
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      {/* <MonoText style={styles.title}>HomeScreen</MonoText>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
      <Swiper
        loop={false}
        horizontal={false}
        showsButtons={false}
        showsPagination={false}
        contentContainerStyle={{
          width: screenWidth,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {buildPostItems()}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../types";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  // navigation.replace("Auth");
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>This screen doesn't exist.</MonoText>
      <TouchableOpacity
        onPress={() => navigation.replace("Auth")}
        style={styles.link}
      >
        <MonoText style={styles.linkText}>Go to home screen!</MonoText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

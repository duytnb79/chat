import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { useState } from "react";
import { RootTabScreenProps } from "../../types";

export default function LoveScreen({
  navigation,
}: RootTabScreenProps<"LoveScreen">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoveScreen</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

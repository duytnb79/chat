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
import AuthService from "../../services/AuthService";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"ProfileScreen">) {
  const handleLogout = () => {
    AuthService.logout(navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    height: "30%",
    display: "flex",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

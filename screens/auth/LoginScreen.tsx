import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  View,
} from "react-native";

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
} from "../../firebase";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../../services/AuthService";
// import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import UserService, { IUser } from "../../services/UserService";
// import { images, colorsConstant, icons, fontSizes } from "../../constants";
// import { isValidEmail, isValidPassword } from "../../utilies/Validations";

export default function LoginScreen({
  navigation,
}: RootTabScreenProps<"LoginScreen">) {
  const [email, setEmail] = useState("duytnb2608@gmail.com");
  const [password, setPassword] = useState("Abc12345");

  useEffect(() => {
    AuthService.onAuthStateChanged(navigation);
  }, []);

  const handleLogin = async () => {
    await AuthService.login({
      auth: auth,
      email: email,
      password: password,
    });
    const user = await AuthService.login({
      auth: auth,
      email: email,
      password: password,
    });

    //save user to local storage
    AsyncStorage.setItem("user", JSON.stringify(user));
    navigation.replace("Root");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
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
    height: "50%",
    display: "flex",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});

import { Auth, User, getIdToken, signOut } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
} from "../firebase";
import { IUser } from "./UserService";

export default class AuthService {
  static getIdToken({ user }: { user: User }) {
    return getIdToken(user);
  }

  static async onAuthStateChanged(navigation: any) {
    auth.onAuthStateChanged(async (responseUser) => {
      if (responseUser) {
        const user = {
          userId: responseUser.uid,
          email: responseUser.email,
          emailVerified: responseUser.emailVerified,
          accessToken: responseUser.getIdToken(),
        } as IUser;
        AsyncStorage.setItem("user", JSON.stringify(user));
        navigation.replace("Root");
      }
    });
  }

  static async logout(navigation?: any) {
    const userStr: string | null = await AsyncStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr) as IUser;
      AsyncStorage.removeItem("user");
      await signOut(auth);
      console.log("Logout", user.email);
    }
    if (navigation) navigation.replace("Auth");
  }

  static async register({
    auth,
    email,
    password,
    isSendEmailVerify = false,
  }: {
    auth: Auth;
    email: string;
    password: string;
    isSendEmailVerify: boolean;
  }): Promise<IUser | void> {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const responseUser = userCredentials.user as User;
        console.log("Registered with:", responseUser.email);
        if (isSendEmailVerify) {
          sendEmailVerification(userCredentials.user);
        }
        return {
          userId: responseUser.uid,
          email: responseUser.email,
          emailVerified: responseUser.emailVerified,
          accessToken: responseUser.getIdToken(),
        } as IUser;
      })
      .catch((error) => alert(error.message));
  }

  static async login({
    auth,
    email,
    password,
  }: {
    auth: Auth;
    email: string;
    password: string;
  }): Promise<IUser> {
    return await signInWithEmailAndPassword(auth, email, password).then(
      async (userCredentials) => {
        const responseUser = userCredentials.user;
        console.log("Logged in with:", responseUser.email);
        return {
          userId: responseUser.uid,
          email: responseUser.email,
          emailVerified: responseUser.emailVerified,
          accessToken: responseUser.getIdToken(),
        } as IUser;
      }
    );
  }
}

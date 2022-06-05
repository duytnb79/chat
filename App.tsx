import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Colors from "./constants/Colors";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const buildApp = () => {
    if (Platform.OS === "ios") {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <SafeAreaProvider
            style={
              {
                // backgroundColor: "pink",
                //Colors[colorScheme].backgroundAbs
              }
            }
          >
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return buildApp();
  }
}

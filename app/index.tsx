import "react-native-reanimated";
import { useCallback, useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import React from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { fetchAndSetUserData } from "@/Utils/configs/redux/reducers/userSlice";
SplashScreen.preventAutoHideAsync();
function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [secondSplash, setSecondSplash] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const checkUser = async () => {
    const userId: any = await AsyncStorage.getItem("uid");
    try {
      if (userId) {
        await dispatch(fetchAndSetUserData(userId));
        setSecondSplash(false);
        router.push("/MainPage");
      } else {
        router.push("/AuthenticationInterface");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // UseEffect to Handle Splash Screen
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      setSecondSplash(true);
      await SplashScreen.hideAsync();
      checkUser();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <SafeAreaView>
        {secondSplash && (
          <Image
            source={require("../assets/images/splash(2).png")}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </SafeAreaView>
    </>
  );
}

export default App;

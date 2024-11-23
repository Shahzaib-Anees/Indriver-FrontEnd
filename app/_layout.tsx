import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../Utils/configs/redux/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              statusBarBackgroundColor: "#272C34",
              contentStyle: { backgroundColor: "#272C34" },
            }}
          />
          <Stack.Screen
            name="AuthenticationInterface"
            options={{
              headerShown: false,
              statusBarBackgroundColor: "#272C34",
              contentStyle: { backgroundColor: "#272C34" },
            }}
          />
          <Stack.Screen
            name="Login"
            options={{
              headerShown: false,
              statusBarBackgroundColor: "#272C34",
              contentStyle: { backgroundColor: "#272C34" },
            }}
          />
          <Stack.Screen
            name="Register"
            options={{
              headerStyle: {
                backgroundColor: "#272C34",
              },
              headerTintColor: "#fff",
              statusBarBackgroundColor: "#272C34",
              contentStyle: { backgroundColor: "#272C34" },
            }}
          />
          <Stack.Screen
            name="MainPage"
            options={{
              headerShown: false,
              statusBarBackgroundColor: "#272C34",
              contentStyle: { backgroundColor: "#272C34" },
            }}
          />
          <Stack.Screen
            name="SingleUser/[id]"
            options={{
              headerStyle: {
                backgroundColor: "#272C34",
              },
              headerTintColor: "#fff",
              headerTitle: "Profile Settings",
              statusBarBackgroundColor: "#272C34",
              contentStyle: { backgroundColor: "#272C34" },
            }}
          />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;

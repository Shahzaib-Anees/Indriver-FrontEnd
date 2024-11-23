import { Drawer } from "expo-router/drawer";
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import CustomDrawer from "../../components/customComponents/CustomDrawer/CustomDrawer";

export default function Layout() {
  return (
    <Drawer
      drawerContent={(prop: any) => <CustomDrawer {...prop} />}
      initialRouteName="index"
      screenOptions={{
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 18,
          fontWeight: 800,
          fontFamily: "",
          color: "#fbfbfb",
        },
        drawerActiveTintColor: "#f0f5f1",
        drawerStyle: {
          backgroundColor: "#272C34",
          paddingVertical: 0,
        },
        drawerContentStyle: {
          backgroundColor: "#1F2832",
        },
        drawerItemStyle: {
          borderRadius: 0,
          width: "100%",
          marginLeft: 0,
          paddingHorizontal: 6,
          paddingVertical: 5,
        },
        drawerLabel: "City",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerShown: false,
          drawerLabel: "City",
          sceneStyle: {
            backgroundColor: "#272C34",
          },
          drawerIcon: () => (
            <FontAwesome5 name="car-side" size={20} color="#a2a2a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        options={{
          drawerLabel: "Request History",
          sceneStyle: {
            backgroundColor: "#272C34",
          },
          drawerIcon: () => (
            <AntDesign name="clockcircle" size={20} color="#a2a2a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="Couriers"
        options={{
          drawerLabel: "Couriers",
          sceneStyle: {
            backgroundColor: "#272C34",
          },
          drawerIcon: () => (
            <FontAwesome5 name="box" size={19} color="#a2a2a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="TravelCity"
        options={{
          drawerLabel: "City to City",
          sceneStyle: {
            backgroundColor: "#272C34",
          },
          drawerIcon: () => (
            <FontAwesome5 name="globe" size={21} color="#a2a2a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="Freight"
        options={{
          drawerLabel: "Freight",
          sceneStyle: {
            backgroundColor: "#272C34",
          },
          drawerIcon: () => (
            <FontAwesome5 name="truck" size={20} color="#a2a2a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="Safety"
        options={{
          drawerLabel: "Safety",
          sceneStyle: {
            backgroundColor: "#272C34",
          },
          drawerIcon: () => (
            <MaterialIcons name="security" size={25} color="#a2a2a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          drawerLabel: "Settings",
          sceneStyle: {
            backgroundColor: "#272C34",
          },
          drawerIcon: () => (
            <Ionicons name="settings" size={22} color="#a2a2a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        options={{
          drawerLabel: "Help",
          sceneStyle: {
            backgroundColor: "#272C34",
          },
          drawerIcon: () => (
            <Ionicons name="information-circle" size={25} color="#a2a2a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="Support"
        options={{
          drawerLabel: "Support",
          sceneStyle: {
            backgroundColor: "#272C34",
          },
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="message-processing"
              size={21}
              color="#a2a2a3"
            />
          ),
        }}
      />
    </Drawer>
  );
}

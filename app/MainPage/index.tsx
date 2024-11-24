import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import MapViewStyle from "@/Utils/MapViewStyle/MapViewStyle.json";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import polyline from "@mapbox/polyline";
interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const vehicleTypes = [
  {
    type: "moto",
    name: "Moto",
    pricePerKm: 20,
    icon: require("@/assets/images/moto.png"),
    punchLine:
      "Easy fast and convenient rides around the city . Avoid traffic jams or looking for parking spots. Door-to-Door moto service at your own price ",
  },
  {
    type: "carAc",
    name: "Ride AC",
    pricePerKm: 80,
    icon: require("@/assets/images/carAc.png"),
    select: false,
    punchLine:
      "Comfortable rides with AC and music. Enjoy a smooth and comfortable ride with our AC car service.",
  },
  {
    type: "car",
    name: "Ride Mini",
    pricePerKm: 50,
    icon: require("@/assets/images/car.png"),
    select: false,
    punchLine: "Easy fast and convenient rides around the city without Ac. ",
  },
  {
    type: "rickshaw",
    name: "Rickshaw",
    pricePerKm: 50,
    icon: require("@/assets/images/rickshaw.png"),
    select: false,
    punchLine:
      "Easy fast and convenient way to rides around the city. Door-to-Door pool autorickshaw service at your own fare",
  },
];

interface RouteCoordinate {
  latitude: number;
  longitude: number;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "fsq325LKiX2dcHzHN08tUTW9kIqzIrOUoVNSntokNffuF2k=",
  },
};

const MainPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navgation = useNavigation();
  const [initialRegion, setInitialRegion] = useState<any | null>(null);
  const [userLocationInString, setUserLocationInString] = useState<any>(null);
  // Object of Specific Search
  const [userSearchedLocation, setUserSearchedLocation] = useState<any>(null);
  const [userSearchedString, setUserSearchedString] = useState<string>("");
  const [ifRideRequested, setIfRideRequested] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | false>(false);
  const [toggledRideInfo, setToggledRideInfo] = useState<boolean>(false);
  const [initialBottmToggler, setInitialBottmToggler] = useState<boolean>(true);
  const [currentVehicle, setCurrentVehicle] = useState<any>({});
  const [togglePlaceSearch, setTogglePlaceSearch] = useState<boolean>(false);
  const [searchedLocationName, setSearchedLocationName] =
    useState<string>("To");
  const [searchApiResponse, setSearchApiResponse] = useState<any>([]);
  const [polylinePoints, setPolylinePoints] = useState<RouteCoordinate[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const locationResponse: any = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: locationResponse?.coords?.latitude,
        longitude: locationResponse?.coords?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  useEffect(() => {
    console.log(initialRegion);
  }, [initialRegion]);

  // Search for Place Search String
  const searchForLocation = () => {
    if (userSearchedString.includes(" ")) {
      const splitted = userSearchedString.split(" ");
      const newString = splitted.join("-");
      setUserSearchedString(newString);
    }
    // Place Search
    const response: any = fetch(
      `https://api.foursquare.com/v3/places/search?query=${userSearchedString}&radius=20000`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchApiResponse([...res?.results]);
      })
      .catch((err) => console.error(err));
  };

  // Get Specific Search Location Details
  const getSpecificSearchLocationDetals = (
    locationName: string,
    fsq_id: string
  ) => {
    const response = fetch(
      `https://api.foursquare.com/v3/places/${fsq_id}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserSearchedLocation({
          latitude: res?.geocodes?.main?.latitude,
          longitude: res?.geocodes?.main?.longitude,
        });
      })
      .catch((err) => console.error(err));
    setTogglePlaceSearch(false);
    setSearchedLocationName(locationName);
  };

  // Get Route Drirection
  const getRouteDirection = async () => {
    if (!initialRegion || !userSearchedLocation) return;
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/directions/json?origin=${initialRegion?.latitude},${initialRegion?.longitude}&destination=${userSearchedLocation?.latitude},${userSearchedLocation?.longitude}&key=AlzaSypv_sLJk6Vf2fwVZvBhm3dX4exa3UmHYsa`
      );
      const data: any = await response.json();
      const encodedPolyline = data?.routes[0]?.overview_polyline?.points;
      if (encodedPolyline) {
        const coordinates = polyline.decode(encodedPolyline);
        const points: RouteCoordinate[] = coordinates.map(
          ([lat, lng]: any) => ({
            latitude: lat,
            longitude: lng,
          })
        );
        setPolylinePoints(points);
        console.log(polylinePoints);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      {/* Header  */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 6,
        position: "absolute",
        zIndex: 100,
        width: "100%",
      }}>
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={() => {
            navgation.dispatch(DrawerActions.openDrawer());
          }}
        >
          <FontAwesome name="bars" size={21} color="#f0f5f1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerButton}>
          <FontAwesome5 name="share" size={21} color="#f0f5f1" />
        </TouchableOpacity>
      </View>
      {initialRegion ? (
        <View>
          <MapView
            style={styles.map}
            showsCompass={false}
            initialRegion={{
              latitude: initialRegion?.latitude,
              longitude: initialRegion?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
            customMapStyle={MapViewStyle}
          >
            <Marker
              coordinate={{
                latitude: initialRegion?.latitude,
                longitude: initialRegion?.longitude,
              }}
            >
              <Entypo name="location-pin" size={50} color="red" />
            </Marker>
            {userSearchedLocation && (
              <Marker
                coordinate={{
                  latitude: userSearchedLocation?.latitude,
                  longitude: userSearchedLocation?.longitude,
                }}
              >
                <Ionicons name="pin-sharp" size={50} color="red" />
              </Marker>
            )}
            {Array.isArray(polylinePoints) && polylinePoints.length > 0 && (
              <Polyline
                coordinates={polylinePoints}
                strokeColor="blue"
                strokeWidth={5}
              />
            )}
          </MapView>
        </View>
      ) : null}
      {/* InitailBottomToggler  */}
      {initialBottmToggler && (
        <View
          style={{
            width: "100%",
            height: 330,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "#272C34",
            paddingVertical: 10,
            paddingHorizontal: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          {/* Flat List  */}
          <FlatList
            data={vehicleTypes}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 2,
              zIndex: 1,
            }}
            style={{
              width: "100%",
              flex: 1,
            }}
            renderItem={({ item }) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      item.select = true;
                      setSelectedVehicle(item.type);
                    }}
                    style={{
                      width: 130,
                      height: 80,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        selectedVehicle === item.type
                          ? "rgba(84, 142, 235 , 0.4)"
                          : "rgba(0,0,0,0.2)",
                      borderRadius: 10,
                      marginHorizontal: 5,
                    }}
                  >
                    <View>
                      <Image
                        source={item.icon}
                        style={{
                          width: 55,
                          height: 55,
                          resizeMode: "contain",
                        }}
                      />
                      <Text
                        style={{
                          color: "#f0f5f1",
                          fontSize: 14,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                    {/* Icon on Ride Vehicle box  */}
                    {selectedVehicle === item.type && (
                      <View
                        onTouchEnd={() => {
                          setToggledRideInfo(true);
                          setCurrentVehicle(item);
                        }}
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                        }}
                      >
                        <AntDesign
                          name="infocirlceo"
                          size={24}
                          color="#5d97f5"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </>
              );
            }}
          />
          {/* Input Fields  */}
          <View
            style={{
              width: "100%",
              flex: 2,
              paddingHorizontal: 10,
              gap: 10,
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                paddingHorizontal: 20,
                height: 48,
                backgroundColor: "rgba(rgba(255,255,255, 0.1)",
                borderRadius: 10,
              }}
            >
              <Entypo
                name="location"
                size={24}
                color="#fff"
                style={{
                  paddingRight: 10,
                  borderRightWidth: 1,
                  borderRightColor: "#fff",
                }}
              />
              <Text
                style={{
                  color: "#406fdb",
                  fontSize: 18,
                  fontWeight: 900,
                  textDecorationLine: "underline",
                }}
              >
                From your Location
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                paddingHorizontal: 20,
                height: 48,
                backgroundColor: "rgba(255,255,255, 0.1)",
                borderRadius: 10,
              }}
              onTouchEnd={() => setTogglePlaceSearch(true)}
            >
              <FontAwesome
                name="search"
                size={22}
                color="#fff"
                style={{
                  paddingRight: 10,
                  borderRightWidth: 1,
                  borderRightColor: "#fff",
                }}
              />
              <Text
                style={{
                  color: "#c6c5c4",
                  fontSize: 18,
                  fontWeight: 900,
                }}
              >
                {searchedLocationName}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                height: 48,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={getRouteDirection}
                style={{
                  flex: 0.5,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  paddingHorizontal: 20,
                  height: 48,
                  backgroundColor: "#b0f221",
                  borderRadius: 10,
                }}
              >
                <MaterialIcons name="directions" size={28} color="#101010" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  paddingHorizontal: 20,
                  height: 48,
                  backgroundColor: "#b0f221",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#101010",
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  Find a Driver
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ConditionAL Ride Info Toggle  */}
          {toggledRideInfo && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: "#272C34",
                padding: 10,
                borderRadius: 10,
                width: 375,
                height: 280,
                zIndex: 2,
              }}
            >
              <Image
                source={currentVehicle.icon}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
              />

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  paddingHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    color: "#f0f5f1",
                    fontSize: 22,
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  {" "}
                  {currentVehicle.name}
                </Text>
                <Text
                  style={{
                    color: "#f0f5f1",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  {currentVehicle.punchLine}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(0 , 0 , 0 , 0.2)",
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 10,
                    width: "96%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setToggledRideInfo(false);
                  }}
                >
                  <Text
                    style={{
                      color: "#f0f5f1",
                      fontSize: 18,
                      fontWeight: "bold",
                      paddingHorizontal: 10,
                    }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
      {/* Toggle Place Search  */}
      {togglePlaceSearch && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            flex: 1,
            backgroundColor: "#272C34",
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => setTogglePlaceSearch(false)}
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: 50,
                cursor: "pointer",
              }}
            >
              <Entypo name="cross" size={24} color="#c6c5c4" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 10,
              gap: 10,
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                paddingHorizontal: 20,
                height: 48,
                backgroundColor: "rgba(rgba(255,255,255, 0.1)",
                borderRadius: 10,
              }}
            >
              <Entypo
                name="location"
                size={24}
                color="#fff"
                style={{
                  paddingRight: 10,
                  borderRightWidth: 1,
                  borderRightColor: "#fff",
                }}
              />
              <Text
                style={{
                  color: "#406fdb",
                  fontSize: 20,
                  fontWeight: 900,
                  textDecorationLine: "underline",
                }}
              >
                From your Location
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                paddingHorizontal: 20,
                height: 48,
                backgroundColor: "rgba(255,255,255, 0.1)",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <FontAwesome
                name="search"
                size={22}
                color="#fff"
                style={{
                  paddingRight: 10,
                  borderRightWidth: 1,
                  borderRightColor: "#fff",
                }}
              />
              <TextInput
                onChangeText={setUserSearchedString}
                value={userSearchedString}
                placeholder="To"
                placeholderTextColor="#fff"
                style={{
                  width: "70%",
                  color: "#fff",
                  fontSize: 20,
                }}
              />
              <TouchableOpacity
                onPress={searchForLocation}
                style={{
                  width: 50,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#b0f221",
                  cursor: "pointer",
                }}
              >
                <Ionicons name="push-outline" size={30} color="#101010" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Flat List of Search Api Response  */}
          {searchApiResponse.length > 0 ? (
            <FlatList
              data={searchApiResponse}
              showsVerticalScrollIndicator={false}
              style={{
                marginTop: 18,
                paddingHorizontal: 5,
                gap: 10,
              }}
              renderItem={({ item }: any) => {
                return (
                  <TouchableOpacity
                    key={item?.fsq_id}
                    onPress={() =>
                      getSpecificSearchLocationDetals(
                        item?.location.formatted_address,
                        item?.fsq_id
                      )
                    }
                    style={{
                      width: "100%",
                      gap: 10,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#fff",
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <EvilIcons name="location" size={30} color="#c6c5c4" />
                      <View>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 900,
                          }}
                        >
                          {item?.name}
                        </Text>
                        <Text
                          style={{
                            color: "#c6c5c4",
                            fontSize: 16,
                            fontWeight: 900,
                            opacity: 0.8,
                          }}
                        >
                          {item?.location.formatted_address}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <Text>No Result Found</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawerButton: {
    width: 53,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
    cursor: "pointer",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MainPage;

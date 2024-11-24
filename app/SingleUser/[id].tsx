import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const SingleUser = () => {
  const { id } = useLocalSearchParams();
  return (
    <ScrollView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>SingleUser</Text>
      <Text>{id}</Text>
    </ScrollView>
  );
};

export default SingleUser;  

import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const SingleUser = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>SingleUser</Text>
      <Text>{id}</Text>
    </View>
  );
};

export default SingleUser;

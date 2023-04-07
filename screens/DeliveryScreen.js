import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React from "react";
  import { useNavigation } from "@react-navigation/native";
  import { useSelector } from "react-redux";
  import { selectRestaurant } from "../features/restaurantSlice";
  import * as Progress from "react-native-progress";
import { XMarkIcon } from "react-native-heroicons/solid";
import MapView, { MapMarker } from "react-native-maps";
  
  const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
  
    //console.log(restaurant.long);
  
    return (
      <View className="bg-[#00CCBB] flex-1">
        <SafeAreaView className="z-50">
          <View className="flex-row justify-between items-center pt-10 px-4">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <XMarkIcon color="white" size={30} />
            </TouchableOpacity>
            <Text className="font-light text-white text-lg">Order Help</Text>
          </View>
          <View className="bg-white mx-5 my-2 rounded-md p-4 z-50 shadow-md">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-base text-gray-400">
                  Estimated Arrival
                </Text>
                <Text className="text-3xl font-bold">45-55 Minutes</Text>
              </View>
              <Image
                source={{
                  uri: "https://links.papareact.com/fls",
                }}
                className="h-20 w-20"
              />
            </View>
            <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
            <Text className="mt-3 text-gray-500 text-xs">
              Your order at {restaurant.title} is being prepared
            </Text>
          </View>
        </SafeAreaView>
        <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <MapMarker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-2 h-28 px-4">
        <Image
          source={{
            uri: "https://pbs.twimg.com/media/EGIeHV4WoAA_qE6.jpg",
          }}
          className="h-12 w-12 bg-gray-300 "
        />
        <View className="flex-1">
          <Text className="text-lg">Ankit Yadav</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg ">Call</Text>
      </SafeAreaView>
      </View>
    );
  }

  export default DeliveryScreen
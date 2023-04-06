import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon
 } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient  from './sanity';

const Home = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]) 

  useLayoutEffect(() => {
    navigation.setOptions({
        //headerTitle: "testing"
        headerShown: false
    })
  })

  useEffect(() => {
    sanityClient.fetch(
      `
        *[_type == "featured"]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }
    `
    ).then((data) => {
      setFeaturedCategories(data)
    });
  }, []);
  //console.log(featuredCategories)

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2" >
        <Image
            className="h-7 w-7 bg-gray-500 p-4 rounded-full"
            source={{uri: "https://links.papareact.com/wru"}}
        />
        <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs" >Deliver Now</Text>
            <Text className="font-bold text-xl" >Current Location
              <ChevronDownIcon size={20} color="#00ccbb" />
            </Text>
        </View>
        <UserIcon size={35} color="#00ccbb"/>
      </View>

      {/* Search */}
      <View className="flex-row space-x-2 items-center pb-2 mx-4" >
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="#00ccbb"/>
          <TextInput 
            placeholder='Restaurants and cuisines'
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00ccbb"/>
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100
        }}
      >
        {/* Categories */}
        <Categories/>

        {/* Featured Rows */}

        {featuredCategories?.map((item)=>(
           <FeaturedRow 
           id={item._id}
           key={item._id}
           title={item.name} 
           description={item.short_description}
           />
        ))}

        {/* <FeaturedRow 
          id="1"
          title="Offers Near You!" 
          description="Paid placements from our partners"
          />
        <FeaturedRow 
          id="12"
          title="featured" 
          description="Paid placements from our partners"
          />
        <FeaturedRow 
          id="123"
          title="featured" 
          description="Paid placements from our partners"
          /> */}
      </ScrollView>

    </SafeAreaView>
  );
};

export default Home

// SearchIcon -> MagnifiyingGlassIcon
//  AdjustmentsIcon -> AdjustmentsVerticalIcon
// LocationIcon -> MapPinIcon




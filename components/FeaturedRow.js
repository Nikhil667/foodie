import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity'

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]) 

  useEffect(()=>{
    sanityClient.fetch(
      `
        *[_type == "featured" && _id  == $id]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type->{
              name
            }
          },
        }[0]
    `,
    { id }
    ).then((data) => {
      setRestaurants(data?.restaurants)
    });
  }, [id])

  //console.log(restaurants)

  return (
    <View>
      <View className="flex-row items-center justify-between px-4 mt-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00ccbb" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RestaurantCards */}

        {restaurants?.map((item)=>(
          <RestaurantCard
          key={item._id}
          id={item._id}
          imgUrl={item.image}
          title={item.name}
          rating={item.rating}
          genre={item.type?.name}
          address={item.address}
          short_description={item.short_description}
          dishes={item.dishes}
          long={item.long}
          lat={item.lat}
      />
        ))}
      </ScrollView>
    </View>
  );
}

export default FeaturedRow

const styles = StyleSheet.create({})
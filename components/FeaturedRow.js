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
        <Text className="font-bold text-lg">{title}sd</Text>
        <ArrowRightIcon color="#00ccbb" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}asd</Text>

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

        {/* <RestaurantCard
            id={1234}
            imgUrl="https://links.papareact.com/gn7"
            title="Yo Sushi!"
            rating={4.5}
            genre="Japanese"
            address="Sagar Pur"
            short_description="This is test description"
            dishes={[]}
            long={20}
            lat={0}
        />
        <RestaurantCard
            id={1234}
            imgUrl="https://links.papareact.com/gn7"
            title="Yo Sushi!"
            rating={4.5}
            genre="Japanese"
            address="Sagar Pur"
            short_description="This is test description"
            dishes={[]}
            long={20}
            lat={0}
        />
        <RestaurantCard
            id={1234}
            imgUrl="https://links.papareact.com/gn7"
            title="Yo Sushi!"
            rating={4.5}
            genre="Japanese"
            address="Sagar Pur"
            short_description="This is test description"
            dishes={[]}
            long={20}
            lat={0}
        /> */}
      </ScrollView>
    </View>
  );
}

export default FeaturedRow

const styles = StyleSheet.create({})
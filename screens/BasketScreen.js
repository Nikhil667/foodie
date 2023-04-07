import { View, Text, SafeAreaView, TouchableOpacity,ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity';
import { formatCurrency } from '../utilities/formatCurrency';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const totalBasket = useSelector(selectBasketTotal)
    const dispatch = useDispatch();
    const [groupedItemBasket, setGroupedItemBasket] = useState([])

    useEffect(() => {
      const groupedItems = items.reduce((results, item) => {
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      }, {});

      setGroupedItemBasket(groupedItems);
    }, [items])

    //console.log(groupedItemBasket)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon height={50} width={50} color="#00ccbb"/>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">  
          <Image
            source={{
              uri: "https://links.papareact.com/wru"
            }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 45-60 minutes</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemBasket).map(([key, item]) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#00ccbb]">{item.length} x</Text>
              <Image
                source={{
                  uri: urlFor(item[0]?.image).url()
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{item[0]?.name}</Text>
              <Text className="text-gray-600">{ formatCurrency(item[0]?.price) }</Text>
              <TouchableOpacity>
                <Text 
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                  className="text-[#00ccbb] text-xs"
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className='flex-row justify-between'>
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">{ formatCurrency(totalBasket) }</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">{ formatCurrency(30) }</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Order Total</Text>
            <Text className="font-extrabold">{ formatCurrency(totalBasket + 30) }</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate("PreparingScreen")}
            className="rounded-lg bg-[#00ccbb] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen
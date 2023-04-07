import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import {formatCurrency} from '../utilities/formatCurrency'

const BasketIcon = () => {

    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity 
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#00ccbb] p-4 rounded-lg flex-row items-center space-x-1">
        <Text className="text-lg font-extrabold text-white bg-[#01a296] py-1 px-2">{items.length}</Text>
        <Text className="flex-1 text-lg text-white font-extrabold text-center">View Basket</Text>
        <Text className="text-lg text-white font-extrabold">{formatCurrency(basketTotal)}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon

const styles = StyleSheet.create({})
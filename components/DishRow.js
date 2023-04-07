import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { formatCurrency } from '../utilities/formatCurrency';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';

const DishRow = ({ id, name, description, price, image }) => {

    const [isPressed, setIsPressed] = useState(false);

  return (
    <>
    <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className={`bg-white border border-gray-200 p-4 ${ isPressed && "border-b-0" }`}>
      <View className="flex-row">
        <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">{formatCurrency(price)}</Text>
        </View>
        <View>
            <Image
                style={{
                    borderColor: "#f3f3f4",
                    borderWidth: 1
                }}
                source={{ uri: urlFor(image).url() }}
                className="w-20 h-20 bg-gray-300 p-4 rounded"
            />
        </View>
      </View>
    </TouchableOpacity>
    
    {isPressed && (
        <View className="bg-white px-4">
            <View className="flex-row items-center space-x-2 py-3 ">
                <TouchableOpacity>
                    <MinusCircleIcon size={40} color="#00ccbb"/>
                </TouchableOpacity>
                <Text>0</Text>
                <TouchableOpacity>
                    <PlusCircleIcon size={40} color="#00ccbb"/>
                </TouchableOpacity>
            </View>
        </View>
    )}
    </>
  );
};

export default DishRow

const styles = StyleSheet.create({})
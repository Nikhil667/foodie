import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { formatCurrency } from '../utilities/formatCurrency';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemWithId, selectBasketItems } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {

    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemWithId(state, id));
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}))
    }
    const removeItemFromBasket = () => {
        if(!items.length > 0) return;
        dispatch(removeFromBasket({ id }));
    }

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
                <TouchableOpacity 
                    disabled={!items.length}
                    onPress={removeItemFromBasket
                }>
                    <MinusCircleIcon size={40} color={ items.length > 0 ? "#00ccbb" : "gray"}
                    />
                </TouchableOpacity>
                <Text>{items.length} </Text>
                <TouchableOpacity onPress={addItemToBasket}>
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
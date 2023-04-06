import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../screens/sanity';

const Categories = () => {

  const [categories, setCategories] = useState([])

  useEffect(()=>{
    sanityClient.fetch(
      `
        *[_type == "category"]
      `
    ).then((data) => {
      setCategories(data)
    });
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    > 

      {categories.map((item)=>(
         <CategoryCard 
         key={item._id}
         imgUrl={urlFor(item.image).url()}
         title={item.name}/>
      ))}
      {/* <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing"/> */}
    </ScrollView>
  )
}

export default Categories

const styles = StyleSheet.create({})
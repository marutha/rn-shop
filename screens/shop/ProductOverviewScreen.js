import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { useSelector, useStore } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts)
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {}}
            onAddToCart={() => {}}
          />
        )}
      />
    </View>
  )
}

ProductOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default ProductOverviewScreen

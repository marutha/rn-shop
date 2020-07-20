import React from 'react'
import { ScrollView, View, Text, StyleSheet, Image, Button } from 'react-native'
import { useSelector } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'
import { color } from 'react-native-reanimated'
import Colors from '../../constants/Colors'

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam('productId')
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  )
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to cart" />
      </View>
      <Text style={styles.price}>{selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

ProductDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam('productTitle')
  return {
    headerTitle: title,
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#ccc',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
})

export default ProductDetailScreen

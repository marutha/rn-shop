import React from 'react'
import { View, StyleSheet, FlatList, Button, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as cartAction from '../../store/actions/cart'
import { Header } from 'react-native/Libraries/NewAppScreen'
import Colors from '../../constants/Colors'

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts)
  const dispatch = useDispatch()
  const selectItem = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    })
  }
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
            onSelect={() => {
              selectItem(itemData.item.id, itemData.item.title)
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                selectItem(itemData.item.id, itemData.item.title)
              }}
            />
            <Button
              color={Colors.primary}
              title="Add to cart"
              onPress={() => {
                dispatch(cartAction.addToCart(itemData.item))
              }}
            />
          </ProductItem>
        )}
      />
    </View>
  )
}

ProductOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default ProductOverviewScreen

import React from 'react'
import { View, Text, Button, FlatList, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'

import CartItem from '../../components/shop/CartItem'
import { removeFromCart } from '../../store/actions/cart'
import { addOrder } from '../../store/actions/order'

const CartScreen = (props) => {
  const dispatch = useDispatch()
  const total = useSelector((state) => state.cart.totalSum)
  const cartItems = useSelector((state) => {
    const transformedCartItems = []
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      })
    }
    return transformedCartItems
  })

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${total}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartItems, total))
          }}
        />
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(removeFromCart(itemData.item.productId))
              }}
            />
          )}
        />
      </View>
    </View>
  )
}

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
  amount: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    color: Colors.primary,
  },
})

export default CartScreen

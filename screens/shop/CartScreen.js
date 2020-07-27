import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'

import CartItem from '../../components/shop/CartItem'
import Card from '../../components/UI/Card'
import { removeFromCart } from '../../store/actions/cart'
import { addOrder } from '../../store/actions/order'

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
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

  const sendOrderHandler = async () => {
    setIsLoading(true)
    await dispatch(addOrder(cartItems, total))
    setIsLoading(false)
  }
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${total}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator color={Colors.primary} size="small" />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
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

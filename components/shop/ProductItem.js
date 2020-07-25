import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'

import Card from '../UI/Card'
import Colors from '../../constants/Colors'

const ProductItem = (props) => {
  let Touch = TouchableOpacity

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    Touch = TouchableNativeFeedback
  }
  console.log('props.price', props.price)
  return (
    <Touch onPress={props.onSelect}>
      <Card style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>{props.children}</View>
      </Card>
    </Touch>
  )
}

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    // marginVertical: 4,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 14,
    // marginVertical: 4,
    fontFamily: 'open-sans',
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
})

export default ProductItem

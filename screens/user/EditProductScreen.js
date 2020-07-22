import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import { createProduct, updateProduct } from '../../store/actions/products'

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam('productId')
  const editProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id == prodId)
  )
  const dispatch = useDispatch()

  const [title, setTitle] = useState(editProduct ? editProduct.title : '')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState(
    editProduct ? editProduct.description : ''
  )
  const [imageUrl, setImageUrl] = useState(
    editProduct ? editProduct.imageUrl : ''
  )

  const submitHandler = useCallback(() => {
    if (editProduct) {
      const act = updateProduct(prodId, title, description, imageUrl)
      dispatch(act)
    } else {
      const act1 = createProduct(title, description, imageUrl, price)
      dispatch(act1)
    }
  }, [dispatch, prodId, title, description, imageUrl, price])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    marginVertical: 2,
    marginHorizontal: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
})

export default EditProductScreen

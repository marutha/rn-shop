import React, { useEffect, useCallback, useReducer } from 'react'
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import Input from '../../components/UI/Input'
import { createProduct, updateProduct } from '../../store/actions/products'

const FORM_UPDATE = 'UPDATE'
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    }
  }
  return state
}

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam('productId')
  const editProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id == prodId)
  )
  const dispatch = useDispatch()
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : '',
      description: editProduct ? editProduct.description : '',
      imageUrl: editProduct ? editProduct.imageUrl : '',
      price: '',
    },
    inputValidities: {
      title: editProduct ? true : false,
      description: editProduct ? true : false,
      price: editProduct ? true : false,
      imageUrl: editProduct ? true : false,
    },
    formIsValid: editProduct ? true : false,
  })

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check errors in the form.')
      return
    }
    if (editProduct) {
      const act = updateProduct(
        prodId,
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl
      )
      dispatch(act)
    } else {
      const act1 = createProduct(
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl,
        formState.inputValues.price
      )
      dispatch(act1)
    }
    props.navigation.goBack()
  }, [dispatch, prodId, formState, inputChangeHandler])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      })
    },
    [dispatchFormState]
  )
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={editProduct ? editProduct.title : ''}
            initiallyValid={!!editProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid URL!"
            keyboardType="default"
            onInputChange={inputChangeHandler}
            initialValue={editProduct ? editProduct.imageUrl : ''}
            initiallyValid={!!editProduct}
            required
          />
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid Price!"
            keyboardType="decimal-pad"
            onInputChange={inputChangeHandler}
            initialValue={editProduct ? editProduct.price : ''}
            initiallyValid={!!editProduct}
            required
            min={0.1}
          />
          <Input
            id="description"
            label="Description"
            errorText="Please enter valid Description!"
            keyboardType="default"
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editProduct ? editProduct.description : ''}
            initiallyValid={!!editProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
})

export default EditProductScreen

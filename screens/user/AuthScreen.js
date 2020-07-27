import React, { useState, useReducer, useCallback, useEffect } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'

import { signup, login } from '../../store/actions/auth'

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

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  })
  const authHandler = async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (isSignUp) {
        await dispatch(
          signup(formState.inputValues.email, formState.inputValues.password)
        )
      } else {
        await dispatch(
          login(formState.inputValues.email, formState.inputValues.password)
        )
      }
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }])
    }
  }, [error])

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
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              initialValue=""
              onInputChange={inputChangeHandler}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              initialValue=""
              onInputChange={inputChangeHandler}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignUp ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignUp((prev) => !prev)
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
})

export default AuthScreen

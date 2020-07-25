import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'
import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import { authenticate } from '../store/actions/auth'

const StartupScreen = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if (!userData) {
        props.navigation.navigate('Auth')
        return
      }
      const { token, expiryDate, userId } = JSON.parse(userData)
      const expirationDate = new Date(expiryDate)
      if (!token || !userId || expirationDate <= new Date()) {
        props.navigation.navigate('Auth')
        return
      }
      props.navigation.navigate('Shop')
      const expirationTime = expirationDate.getTime() - new Date().getTime()
      dispatch(authenticate(userId, token, expirationTime))
    }
    tryLogin()
  }, [dispatch])
  return (
    <View style={styles.centered}>
      <ActivityIndicator color={Colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default StartupScreen

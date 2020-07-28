import { AsyncStorage } from 'react-native'
// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime))
    dispatch({
      type: AUTHENTICATE,
      userId,
      token,
    })
  }
}

export const logout = () => {
  clearStorage()
  clearLogoutTimer()
  return {
    type: LOGOUT,
  }
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDM86s-2Ma9RySUyGkx62EXyftniyywRdM',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    )
    if (!response.ok) {
      const errData = await response.json()
      let message = 'Something went wrong'
      if (errData.error.message === 'EMAIL_EXISTS') {
        message = 'This email already exists'
      }
      throw new Error(message)
    }

    if (!response.ok) {
      throw new Error('Something went wrong')
    }
    const respData = await response.json()
    dispatch(
      authenticate(
        respData.localId,
        respData.idToken,
        parseInt(respData.expiresIn) * 1000
      )
    )
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDM86s-2Ma9RySUyGkx62EXyftniyywRdM',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    )

    if (!response.ok) {
      const errData = await response.json()
      let message = 'Something went wrong'
      if (errData.error.message === 'EMAIL_NOT_FOUND') {
        message = 'Email address not found'
      }
      if (errData.error.message === 'INVALID_PASSWORD') {
        message = 'The password is invalid'
      }
      throw new Error(message)
    }
    const respData = await response.json()
    dispatch(
      authenticate(
        respData.localId,
        respData.idToken,
        parseInt(respData.expiresIn) * 1000
      )
    )
    const expirationDate = new Date(
      new Date().getTime() + parseInt(respData.expiresIn) * 1000
    )
    saveDataToStorage(respData.idToken, respData.localId, expirationDate)
  }
}

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate,
    })
  )
}

const clearStorage = () => {
  AsyncStorage.removeItem('userData')
}

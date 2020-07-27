export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

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
    dispatch({
      type: SIGNUP,
    })
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
    console.log(respData)
    dispatch({
      type: LOGIN,
    })
  }
}

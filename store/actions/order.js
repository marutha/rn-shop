import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://rn-shop-80e4e.firebaseio.com/orders/u1.json'
      )
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const resData = await response.json()
      console.log(resData)
      const loadedOrders = []
      for (const key in resData) {
        const prod = new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        )
        loadedOrders.push(prod)
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders })
    } catch (error) {
      throw error
    }
  }
}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date().toISOString()
    const response = await fetch(
      'https://rn-shop-80e4e.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date,
        }),
      }
    )
    if (!response.ok) {
      throw new Error('Something bad happened')
    }
    const resData = await response.json()
    dispatch({
      type: ADD_ORDER,
      orderData: {
        items: cartItems,
        amount: totalAmount,
        id: resData.name,
        date,
      },
    })
  }
}

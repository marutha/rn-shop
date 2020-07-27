export const ADD_ORDER = 'ADD_ORDER'

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

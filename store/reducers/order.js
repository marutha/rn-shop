import { ADD_ORDER, SET_ORDERS } from '../actions/order'
import Order from '../../models/order'

const initialState = {
  orders: [],
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      )
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      }
      break
    case SET_ORDERS:
      return {
        orders: action.orders,
      }
    default:
      break
  }
  return state
}

export default ordersReducer

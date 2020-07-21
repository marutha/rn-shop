import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import { ADD_ORDER } from '../actions/order'
import cartItem from '../../models/cart-item'

const initialState = {
  items: {},
  totalSum: 0,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const prod = action.product
      const prodId = prod.id
      const prodPrice = prod.price
      const prodTitle = prod.title
      let updatedProd

      if (state.items[prodId]) {
        updatedProd = new cartItem(
          state.items[prodId].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[prodId].sum + prodPrice
        )
      } else {
        updatedProd = new cartItem(1, prodPrice, prodTitle, prodPrice)
      }
      return {
        ...state,
        items: { ...state.items, [prodId]: updatedProd },
        totalSum: state.totalSum + prodPrice,
      }
      break
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid]
      const currentQty = selectedCartItem.quantity
      let updatedCartItems
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new cartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        )
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[action.pid]
      }
      return {
        ...state,
        items: updatedCartItems,
        totalSum: state.totalSum - selectedCartItem.productPrice,
      }
    case ADD_ORDER:
      return initialState
    default:
      break
  }
  return state
}
export default cartReducer

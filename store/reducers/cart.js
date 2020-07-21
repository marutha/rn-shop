import { ADD_TO_CART } from '../actions/cart'
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

    default:
      break
  }
  return state
}
export default cartReducer

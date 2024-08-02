import { Product } from '../interface/product'

export type CartItem = {
  product: Product
  quantity: number
  size: string
}

type State = {
  products: CartItem[]
  totalPrice: number
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; size: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'SET_CART'; payload: { products: CartItem[]; totalPrice: number } }
  | { type: 'CHECKOUT'; payload: { products: CartItem[]; totalPrice: number } }

const cartReducers = (state: State, action: CartAction) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        products: [
          ...state.products,
          {
            product: action.payload.product,
            quantity: action.payload.quantity,
            size: action.payload.size
          }
        ]
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        products: state.products.filter((item) => item.product._id !== action.payload.productId)
      }

    case 'SET_CART':
      return { ...state, products: action.payload.products, totalPrice: action.payload.totalPrice }
    case 'CHECKOUT':
      return {
        products: [],
        totalPrice: 0
      }
    default:
      return state
  }
}

export default cartReducers

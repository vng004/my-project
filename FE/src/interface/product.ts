import { Category } from './category'

export interface Product {
  _id?: string
  title: string
  thumbnail: string
  price: number
  description?: string
  category: Category
}

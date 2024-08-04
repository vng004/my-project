export interface User {
  _id?: number | string
  userName?: string
  email: string
  password: string
  role: 'admin' | 'member'
  thumbnail?: string
  createdAt: Date

}

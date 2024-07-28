export interface User {
  id?: number | string
  userName?: string
  email: string
  password: string
  role: 'admin' | 'member'
  image?: string
}

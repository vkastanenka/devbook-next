export interface Session {
  id: string
  userId: string
}

export interface User {
  id: string
  name: string
  email: string
  username: string
  image: string
  headline: string
  bio: string | null
}

export interface Customer {
  _id: string
  name: {
    full: string
  }
  address: {
    primary: any
    secondaries: any[]
  }
  connect: boolean
  verified: boolean
  userId: string
  alias: string
  email: string
  phone: string
}

export interface LoginPayload {
  customer: string
  token: string
  expiresIn: number
}


export type File = {
  name: string
  url: string
  position: number
}

export type Address = {
  country: string
  city: string
}

export type BaseUser = {
  name: string
  last_name: string
  second_last_name: string
  email: string
  phone: string
  address: Address
}

export type Language = {
  es: string
  en: string
  pt: string
}
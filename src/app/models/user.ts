import { Country } from './country'

export interface User {
  username: string,
  email: string,
  countries: Country[]
}
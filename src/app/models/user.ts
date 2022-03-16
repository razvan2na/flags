import { Country } from './country'

export interface User {
  fullName: string,
  email: string,
  countries: Country[]
}
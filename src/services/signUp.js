import axios from 'axios'

const baseUrl = 'http://localhost:3000/'

export const signUpService = async credentials => {
  const params = { user: credentials }
  await axios.post(`${baseUrl}signup`, params)
}

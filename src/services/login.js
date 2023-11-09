import axios from 'axios'

const baseUrl = 'http://localhost:3000/'

export const loginService = async credentials => {
  const params = { user: credentials }
  const { data } = await axios.post(`${baseUrl}login`, params)
  return data.token
}

export const logoutService = async (authToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  await axios.delete(`${baseUrl}logout`, config)
}

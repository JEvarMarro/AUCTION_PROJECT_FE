import axios from 'axios'
const API_URL = 'http://127.0.0.1:3000/'

export const searchCollection = async (authToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    const response = await fetch(`${API_URL}collection`, config)
    const json = await response.json()
    const collection = json.collection

    return collection?.map(collectionItem => ({
      id: collectionItem?.card.id,
      name: collectionItem?.card.name,
      number: collectionItem?.card.number,
      image_url: collectionItem?.card.image_url
    }))
  } catch (e) {
    throw new Error('')
  }
}

export const addToCollection = async (authToken, cardId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    await axios.post(`${API_URL}add_card/${cardId}`, {}, config)
  } catch (e) {
    throw new Error('')
  }
}

export const removeFromCollection = async (authToken, cardId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    await axios.delete(`${API_URL}remove_card/${cardId}`, config)
  } catch (e) {
    throw new Error('')
  }
}

export const addSet = async (authToken, setId) => {
  try {
    const params = {
      user: {
        serie_set_id: setId
      }
    }
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    await axios.post(`${API_URL}add_set`, params, config)
  } catch (e) {
    throw new Error('')
  }
}

export const removeSet = async (authToken, setId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params: {
        user: {
          serie_set_id: setId
        }
      }
    }
    await axios.delete(`${API_URL}remove_set`, config)
  } catch (e) {
    throw new Error('')
  }
}

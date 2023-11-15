import axios from 'axios'
import { userIdFromToken } from '../auth/auth'
const API_URL = 'http://127.0.0.1:3000/'

// function extractCards (series) {
//   const cardsArray = []

//   // Iterar sobre cada serie
//   series.forEach(serie => {
//     serie.serie_sets.forEach(set => {
//       set.cards.forEach(card => cardsArray.push(card))
//     })
//   })

//   return cardsArray
// }

export const searchCollection = async ({ userId }) => {
  try {
    const config = {
      params: {
        user: {
          user_id: userId
        }
      }
    }
    const { data } = await axios.get(`${API_URL}collection`, config)
    const collection = data.collection
    return collection?.map(serie => ({
      id: serie?.serie_id,
      name: serie?.serie_name,
      image_url: serie?.serie_image_url,
      sets: serie.serie_sets.map(set => ({
        id: set.serie_set_id,
        name: set.serie_set_name,
        image_url: set.serie_set_image_url,
        serie_id: set.serie_set_set_id,
        cards: set.cards.map(card => ({
          id: card.id,
          name: card.name,
          image_url: card.image_url,
          number: card.number,
          set_size: set.total_amount,
          rarity: card?.rarity?.name.replace(' ', '_').toLowerCase(),
          serie_id: serie.serie_id,
          set_id: set.serie_set_id
        }))
      }))
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
  const userId = userIdFromToken(authToken)
  try {
    const params = {
      user: {
        serie_set_id: setId,
        user_id: userId
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
  const userId = userIdFromToken(authToken)
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params: {
        user: {
          serie_set_id: setId,
          user_id: userId
        }
      }
    }
    await axios.delete(`${API_URL}remove_set`, config)
  } catch (e) {
    throw new Error('')
  }
}

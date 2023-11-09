
import { useState } from 'react'
import { searchCards } from '../services/cards'

export function useCards (serieId, setId) {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCards = async (authToken) => {
    try {
      setLoading(true)
      setError(null)
      const newSets = await searchCards(authToken, serieId, setId)
      setCards(newSets)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  return { cards, getCards, loading, error }
}

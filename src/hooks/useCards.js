
import { useState } from 'react'
import { searchCards } from '../services/cards'
import { useParams } from 'react-router-dom'

export function useCards () {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { serieId, setId } = useParams()

  const getCards = async (authToken) => {
    try {
      setLoading(true)
      setError(null)
      const newCards = await searchCards(authToken, serieId, setId)
      setCards(newCards)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  return { cards, getCards, loading, error }
}

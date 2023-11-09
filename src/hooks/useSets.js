
import { useState } from 'react'
import { searchSets } from '../services/sets'

export function useSets () {
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getSets = async (authToken, serieId) => {
    try {
      setLoading(true)
      setError(null)
      const newSets = await searchSets(authToken, serieId)
      setSets(newSets)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  return { sets, getSets, loading, error }
}

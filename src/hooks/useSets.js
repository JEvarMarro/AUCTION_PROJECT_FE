
import { useState } from 'react'
import { searchSets } from '../services/sets'
import { searchCollection } from '../services/collection'
import { useParams } from 'react-router-dom'

export function useSets () {
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { serieId, userId } = useParams()

  const getSets = async (authToken) => {
    try {
      setLoading(true)
      setError(null)
      const newSets = !userId
        ? await searchSets(authToken, serieId)
        : await getSetsFromCollection(userId, serieId)
      setSets(newSets)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  return { sets, getSets, loading, error }
}

const getSetsFromCollection = async (userId, serieId) => {
  const newCollection = await searchCollection({ userId })
  return newCollection.map(serie => serie.sets).flat().filter(set => set.serie_id === serieId)
}

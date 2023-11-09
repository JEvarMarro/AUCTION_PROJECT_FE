
import { useState } from 'react'
import { searchSeries } from '../services/series'

export function useSeries () {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getSeries = async (authToken) => {
    try {
      setLoading(true)
      setError(null)
      const newSeries = await searchSeries(authToken)
      setSeries(newSeries)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  return { series, getSeries, loading, error }
}


import { useEffect } from 'react'
import { useSeries } from '../../hooks/useSeries'
import { NoSeriesResult } from './NoSeriesResult'
import { ListOfSeries } from './ListOfSeries'
import { useAuth } from '../../hooks/useAuth'

export function Series () {
  const { series, getSeries, loading, error } = useSeries()
  const { authToken } = useAuth()
  const hasSeries = series?.length > 0

  useEffect(() => {
    getSeries(authToken)
  }, [])

  return (
    !loading && !error && hasSeries
      ? <ListOfSeries series={series} />
      : <NoSeriesResult />
  )
}

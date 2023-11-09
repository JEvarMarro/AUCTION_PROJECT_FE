
import { useEffect } from 'react'
import { useSets } from '../../hooks/useSets'
import { useParams } from 'react-router-dom'
import { NoSetsResult } from './NoSetsResult'
import { ListOfSets } from './ListOfSets'
import { useAuth } from '../../hooks/useAuth'

export function Sets () {
  const { serieId } = useParams()
  const { sets, getSets, loading, error } = useSets(serieId)
  const { authToken } = useAuth()
  const hasSets = sets?.length > 0

  useEffect(() => {
    getSets(authToken, serieId)
  }, [])

  return (
    !loading && !error && hasSets
      ? <ListOfSets sets={sets} />
      : <NoSetsResult />
  )
}

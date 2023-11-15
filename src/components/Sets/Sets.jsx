
import { useEffect } from 'react'
import { useSets } from '../../hooks/useSets'
import { NoSetsResult } from './NoSetsResult'
import { ListOfSets } from './ListOfSets'
import { useAuth } from '../../hooks/useAuth'

export function Sets () {
  const { sets, getSets, loading, error } = useSets()
  const { authToken } = useAuth()
  const hasSets = sets?.length > 0

  useEffect(() => {
    getSets(authToken)
  }, [])

  return (
    !loading && !error && hasSets
      ? <ListOfSets sets={sets} />
      : <NoSetsResult />
  )
}

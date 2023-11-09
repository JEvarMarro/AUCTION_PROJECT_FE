import { useEffect } from 'react'
import { useCards } from '../../hooks/useCards'
import { useParams } from 'react-router-dom'
import { ListOfCards } from './ListOfCards'
import { NoCardsResult } from './NoCardsResult'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../Loader'
import '../../font.css'

export function Cards () {
  const { serieId, setId } = useParams()
  const { cards, getCards, loading, error } = useCards(serieId, setId)
  const { authToken } = useAuth()
  const hasCards = cards?.length > 0

  useEffect(() => {
    getCards(authToken, serieId, setId)
  }, [])

  return (
    <>
      {loading && <Loader />}
      {!loading && !hasCards && <NoCardsResult />}
      {!loading && !error && hasCards &&
        <ListOfCards cards={cards} setId={setId} loading={loading} />}
    </>
  )
}

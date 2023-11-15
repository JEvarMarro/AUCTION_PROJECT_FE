import { useState, useEffect } from 'react'
import { Card } from './Card'
import { useCardCollection } from '../../hooks/useCardCollection'
import Loader from '../Loader'
import Dialog from '../Dialog'
import { useParams } from 'react-router-dom'
import '../../styles/ListOfCards.css'

export function ListOfCards ({ cards, setId, loading }) {
  const {
    getCollection,
    clearCardCollection,
    selectAll,
    loading: isLoadingCardCollection
  } = useCardCollection()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const { userId } = useParams()
  useEffect(() => {
    getCollection({ userId })
  }, [])
  // TODO: BUG loading is updating in multiple places
  if (isLoadingCardCollection) {
    return <Loader />
  }

  return (
    <div className='listOfCardsContainer'>
      {!userId &&
      (
        <div className='listOfCardsHeader'>
          <button onClick={() => clearCardCollection(setId)}>
            Limpiar todas
          </button>
          <button onClick={() => selectAll(setId)}>
            Agregar Todas
          </button>
        </div>
      )}
      <ul className='cards'>
        {!loading &&
          cards.map(card => (
            <Card key={card.id} card={card} setSelectedCard={setSelectedCard} setShowDialog={setShowDialog} />
          ))}
      </ul>
      <Dialog card={selectedCard} showDialog={showDialog} setShowDialog={setShowDialog} />
    </div>
  )
}

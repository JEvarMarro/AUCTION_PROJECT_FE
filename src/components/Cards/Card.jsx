import { useState, useEffect } from 'react'
import { useCardCollection } from '../../hooks/useCardCollection'
import { sanitizeRarityName } from '../../helpers/rarity'
import { useParams } from 'react-router-dom'
import '../../styles/Card.css'

export const Card = ({ card, setSelectedCard, setShowDialog }) => {
  const [isChecked, setIsChecked] = useState(false)
  const { toggleCardIntoCollection, cardsCollection, guessCardsCollection } = useCardCollection()
  const { userId } = useParams()

  useEffect(() => {
    if (!userId) {
      setIsChecked(cardsCollection.some(cardInCollection => cardInCollection.id === card.id))
    } else {
      setIsChecked(guessCardsCollection.some(cardInCollection => cardInCollection.id === card.id))
    }
  }, [cardsCollection, card.id])

  const handleClick = (event) => {
    switch (event.detail) {
      case 1: {
        if (!userId) {
          toggleCardIntoCollection({ cardId: card.id })
        }
        break
      }
      case 2: {
        setSelectedCard(card)
        setShowDialog(true)
        break
      }
      default: {
        break
      }
    }
  }

  return (
    (
      <li className={`card ${sanitizeRarityName(card.rarity)}`} key={card.id}>
        <div className='card-image-container'>
          <img
            onClick={handleClick}
            src={card.image_url} alt={card.number}
            className={isChecked ? '' : 'grey-card'}
          />
        </div>
      </li>
    )
  )
}

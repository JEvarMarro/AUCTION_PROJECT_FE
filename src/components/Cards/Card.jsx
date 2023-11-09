import { useState, useEffect } from 'react'
import { useCardCollection } from '../../hooks/useCardCollection'
import { sanitizeRarityName } from '../../helpers/rarity'
import '../../styles/Card.css'

export const Card = ({ card }) => {
  const [isChecked, setIsChecked] = useState(false)
  const { collection, toggleCardIntoCollection } = useCardCollection()

  useEffect(() => {
    setIsChecked(collection.some(cardInCollection => cardInCollection.id === card.id))
  }, [collection, card.id])

  const handleChange = async () => {
    await toggleCardIntoCollection({ cardId: card.id })
  }

  return (
    (
      <li className={`card ${sanitizeRarityName(card.rarity)}`} key={card.id}>
        {/* <h3>{card.name}</h3>
        <p className=''># {card.number}/{card.set_size}</p> */}
        <div className='card-image-container'>
          <img
            src={card.image_url} alt={card.number}
            className={!isChecked ? 'grey-card' : ''}
          />
        </div>
        <div className='card-input_container'>
          <label htmlFor={`is_checked-${card.id}`}>¿La atrapaste?</label>
          <input id={`is_checked-${card.id}`} type='checkbox' checked={isChecked} onChange={handleChange} />
        </div>
      </li>
    )
  )
}

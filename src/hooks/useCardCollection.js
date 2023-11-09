import { useContext } from 'react'
import { CardCollectionContext } from '../context/cardCollection'

export const useCardCollection = () => {
  const cardCollectionContext = useContext(CardCollectionContext)

  if (cardCollectionContext === undefined) {
    throw new Error('useCardCollection must be used within a CardCollectionProvider')
  }

  return cardCollectionContext
}

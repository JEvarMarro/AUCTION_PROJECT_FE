import { createContext, useEffect } from 'react'
import { useCollection } from '../hooks/useCollection'
import { useAuth } from '../hooks/useAuth'

export const CardCollectionContext = createContext()

export function CardCollectionProvider ({ children }) {
  const {
    collection,
    setsCollection,
    cardsCollection,
    guessCardsCollection,
    getCollection,
    addCardToCollection,
    removeCardFromCollection,
    addSetToCollection,
    removeSetFromCollection,
    loading
  } = useCollection()

  const { authToken } = useAuth()

  useEffect(() => {
    if (authToken) {
      getCollection({ authToken })
    }
  }, [authToken])

  const toggleCardIntoCollection = async ({ cardId }) => {
    const cardInCollectionIndex = cardsCollection.findIndex(item => item.id === cardId)
    if (cardInCollectionIndex >= 0) {
      await removeCardFromCollection(authToken, cardId)
    } else {
      await addCardToCollection(authToken, cardId)
    }
    await getCollection({ authToken })
  }

  const selectAll = async (setId) => {
    await addSetToCollection(authToken, setId)
  }

  const clearCardCollection = async (setId) => {
    await removeSetFromCollection(authToken, setId)
  }

  return (
    <CardCollectionContext.Provider value={{
      collection,
      getCollection,
      setsCollection,
      cardsCollection,
      guessCardsCollection,
      toggleCardIntoCollection,
      clearCardCollection,
      selectAll,
      loading
    }}
    >
      {children}
    </CardCollectionContext.Provider>
  )
}

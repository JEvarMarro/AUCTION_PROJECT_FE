import { createContext, useEffect, useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { useAuth } from '../hooks/useAuth'
import { userIdFromToken } from '../auth/auth'

export const CardCollectionContext = createContext()

export function CardCollectionProvider ({ children }) {
  const {
    collection,
    setCollection,
    getCollection,
    addCardToCollection,
    removeCardFromCollection,
    addSetToCollection,
    removeSetFromCollection,
    loading
  } = useCollection()
  const { authToken } = useAuth()
  const [userId, setUserId] = useState()

  useEffect(() => {
    setUserId(userIdFromToken(authToken))
    if (authToken && userId) {
      getCollection(userId)
    } else {
      setCollection([])
    }
  }, [authToken, userId])

  const toggleCardIntoCollection = async ({ cardId }) => {
    const cardInCollectionIndex = collection.findIndex(item => item.id === cardId)
    if (cardInCollectionIndex >= 0) {
      await removeCardFromCollection(authToken, cardId)
    } else {
      await addCardToCollection(authToken, cardId)
    }
    await getCollection(userId)
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

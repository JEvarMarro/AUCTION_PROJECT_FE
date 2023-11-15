
import { useState } from 'react'

import {
  searchCollection,
  addToCollection,
  removeFromCollection,
  addSet,
  removeSet
} from '../services/collection'
import { userIdFromToken } from '../auth/auth'

export function useCollection () {
  const [collection, setCollection] = useState([])
  const [setsCollection, setSetsCollection] = useState([])
  const [cardsCollection, setCardsCollection] = useState([])
  const [guessCollection, setGuessCollection] = useState([])
  const [guessSetsCollection, setGuessSetsCollection] = useState([])
  const [guessCardsCollection, setGuessCardsCollection] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCollection = async ({ authToken, userId }) => {
    try {
      setError(null)
      if (authToken) {
        const loggedUserId = userIdFromToken(authToken)
        const newCollection = await searchCollection({ userId: loggedUserId })
        const newSetsCollection = getSetsFromCollection(newCollection)
        const newCardsCollection = getCardsFromCollection(newSetsCollection)
        setCollection(newCollection)
        setSetsCollection(newSetsCollection)
        setCardsCollection(newCardsCollection)
      } else {
        setCollection([])
        setSetsCollection([])
        setCardsCollection([])
      }
      if (userId) {
        const newCollection = await searchCollection({ userId })
        const newSetsCollection = getSetsFromCollection(newCollection)
        const newCardsCollection = getCardsFromCollection(newSetsCollection)
        setGuessCollection(newCollection)
        setGuessSetsCollection(newCollection)
        setGuessCardsCollection(newCardsCollection)
      }
    } catch (e) {
      setError(e.message)
      return []
    } finally {
      // setLoading(false)
    }
  }

  const getSetsFromCollection = (newCollection) => {
    return newCollection.map(serie => serie.sets).flat()
  }

  const getCardsFromCollection = (newSets) => {
    return newSets?.map(set => set.cards)?.flat()
  }

  const addCardToCollection = async (authToken, userId) => {
    try {
      // setLoading(true)
      setError(null)
      await addToCollection(authToken, userId)
    } catch (e) {
      setError(e.message)
    } finally {
      // setLoading(false)
    }
  }

  const removeCardFromCollection = async (authToken, cardId) => {
    try {
      // setLoading(true)
      setError(null)
      await removeFromCollection(authToken, cardId)
      const updatedCardsCollection = cardsCollection.filter(item => item.id !== cardId)
      setCardsCollection(updatedCardsCollection)
    } catch (e) {
      setError(e.message)
    } finally {
      // setLoading(false)
    }
  }

  const removeSetFromCollection = async (authToken, setId) => {
    try {
      setLoading(true)
      setError(null)
      await removeSet(authToken, setId)
      const userId = userIdFromToken(authToken)
      await getCollection({ userId })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const addSetToCollection = async (authToken, setId) => {
    try {
      setLoading(true)
      setError(null)
      await addSet(authToken, setId)
      const userId = userIdFromToken(authToken)
      await getCollection({ userId })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    collection,
    getCollection,
    setsCollection,
    setSetsCollection,
    getSetsFromCollection,
    cardsCollection,
    setCardsCollection,
    guessCollection,
    guessSetsCollection,
    guessCardsCollection,
    setGuessCardsCollection,
    getCardsFromCollection,
    addCardToCollection,
    removeCardFromCollection,
    setCollection,
    addSetToCollection,
    removeSetFromCollection,
    loading,
    error
  }
}

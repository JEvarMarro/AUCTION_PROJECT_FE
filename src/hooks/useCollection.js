
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCollection = async (userId) => {
    try {
      setError(null)
      const newCollection = await searchCollection(userId)
      setCollection(newCollection)
    } catch (e) {
      setError(e.message)
    } finally {
      // setLoading(false)
    }
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
      const updatedCollection = collection.filter(item => item.id !== cardId)
      setCollection(updatedCollection)
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
      getCollection(userId)
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
      getCollection(userId)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    collection,
    getCollection,
    addCardToCollection,
    removeCardFromCollection,
    setCollection,
    addSetToCollection,
    removeSetFromCollection,
    loading,
    error
  }
}

import React, { useEffect } from 'react'
import { useCollection } from '../hooks/useCollection'
import { useParams } from 'react-router-dom'
import { Serie } from './Series/Serie'
import '../styles/Collection.css'

export const Collection = () => {
  const {
    guessCollection,
    getCollection
  } = useCollection()

  const { userId } = useParams()

  useEffect(() => {
    if (userId) {
      getCollection({ userId })
    }
  }, [userId])

  return (
    <div className='listOfSeriesContainer'>
      <ul className='series'>
        {guessCollection &&
          guessCollection.map(serie => (
            <Serie key={serie.id} serie={serie} />
          ))}
      </ul>
    </div>
  )
}

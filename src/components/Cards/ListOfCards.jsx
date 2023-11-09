import { Card } from './Card'
import { useCardCollection } from '../../hooks/useCardCollection'
import Loader from '../Loader'
import '../../styles/ListOfCards.css'

export function ListOfCards ({ cards, setId, loading }) {
  const {
    clearCardCollection,
    selectAll
    ,
    loading: isLoadingCardCollection
  } = useCardCollection()

  // TODO: BUG loading is updating in multiple places
  if (isLoadingCardCollection) {
    return <Loader />
  }

  return (
    <div className='listOfCardsContainer'>
      <div className='listOfCardsHeader'>
        <button onClick={() => clearCardCollection(setId)}>
          Limpiar todas
        </button>
        <button onClick={() => selectAll(setId)}>
          Agregar Todas
        </button>
      </div>
      <ul className='cards'>
        {!loading &&
          cards.map(card => (
            <Card key={card.id} card={card} />
          ))}
      </ul>
    </div>
  )
}

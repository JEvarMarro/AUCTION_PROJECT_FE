import { useNavigate } from 'react-router-dom'
import '../../styles/Set.css'

export function ListOfSets ({ sets }) {
  const navigate = useNavigate()
  const handleClick = (serieId, setId) => {
    navigate(`/series/${serieId}/sets/${setId}/cards`)
  }
  return (
    <ul className='sets'>
      {
        sets.map(set => (
          <li className='set' key={set.id} onClick={() => handleClick(set.serie_id, set.id)}>
            <h3>{set.name}</h3>
            <p>{set.year}</p>
            <img src={set.image_url} alt={set.name} />
          </li>
        ))
      }
    </ul>
  )
}

import { useNavigate } from 'react-router-dom'

export function ListOfSets ({ sets }) {
  const navigate = useNavigate()
  const handleClick = (serieId, setId) => {
    navigate(`/series/${serieId}/sets/${setId}/cards`)
  }
  return (
    <ul className='series'>
      {
        sets.map(set => (
          <li className='serie' key={set.id} onClick={() => handleClick(set.serie_id, set.id)}>
            <h3>{set.name}</h3>
            <p>{set.year}</p>
            <img src={set.image_url} alt={set.name} />
          </li>
        ))
      }
    </ul>
  )
}

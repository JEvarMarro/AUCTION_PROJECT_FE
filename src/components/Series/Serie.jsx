import { useNavigate } from 'react-router-dom'

export function Serie ({ serie }) {
  const navigate = useNavigate()
  const handleClick = (serieId) => {
    navigate(`/series/${serieId}/sets`)
  }

  return (
    <li className='serie' key={serie.id} onClick={() => handleClick(serie.id)}>
      <h3>{serie.name}</h3>
      <p>{serie.year}</p>
      <img src={serie.image_url} alt={serie.name} />
    </li>
  )
}

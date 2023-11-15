import { useNavigate, useParams } from 'react-router-dom'

export function Serie ({ serie }) {
  const navigate = useNavigate()
  const { userId } = useParams()
  const handleClick = (serieId) => {
    const urlToNavigate =
      !userId
        ? `/series/${serieId}/sets`
        : `/collection/${userId}/series/${serieId}/sets`
    navigate(urlToNavigate)
  }

  return (
    <li className='serie' key={serie.id} onClick={() => handleClick(serie.id)}>
      <img src={serie.image_url} alt={serie.name} />
    </li>
  )
}

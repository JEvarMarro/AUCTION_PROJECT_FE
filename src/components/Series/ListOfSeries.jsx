import { Serie } from './Serie'
import '../../styles/Serie.css'

export function ListOfSeries ({ series }) {
  return (
    <ul className='series'>
      {
        series.map(serie => (
          <Serie serie={serie} key={serie.id} />
        ))
      }
    </ul>
  )
}

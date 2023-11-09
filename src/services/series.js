import axios from 'axios'
const API_URL = 'http://127.0.0.1:3000/series'

export const searchSeries = async (authToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    const { data } = await axios.get(API_URL, config)
    const series = data.series
    return series?.map(serie => ({
      id: serie.id,
      name: serie.name,
      year: new Date(serie.release_date).getFullYear(),
      image_url: serie.image_url
    }))
  } catch (e) {
    throw new Error('')
  }
}

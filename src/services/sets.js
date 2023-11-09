const API_URL = 'http://127.0.0.1:3000/serie_sets'

export const searchSets = async (authToken, serieId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    const fetchUrl = `${API_URL}?serie_id=${serieId}`
    const response = await fetch(fetchUrl, config)
    const json = await response.json()
    const sets = json.serie_sets

    return sets?.map(set => ({
      id: set.id,
      serie_id: set.serie_id,
      name: set.name,
      year: new Date(set.release_date).getFullYear(),
      image_url: set.image_url
    }))
  } catch (e) {
    throw new Error('')
  }
}

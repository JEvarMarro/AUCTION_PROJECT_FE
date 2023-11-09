const API_URL = 'http://127.0.0.1:3000/cards'
export const searchCards = async (authToken, serieId, setId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    const fetchUrl = `${API_URL}?serie_id=${serieId}&serie_set_id=${setId}`
    const response = await fetch(fetchUrl, config)
    const json = await response.json()
    const cards = json.cards

    return cards?.map(card => ({
      id: card.id,
      name: card.name,
      number: card.number,
      image_url: card.image_url,
      set_size: card.serie_set.total_amount,
      rarity: card?.card_rarity?.name.replace(' ', '_').toLowerCase()
    }))
  } catch (e) {
    throw new Error('')
  }
}

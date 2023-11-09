export function sanitizeRarityName (rarity) {
  return rarity.replace(' ', '_').toLowerCase()
}

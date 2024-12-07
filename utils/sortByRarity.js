const RARITY_ORDER = {
  mythic: 1,
  legendary: 2,
  epic: 3,
  rare: 4,
  uncommon: 5,
  common: 6
};

export const sortByRarity = (accounts) => {
  return [...accounts].sort((a, b) => {
    return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity];
  });
};
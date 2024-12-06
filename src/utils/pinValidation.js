export const validatePin = (inputPin, service, rarityConfigs) => {
  // First check for service-specific pin
  if (service.pin) {
    return inputPin === service.pin;
  }
  
  // Fallback to rarity-based pin
  const rarityConfig = rarityConfigs[service.rarity];
  return rarityConfig && inputPin === rarityConfig.pin;
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import WarningMessage from './WarningMessage';
import SteamHeader from './steam/SteamHeader';
import SteamAccountsList from './steam/SteamAccountsList';
import { steamAccounts } from '../data/steamAccounts';
import { sortByRarity } from '../utils/sortByRarity';

export default function Steam() {
  const [filteredAccounts, setFilteredAccounts] = useState(sortByRarity(steamAccounts));

  const handleSearch = (searchTerm) => {
    const filtered = steamAccounts.filter(account => 
      account.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.features.some(feature => 
        feature.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredAccounts(sortByRarity(filtered));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <SteamHeader />

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <SearchBar onSearch={handleSearch} />
        <WarningMessage />
        <SteamAccountsList accounts={filteredAccounts} />
      </div>
    </motion.div>
  );
}
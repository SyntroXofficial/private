import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const accounts = [
  {
    id: 1,
    title: 'Premium Gaming Account',
    description: 'Access to exclusive content and features',
    status: 'Available'
  },
  {
    id: 2,
    title: 'Elite Gaming Package',
    description: 'Full access to premium games and DLCs',
    status: 'Limited'
  },
  // Add more accounts as needed
];

export default function Accounts() {
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  const handleSearch = (searchTerm) => {
    const filtered = accounts.filter(account => 
      account.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccounts(filtered);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-red-500 mb-6">Premium Accounts</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our collection with exclusive content.
          </p>
        </motion.div>

        <SearchBar onSearch={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccounts.map((account) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect p-6 rounded-xl"
            >
              <h3 className="text-xl font-bold text-white mb-2">{account.title}</h3>
              <p className="text-gray-400 mb-4">{account.description}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                {account.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
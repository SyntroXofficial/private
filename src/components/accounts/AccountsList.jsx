import React from 'react';
import { motion } from 'framer-motion';
import { accounts } from '../../data/accounts';
import ServiceCard from './ServiceCard';

export default function AccountsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {accounts.map((account, index) => (
        <motion.div
          key={account.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ServiceCard service={account} />
        </motion.div>
      ))}
    </div>
  );
}
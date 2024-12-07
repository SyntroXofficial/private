import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyIcon, PlusIcon } from '@heroicons/react/24/outline';
import AccessRuleModal from './AccessRuleModal';

export default function AccessControl({ rules, onUpdateRule, onAddRule }) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <KeyIcon className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-white">Access Control</h2>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="glass-effect p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">{rule.name}</h3>
                <p className="text-sm text-gray-400">{rule.description}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Applies to:</span>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">
                    {rule.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  rule.enabled
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {rule.enabled ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => onUpdateRule(rule.id, { enabled: !rule.enabled })}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    rule.enabled
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  {rule.enabled ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AccessRuleModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={onAddRule}
      />
    </motion.div>
  );
}
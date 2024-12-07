import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import FirewallRuleModal from './FirewallRuleModal';

export default function FirewallSettings({ rules, onUpdateRule, onAddRule }) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheckIcon className="h-6 w-6 text-green-500" />
          <h2 className="text-xl font-bold text-white">Firewall Rules</h2>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
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
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  rule.enabled
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {rule.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <button
                  onClick={() => onUpdateRule(rule.id, { enabled: !rule.enabled })}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    rule.enabled
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  {rule.enabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FirewallRuleModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={onAddRule}
      />
    </motion.div>
  );
}
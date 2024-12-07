import React from 'react';
import { motion } from 'framer-motion';
import SecurityOverview from './SecurityOverview';
import FirewallSettings from './FirewallSettings';
import AccessControl from './AccessControl';
import SecurityLogs from './SecurityLogs';
import { useSecurityDashboard } from '../../../hooks/useSecurityDashboard';

export default function SecurityDashboard() {
  const { 
    securityStats,
    firewallRules,
    accessRules,
    logs,
    updateFirewallRule,
    updateAccessRule,
    addFirewallRule,
    addAccessRule,
    clearLogs
  } = useSecurityDashboard();

  return (
    <div className="space-y-8">
      <SecurityOverview stats={securityStats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FirewallSettings 
          rules={firewallRules}
          onUpdateRule={updateFirewallRule}
          onAddRule={addFirewallRule}
        />
        <AccessControl 
          rules={accessRules}
          onUpdateRule={updateAccessRule}
          onAddRule={addAccessRule}
        />
      </div>

      <SecurityLogs logs={logs} onClear={clearLogs} />
    </div>
  );
}
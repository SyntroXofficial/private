import React from 'react';
import SystemRequirements from './SystemRequirements';
import AccountFeatures from '../accounts/AccountFeatures';

export default function AccountDetails({ account }) {
  return (
    <div className="space-y-4 mb-6">
      <div className="space-y-4">
        {account.description.split('\n').map((line, index) => (
          <p key={index} className="text-gray-300 flex items-center gap-2">
            {line}
          </p>
        ))}
      </div>
      
      <AccountFeatures features={account.features} />
      <SystemRequirements requirements={account.requirements} />
    </div>
  );
}
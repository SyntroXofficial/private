import React from 'react';
import { accounts } from '../../data/accounts';
import PageHeader from '../layout/PageHeader';

export default function AccountsHeader() {
  return (
    <PageHeader
      title="Premium Accounts"
      subtitle="Access our exclusive collection of premium gaming and streaming accounts"
      count={accounts.length}
      countLabel="Premium Accounts"
    />
  );
}
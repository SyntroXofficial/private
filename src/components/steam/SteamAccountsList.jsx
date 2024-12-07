import React from 'react';
import AccountCard from '../AccountCard';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 21;

export default function SteamAccountsList({ accounts, currentPage, onPageChange }) {
  const totalPages = Math.ceil(accounts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAccounts = accounts.slice(startIndex, endIndex);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentAccounts.map((account, index) => (
          <AccountCard key={index} account={account} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
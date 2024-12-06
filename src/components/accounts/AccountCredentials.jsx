import React from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

export default function AccountCredentials({ username, password, copied, onCopy, rarityConfig }) {
  return (
    <>
      <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
        <span className="text-gray-300">Username:</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-100">{username}</span>
          <button 
            onClick={() => onCopy(username, 'username')}
            className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
          </button>
          {copied === 'username' && (
            <span className={`text-xs ${rarityConfig.textAccent}`}>Copied!</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
        <span className="text-gray-300">Password:</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-100">{password}</span>
          <button 
            onClick={() => onCopy(password, 'password')}
            className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
          </button>
          {copied === 'password' && (
            <span className={`text-xs ${rarityConfig.textAccent}`}>Copied!</span>
          )}
        </div>
      </div>
    </>
  );
}
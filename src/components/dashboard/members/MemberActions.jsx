import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useMemberStore from '../../../store/memberStore';
import BanModal from './BanModal';

export default function MemberActions({ member }) {
  const [showBanModal, setShowBanModal] = useState(false);
  const { banMember, unbanMember } = useMemberStore();

  const handleBan = (reason) => {
    banMember(member.id, reason);
    setShowBanModal(false);
  };

  const handleUnban = () => {
    unbanMember(member.id);
  };

  if (member.role === 'Owner') {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-3">
        {member.banned ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUnban}
            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
          >
            Unban
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBanModal(true)}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Ban
          </motion.button>
        )}
      </div>

      <BanModal
        isOpen={showBanModal}
        onClose={() => setShowBanModal(false)}
        onBan={handleBan}
        username={member.username}
      />
    </>
  );
}
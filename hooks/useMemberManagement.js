import { useState } from 'react';

export function useMemberManagement() {
  const [members, setMembers] = useState([
    {
      id: '1',
      username: 'Andres_rios',
      email: 'andres@example.com',
      role: 'Owner',
      discordId: '123456789012345678',
      joinDate: '2024-01-15',
      lastActive: 'Now',
      banned: false
    },
    {
      id: '2',
      username: 'MarcSpector',
      email: 'marc@example.com',
      role: 'Owner',
      discordId: '987654321098765432',
      joinDate: '2024-01-15',
      lastActive: '2h ago',
      banned: false
    }
  ]);

  const banMember = (id) => {
    setMembers(prev => prev.map(member => 
      member.id === id
        ? { 
            ...member, 
            banned: true, 
            banDate: new Date().toISOString(), 
            banReason: 'Violation of terms' 
          }
        : member
    ));
  };

  const unbanMember = (id) => {
    setMembers(prev => prev.map(member =>
      member.id === id
        ? { 
            ...member, 
            banned: false, 
            banDate: null, 
            banReason: null 
          }
        : member
    ));
  };

  return { members, banMember, unbanMember };
}
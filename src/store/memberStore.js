import { create } from 'zustand';
import { socketService } from '../services/socketService';
import { SOCKET_EVENTS } from '../services/socket/socketConfig';

const useMemberStore = create((set, get) => ({
  members: [
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
  ],
  onlineUsers: new Set(['1', '2']),
  isLoading: false,
  error: null,

  initializeRealtime: () => {
    socketService.initialize();
    
    const presenceUnsubscribe = socketService.subscribe(SOCKET_EVENTS.PRESENCE, ({ userId, status }) => {
      set(state => {
        const newOnlineUsers = new Set(state.onlineUsers);
        if (status === 'online') {
          newOnlineUsers.add(userId);
        } else {
          newOnlineUsers.delete(userId);
        }
        return { onlineUsers: newOnlineUsers };
      });
    });

    return () => {
      presenceUnsubscribe();
    };
  },

  fetchMembers: () => {
    const storedMembers = JSON.parse(localStorage.getItem('members') || '[]');
    set({ members: storedMembers.length > 0 ? storedMembers : get().members });
  },

  updateMemberStatus: (memberId, isOnline) => {
    try {
      set(state => {
        const updatedMembers = state.members.map(member =>
          member.id === memberId
            ? { ...member, lastActive: isOnline ? 'Now' : new Date().toISOString() }
            : member
        );

        const newOnlineUsers = new Set(state.onlineUsers);
        if (isOnline) {
          newOnlineUsers.add(memberId);
        } else {
          newOnlineUsers.delete(memberId);
        }

        localStorage.setItem('members', JSON.stringify(updatedMembers));
        return {
          members: updatedMembers,
          onlineUsers: newOnlineUsers
        };
      });

      socketService.emit(SOCKET_EVENTS.MEMBER_STATUS, {
        memberId,
        status: isOnline ? 'online' : 'offline'
      });
    } catch (error) {
      console.error('Error updating member status:', error);
    }
  },

  banMember: (memberId, reason) => {
    set(state => {
      const updatedMembers = state.members.map(member =>
        member.id === memberId
          ? {
              ...member,
              banned: true,
              banReason: reason,
              banDate: new Date().toISOString()
            }
          : member
      );

      localStorage.setItem('members', JSON.stringify(updatedMembers));
      return { members: updatedMembers };
    });
  },

  unbanMember: (memberId) => {
    set(state => {
      const updatedMembers = state.members.map(member =>
        member.id === memberId
          ? {
              ...member,
              banned: false,
              banReason: null,
              banDate: null
            }
          : member
      );

      localStorage.setItem('members', JSON.stringify(updatedMembers));
      return { members: updatedMembers };
    });
  }
}));

export default useMemberStore;
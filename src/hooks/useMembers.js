import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '../services/firebase';

export function useMembers() {
  const [members, setMembers] = useState([
    {
      id: '1',
      username: 'Andres_rios',
      role: 'Owner',
      discordId: '123456789012345678',
      joinDate: '2024-01-15',
      isOnline: true
    },
    {
      id: '2',
      username: 'MarcSpector',
      role: 'Owner',
      discordId: '987654321098765432',
      joinDate: '2024-01-15',
      isOnline: true
    }
  ]);
  const [onlineCount, setOnlineCount] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const membersQuery = query(
      collection(db, COLLECTIONS.MEMBERS),
      orderBy('joinDate', 'desc')
    );

    const unsubscribe = onSnapshot(membersQuery, 
      (snapshot) => {
        const updatedMembers = [];
        snapshot.forEach((doc) => {
          updatedMembers.push({ id: doc.id, ...doc.data() });
        });
        setMembers(updatedMembers);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching members:', error);
        setError(error.message);
        setIsLoading(false);
      }
    );

    // Listen for online status changes
    const onlineStatusQuery = query(
      collection(db, COLLECTIONS.ONLINE_STATUS)
    );

    const statusUnsubscribe = onSnapshot(onlineStatusQuery, (snapshot) => {
      const onlineUsers = snapshot.docs.filter(doc => doc.data().isOnline).length;
      setOnlineCount(onlineUsers);
    });

    return () => {
      unsubscribe();
      statusUnsubscribe();
    };
  }, []);

  const updateMemberStatus = async (memberId, isOnline) => {
    try {
      const statusRef = doc(db, COLLECTIONS.ONLINE_STATUS, memberId);
      await updateDoc(statusRef, {
        isOnline,
        lastSeen: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating member status:', error);
    }
  };

  return {
    members,
    onlineCount,
    isLoading,
    error,
    updateMemberStatus
  };
}
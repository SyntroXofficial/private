import { useState, useEffect } from 'react';
import { socketService } from '../services/socketService';

export function useServerMetrics() {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: {
      in: 0,
      out: 0
    },
    responseTime: 0
  });

  useEffect(() => {
    // Subscribe to real-time metrics updates
    const unsubscribe = socketService.subscribe('serverMetrics', (data) => {
      setMetrics(data);
    });

    // Initial metrics fetch
    fetch('https://api.vercel.com/v1/metrics', {
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setMetrics(prev => ({
        ...prev,
        ...data
      }));
    })
    .catch(console.error);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return metrics;
}
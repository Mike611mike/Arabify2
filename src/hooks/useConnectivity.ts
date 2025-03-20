
import { useState, useEffect } from 'react';

interface ConnectivityState {
  isOffline: boolean;
  lastSync: string | null;
}

export function useConnectivity(): ConnectivityState {
  const [isOffline, setIsOffline] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(
    localStorage.getItem('lastSyncTime')
  );
  
  // Check network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
    };
    
    const handleOffline = () => {
      setIsOffline(true);
    };
    
    // Check initial state
    setIsOffline(!navigator.onLine);
    
    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Update lastSync in localStorage whenever it changes
  useEffect(() => {
    if (lastSync) {
      localStorage.setItem('lastSyncTime', lastSync);
    }
  }, [lastSync]);
  
  return { isOffline, lastSync };
}

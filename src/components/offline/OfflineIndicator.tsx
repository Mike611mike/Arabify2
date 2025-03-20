
import React from 'react';
import { useConnectivity } from '@/hooks/useConnectivity';
import { CloudOff, Wifi, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useSentences } from '@/context/SentencesContext';

const OfflineIndicator: React.FC = () => {
  const { isOffline } = useConnectivity();
  const { sentences } = useSentences();
  
  // For demo purposes, let's add a lastSync state variable
  const [lastSync, setLastSync] = React.useState<string | null>(null);
  
  const handleSyncClick = () => {
    if (isOffline) {
      toast.error('Cannot sync while offline. Please connect to the internet first.');
    } else {
      toast.success('Syncing your data...');
      // In a real implementation, this would trigger a sync with the server
      setTimeout(() => {
        setLastSync(new Date().toISOString());
        toast.success(`Successfully synced ${sentences.length} sentences`);
      }, 1500);
    }
  };
  
  // Format the last sync time
  const formatLastSync = () => {
    if (!lastSync) return 'Never';
    
    const date = new Date(lastSync);
    return date.toLocaleString();
  };
  
  return (
    <div className={`glass-card rounded-lg p-3 shadow-lg ${isOffline ? 'border-amber-500 border shadow-amber-500/20' : 'shadow-purple-500/15'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {isOffline ? (
            <CloudOff className="mr-2 text-amber-500" size={20} />
          ) : (
            <Wifi className="mr-2 text-spotify-green" size={20} />
          )}
          <div>
            <p className="font-medium">
              {isOffline ? 'Offline Mode' : 'Online Mode'}
            </p>
            <p className="text-xs text-spotify-text">
              Last synced: {formatLastSync()}
            </p>
          </div>
        </div>
        
        <Button 
          size="sm" 
          variant={isOffline ? "outline" : "default"}
          onClick={handleSyncClick}
          disabled={isOffline}
          className="flex items-center shadow-sm hover:shadow-md transition-shadow"
        >
          <RefreshCw size={16} className="mr-1" />
          Sync
        </Button>
      </div>
      
      {isOffline && (
        <div className="mt-2 text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 p-2 rounded shadow-inner">
          <p>You're currently working offline. Changes will be saved locally and synced when you're back online.</p>
        </div>
      )}
    </div>
  );
};

export default OfflineIndicator;

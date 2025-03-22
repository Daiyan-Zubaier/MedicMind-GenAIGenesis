
import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmergencyHeader = ({ isUrgent, emergency, onCall911 }) => {
  if (!isUrgent) return null;
  
  return (
    <div className="bg-emergency px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-5 w-5 text-emergency-foreground" />
        <h3 className="font-medium text-emergency-foreground">Emergency Situation</h3>
      </div>
      <Button 
        variant="secondary"
        onClick={onCall911}
        className="bg-white text-emergency hover:bg-white/90"
      >
        <Phone className="h-4 w-4 mr-2" />
        <span>Call 911</span>
      </Button>
    </div>
  );
};

export default EmergencyHeader;


import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, Phone, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Instruction {
  id: number;
  text: string;
  imageUrl?: string;
  isUrgent?: boolean;
}

interface FirstAidInstructionsProps {
  instructions: Instruction[];
  emergency: string;
  isUrgent: boolean;
}

const FirstAidInstructions: React.FC<FirstAidInstructionsProps> = ({
  instructions,
  emergency,
  isUrgent,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (id: number) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter((stepId) => stepId !== id));
    } else {
      setCompletedSteps([...completedSteps, id]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 px-4 animate-fade-in">
      <div className="glass-card rounded-xl overflow-hidden">
        {isUrgent && (
          <div className="bg-emergency px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-emergency-foreground" />
              <h3 className="font-medium text-emergency-foreground">Emergency Situation</h3>
            </div>
            <a 
              href="tel:911"
              className="flex items-center space-x-2 bg-white text-emergency px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call 911</span>
            </a>
          </div>
        )}
        
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-1">First Aid for: {emergency}</h2>
          <p className="text-sm text-muted-foreground mb-6">Follow these steps carefully</p>
          
          <div className="space-y-5">
            {instructions.map((instruction) => (
              <div 
                key={instruction.id}
                className={cn(
                  "flex space-x-4 transition-all duration-300 p-3 rounded-lg",
                  completedSteps.includes(instruction.id) ? "bg-primary/5" : "hover:bg-accent"
                )}
              >
                <div 
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border",
                    completedSteps.includes(instruction.id) 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : "border-muted-foreground/30"
                  )}
                  onClick={() => toggleStep(instruction.id)}
                  role="checkbox"
                  aria-checked={completedSteps.includes(instruction.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleStep(instruction.id);
                    }
                  }}
                >
                  {completedSteps.includes(instruction.id) ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className={cn(
                    "text-base transition-colors",
                    completedSteps.includes(instruction.id) && "text-muted-foreground"
                  )}>
                    {instruction.text}
                  </p>
                  
                  {instruction.imageUrl && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-border">
                      <img 
                        src={instruction.imageUrl} 
                        alt={`Illustration for step ${instruction.id}`}
                        className="w-full h-auto max-h-60 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstAidInstructions;

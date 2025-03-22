
import React from 'react';
import { cn } from '@/lib/utils';

const StepItem = ({ 
  instruction, 
  voiceEnabled, 
  currentVoiceStep, 
  isCompleted, 
  onToggle 
}) => {
  return (
    <div 
      className={cn(
        "flex space-x-4 transition-all duration-300 p-3 rounded-lg",
        voiceEnabled && currentVoiceStep === instruction.id ? "bg-primary/10 border border-primary/30" : "",
        !voiceEnabled && isCompleted ? "bg-primary/5" : "hover:bg-accent"
      )}
      onClick={() => onToggle(instruction.id)}
    >
      <div 
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border text-center",
          voiceEnabled && currentVoiceStep === instruction.id 
            ? "bg-primary border-primary text-primary-foreground"
            : !voiceEnabled && isCompleted 
              ? "bg-primary border-primary text-primary-foreground" 
              : "border-muted-foreground/30"
        )}
      >
        <span className="text-xs font-medium">{instruction.id}</span>
      </div>
      <div className="flex-grow">
        <p className={cn(
          "text-base transition-colors", 
          voiceEnabled && currentVoiceStep === instruction.id && "font-medium",
          !voiceEnabled && isCompleted && "text-muted-foreground"
        )}>
          {instruction.text}
        </p>
        
        {instruction.imageUrl && (
          <div className="mt-3">
            <img 
              src={instruction.imageUrl} 
              alt={`Step ${instruction.id}`} 
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StepItem;

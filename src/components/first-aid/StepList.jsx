
import React from 'react';
import StepItem from './StepItem';

const StepList = ({ 
  instructions, 
  voiceEnabled, 
  currentVoiceStep, 
  completedSteps, 
  onToggleStep 
}) => {
  return (
    <div className="space-y-5">
      {instructions.map((instruction) => (
        <StepItem
          key={instruction.id}
          instruction={instruction}
          voiceEnabled={voiceEnabled}
          currentVoiceStep={currentVoiceStep}
          isCompleted={completedSteps.includes(instruction.id)}
          onToggle={onToggleStep}
        />
      ))}
    </div>
  );
};

export default StepList;

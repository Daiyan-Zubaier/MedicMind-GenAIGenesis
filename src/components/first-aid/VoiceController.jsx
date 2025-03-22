
import React from 'react';
import { Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { speak } from '@/lib/speechUtils';
import { toast } from 'sonner';

const VoiceController = ({ 
  voiceEnabled, 
  setVoiceEnabled, 
  setCurrentVoiceStep, 
  setCompletedSteps, 
  instructions, 
  handleGenerateReport 
}) => {
  // Toggle voice instructions – reads automatically through all steps
  const toggleVoice = () => {
    if (!voiceEnabled) {
      // Enable voice mode and reset progress
      setVoiceEnabled(true);
      setCurrentVoiceStep(0);
      setCompletedSteps([]);

      // Speak an introduction, then automatically start reading the steps
      const introText = `First aid instructions. I'll guide you step by step.`;
      speak(introText, () => {
        // Start from the first instruction
        readAllInstructions();
      });
    } else {
      // Disable voice mode
      setVoiceEnabled(false);
      window.speechSynthesis.cancel();
      toast.info("Audio help disabled");
    }
  };

  // Read all instructions continuously
  const readAllInstructions = () => {
    let stepIndex = 0;
    const readNextStep = () => {
      if (stepIndex < instructions.length) {
        const instruction = instructions[stepIndex];
        setCurrentVoiceStep(instruction.id);
        setCompletedSteps(prev => {
          if (stepIndex > 0 && !prev.includes(instructions[stepIndex - 1].id)) {
            return [...prev, instructions[stepIndex - 1].id];
          }
          return prev;
        });
        
        speak(`Step ${instruction.id}. ${instruction.text}`, () => {
          stepIndex++;
          // Continue with the next step
          readNextStep();
        });
      } else {
        // All steps have been read
        speak("Those are all the steps. I hope this helped with your emergency situation.", () => {
          // Mark the last step as completed
          setCompletedSteps(prev => {
            if (instructions.length > 0 && !prev.includes(instructions[instructions.length - 1].id)) {
              return [...prev, instructions[instructions.length - 1].id];
            }
            return prev;
          });
          
          // After all steps are read, prepare the report
          handleGenerateReport();
          setVoiceEnabled(false);
        });
      }
    };
    
    // Start reading
    readNextStep();
  };

  return (
    <Button 
      variant={voiceEnabled ? "default" : "outline"}
      size="sm"
      onClick={toggleVoice}
      className="relative"
    >
      <Headphones className="mr-2" />
      {voiceEnabled ? "Audio Help On" : "Audio Help"}
    </Button>
  );
};

export default VoiceController;

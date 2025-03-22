
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight, Phone, Check, Headphones, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { speak } from '@/lib/speechUtils'; // note: we're not using listenForReady anymore
import { toast } from 'sonner';
import Call911Confirmation from './Call911Confirmation';
import EmergencyReport from './EmergencyReport';

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
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [currentVoiceStep, setCurrentVoiceStep] = useState<number>(0);
  const [showCallConfirmation, setShowCallConfirmation] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);

  // Toggle voice instructions – in this version it reads automatically through all steps
  const toggleVoice = () => {
    if (!voiceEnabled) {
      // Enable voice mode and reset progress
      setVoiceEnabled(true);
      setCurrentVoiceStep(0);
      setCompletedSteps([]);

      // Speak an introduction, then automatically start reading the steps
      const introText = `First aid instructions for ${emergency}. I'll guide you step by step. Now starting with the first step.`;
      speak(introText, () => {
        moveToNextStep();
      });
    } else {
      // Disable voice mode
      setVoiceEnabled(false);
      window.speechSynthesis.cancel();
      toast.info("Audio help disabled");
    }
  };

  // Move to the next instruction step automatically
  const moveToNextStep = () => {
    const nextStep = currentVoiceStep + 1;

    if (nextStep <= instructions.length) {
      setCurrentVoiceStep(nextStep);
      setCompletedSteps((prev) => {
        if (!prev.includes(nextStep - 1) && nextStep > 1) {
          return [...prev, nextStep - 1];
        }
        return prev;
      });

      const instruction = instructions.find((i) => i.id === nextStep);
      if (instruction) {
        speak(instruction.text, () => {
          if (nextStep < instructions.length) {
            // Pause for a short time (e.g. 1 second) then move on automatically
            setTimeout(() => {
              moveToNextStep();
            }, 1000);
          } else {
            // Last instruction: give a concluding message and then generate the report
            speak("Those are all the steps. I hope this helped with your emergency situation.", () => {
              handleGenerateReport();
              setVoiceEnabled(false);
            });
          }
        });
      }
    } else {
      // In case we are beyond the last step
      handleGenerateReport();
      setVoiceEnabled(false);
    }
  };

  // Handle manual toggling of a step when voice is disabled
  const toggleStep = (id: number) => {
    if (voiceEnabled) {
      // In voice mode, tapping a step reads that step aloud
      const instruction = instructions.find((i) => i.id === id);
      if (instruction) {
        setCurrentVoiceStep(id);
        speak(instruction.text, () => {
          // No automatic chaining here
        });
      }
    } else {
      // Toggle completed state when voice is off
      if (completedSteps.includes(id)) {
        setCompletedSteps(completedSteps.filter((stepId) => stepId !== id));
      } else {
        setCompletedSteps([...completedSteps, id]);
      }
    }
  };

  // Handle the 911 call confirmation
  const handleCall911 = () => {
    setShowCallConfirmation(true);
  };

  const confirmCall911 = () => {
    window.location.href = "tel:911";
    setShowCallConfirmation(false);
  };

  // Generate a report at the end
  const handleGenerateReport = () => {
    setShowReport(true);
  };

  // Cleanup speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 px-4 animate-fade-in">
      <div className="glass-card rounded-xl overflow-hidden">
        {isUrgent && (
          <div className="bg-emergency px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-emergency-foreground" />
              <h3 className="font-medium text-emergency-foreground">Emergency Situation</h3>
            </div>
            <Button 
              variant="secondary"
              onClick={handleCall911}
              className="bg-white text-emergency hover:bg-white/90"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span>Call 911</span>
            </Button>
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">First Aid for: {emergency}</h2>
              <p className="text-sm text-muted-foreground">Follow these steps carefully</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={voiceEnabled ? "default" : "outline"}
                size="sm"
                onClick={toggleVoice}
                className="relative"
              >
                <Headphones className="mr-2" />
                {voiceEnabled ? "Audio Help On" : "Audio Help"}
              </Button>
            </div>
          </div>

          <div className="space-y-5">
            {instructions.map((instruction) => (
              <div 
                key={instruction.id}
                className={cn(
                  "flex space-x-4 transition-all duration-300 p-3 rounded-lg",
                  voiceEnabled && currentVoiceStep === instruction.id ? "bg-primary/10 border border-primary/30" : "",
                  !voiceEnabled && completedSteps.includes(instruction.id) ? "bg-primary/5" : "hover:bg-accent"
                )}
                onClick={() => toggleStep(instruction.id)}
              >
                <div 
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border",
                    voiceEnabled && currentVoiceStep === instruction.id 
                      ? "bg-primary border-primary text-primary-foreground"
                      : !voiceEnabled && completedSteps.includes(instruction.id) 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : "border-muted-foreground/30"
                  )}
                  role="checkbox"
                  aria-checked={completedSteps.includes(instruction.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleStep(instruction.id);
                    }
                  }}
                >
                  {(voiceEnabled && currentVoiceStep === instruction.id) || 
                   (!voiceEnabled && completedSteps.includes(instruction.id)) ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className={cn(
                    "text-base transition-colors", 
                    voiceEnabled && currentVoiceStep === instruction.id && "font-medium",
                    !voiceEnabled && completedSteps.includes(instruction.id) && "text-muted-foreground"
                  )}>
                    {instruction.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleGenerateReport} className="gap-2">
              <FileText className="h-4 w-4" />
              Done - Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* 911 Call Confirmation Dialog */}
      <Call911Confirmation
        open={showCallConfirmation}
        onOpenChange={setShowCallConfirmation}
        onConfirm={confirmCall911}
      />

      {/* Emergency Report Dialog */}
      <EmergencyReport
        open={showReport}
        onOpenChange={setShowReport}
        emergency={emergency}
        instructions={instructions}
        completedSteps={completedSteps}
        onBack={() => setShowReport(false)}
      />
    </div>
  );
};

export default FirstAidInstructions;

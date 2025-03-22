
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight, Phone, Check, Volume2, VolumeX, Mic, FileText, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { speak, listenForReady } from '@/lib/speechUtils';
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
  const [isListening, setIsListening] = useState<boolean>(false);
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);
  const [showCallConfirmation, setShowCallConfirmation] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  
  // Toggle voice instructions
  const toggleVoice = () => {
    if (!voiceEnabled) {
      // Enable voice and start from the beginning
      setVoiceEnabled(true);
      setCurrentVoiceStep(0); // Start at 0 so we can move to 1 in moveToNextStep
      setCompletedSteps([]);
      
      // Initial introduction
      const introText = `First aid instructions for ${emergency}. I'll guide you step by step. Say "Ready" or "Next" after each instruction to continue.`;
      speak(introText, () => {
        // After introduction, automatically move to first step
        moveToNextStep();
      });
    } else {
      // Disable voice
      setVoiceEnabled(false);
      if (stopListeningFn) {
        stopListeningFn();
        setStopListeningFn(null);
      }
      setIsListening(false);
      window.speechSynthesis.cancel();
      toast.info("Audio help disabled");
    }
  };
  
  // Listen for user saying "ready" to move to next step
  const startListeningForNextStep = () => {
    setIsListening(true);
    const stopFn = listenForReady(
      () => {
        setIsListening(false);
        moveToNextStep();
      },
      () => {
        setIsListening(false);
        toast.error("Could not understand. Retrying...");
        // Retry listening automatically
        setTimeout(() => startListeningForNextStep(), 1000);
      }
    );
    setStopListeningFn(() => stopFn);
  };
  
  // Move to the next instruction step
  const moveToNextStep = () => {
    // Cleanup any existing listeners
    if (stopListeningFn) {
      stopListeningFn();
      setStopListeningFn(null);
    }
    
    const nextStep = currentVoiceStep + 1;
    
    if (nextStep <= instructions.length) {
      setCurrentVoiceStep(nextStep);
      setCompletedSteps(prev => {
        if (!prev.includes(nextStep - 1) && nextStep > 1) {
          return [...prev, nextStep - 1];
        }
        return prev;
      });
      
      const instruction = instructions.find(i => i.id === nextStep);
      if (instruction) {
        speak(instruction.text, () => {
          if (nextStep < instructions.length) {
            // After reading step, start listening for next command
            startListeningForNextStep();
          } else {
            speak("Those are all the steps. I hope this helped with your emergency situation. Say 'ready' to generate a report.", 
                 () => startListeningForNextStep());
          }
        });
      }
    } else {
      // If we've gone through all steps and user says ready again, show report
      handleGenerateReport();
      setVoiceEnabled(false);
      setIsListening(false);
    }
  };
  
  // Handle manual step toggling when voice is not enabled
  const toggleStep = (id: number) => {
    if (voiceEnabled) {
      // In voice mode, tapping a step will read it aloud
      const instruction = instructions.find(i => i.id === id);
      if (instruction) {
        if (stopListeningFn) {
          stopListeningFn();
          setStopListeningFn(null);
        }
        setIsListening(false);
        setCurrentVoiceStep(id);
        speak(instruction.text, () => {
          if (id < instructions.length) {
            startListeningForNextStep();
          } else {
            speak("Those are all the steps. Say 'ready' to generate a report.",
                 () => startListeningForNextStep());
          }
        });
      }
    } else {
      // Normal toggle behavior when voice is off
      if (completedSteps.includes(id)) {
        setCompletedSteps(completedSteps.filter((stepId) => stepId !== id));
      } else {
        setCompletedSteps([...completedSteps, id]);
      }
    }
  };
  
  // Handle 911 call with confirmation
  const handleCall911 = () => {
    setShowCallConfirmation(true);
  };

  const confirmCall911 = () => {
    window.location.href = "tel:911";
    setShowCallConfirmation(false);
  };
  
  // Generate report
  const handleGenerateReport = () => {
    setShowReport(true);
  };
  
  // Cleanup speech synthesis and recognition when component unmounts
  /*useEffect(() => {
    return () => {
      if (stopListeningFn) {
        stopListeningFn();
      }
      window.speechSynthesis?.cancel();
    };
  }, [stopListeningFn]);
*/
  useEffect(() => {
  if (voiceEnabled && currentVoiceStep < instructions.length) {
    speak(instructions[currentVoiceStep].text, () => {
      setCurrentVoiceStep((prev) => prev + 1);
    });
  }

  // Optional: Stop voice mode at the end
  if (currentVoiceStep >= instructions.length) {
    setVoiceEnabled(false);
  }
}, [currentVoiceStep, voiceEnabled, instructions]);

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
                {voiceEnabled ? <Headphones className="mr-2" /> : <Headphones className="mr-2" />}
                {voiceEnabled ? "Audio Help On" : "Audio Help"}
                {isListening && (
                  <span className="absolute -right-2 -top-2">
                    <Mic className="h-4 w-4 text-green-500 animate-pulse" />
                  </span>
                )}
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
                  !voiceEnabled && completedSteps.includes(instruction.id) ? "bg-primary/5" : "hover:bg-accent",
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
          
          {voiceEnabled && isListening && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-sm">Listening... Say "Ready" or "Next" when you're ready for the next step.</p>
            </div>
          )}
          
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

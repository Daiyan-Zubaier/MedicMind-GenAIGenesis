
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight, Phone, Check, Headphones, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { speak } from '@/lib/speechUtils';
import { toast } from 'sonner';
import Call911Confirmation from './Call911Confirmation';
import EmergencyReport from './EmergencyReport';

const FirstAidInstructions = ({
  instructions,
  emergency,
  isUrgent,
}) => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [currentVoiceStep, setCurrentVoiceStep] = useState(0);
  const [showCallConfirmation, setShowCallConfirmation] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Toggle voice instructions – in this version it reads automatically through all steps
  const toggleVoice = () => {
    if (!voiceEnabled) {
      // Enable voice mode and reset progress
      setVoiceEnabled(true);
      setCurrentVoiceStep(0);
      setCompletedSteps([]);

      // Speak an introduction, then automatically start reading the steps
      const introText = `First aid instructions for ${emergency}. I'll guide you step by step.`;
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

  // Handle manual toggling of a step when voice is disabled
  const toggleStep = (id) => {
    if (voiceEnabled) {
      // In voice mode, tapping a step does nothing
      return;
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
                    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border text-center",
                    voiceEnabled && currentVoiceStep === instruction.id 
                      ? "bg-primary border-primary text-primary-foreground"
                      : !voiceEnabled && completedSteps.includes(instruction.id) 
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
                    !voiceEnabled && completedSteps.includes(instruction.id) && "text-muted-foreground"
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

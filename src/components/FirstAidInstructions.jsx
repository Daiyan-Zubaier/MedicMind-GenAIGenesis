
import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Call911Confirmation from './Call911Confirmation';
import EmergencyReport from './EmergencyReport';
import StepList from './first-aid/StepList';
import VoiceController from './first-aid/VoiceController';
import EmergencyHeader from './first-aid/EmergencyHeader';

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
        <EmergencyHeader 
          isUrgent={isUrgent} 
          emergency={emergency} 
          onCall911={handleCall911} 
        />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">First Aid for: {emergency}</h2>
              <p className="text-sm text-muted-foreground">Follow these steps carefully</p>
            </div>
            <div className="flex space-x-2">
              <VoiceController 
                voiceEnabled={voiceEnabled}
                setVoiceEnabled={setVoiceEnabled}
                setCurrentVoiceStep={setCurrentVoiceStep}
                setCompletedSteps={setCompletedSteps}
                instructions={instructions}
                handleGenerateReport={handleGenerateReport}
              />
            </div>
          </div>

          <StepList 
            instructions={instructions}
            voiceEnabled={voiceEnabled}
            currentVoiceStep={currentVoiceStep}
            completedSteps={completedSteps}
            onToggleStep={toggleStep}
          />

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

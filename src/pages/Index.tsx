import React, { useState } from 'react';
import Header from '@/components/Header';
import EmergencyInput from '@/components/EmergencyInput';
import FirstAidInstructions from '@/components/FirstAidInstructions';
import EmergencyCard from '@/components/EmergencyCard';
import { commonEmergencies, getMatchingEmergency, EmergencyType } from '@/lib/firstAidData';
import { analyzeEmergency, getFallbackInstructions } from '@/lib/emergencyUtils';
import { Instruction } from '@/components/FirstAidInstructions';

const Index = () => {
  const [query, setQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentEmergency, setCurrentEmergency] = useState<EmergencyType | null>(null);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const handleEmergencySubmit = (input: string) => {
    setQuery(input);
    processEmergency(input);
  };

  const handleEmergencyCardClick = (emergency: EmergencyType) => {
    setQuery(emergency.title);
    setCurrentEmergency(emergency);
    setInstructions(emergency.instructions);
    setIsUrgent(emergency.isUrgent);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const processEmergency = (input: string) => {
    setIsProcessing(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const emergency = getMatchingEmergency(input);
      const { isUrgent: urgent } = analyzeEmergency(input);
      
      if (emergency) {
        setCurrentEmergency(emergency);
        setInstructions(emergency.instructions);
        setIsUrgent(emergency.isUrgent || urgent);
      } else {
        setCurrentEmergency(null);
        getFallbackInstructions(input)
          .then((output_) => {
            setInstructions([{ id: 10000, text: output_ }]);
          })
          .catch((err) => {
            console.error(err);
            setInstructions([{ id: 10000, text: 'Sorry, I couldn\'t find any instructions for that emergency.' }]);
          });
        setIsUrgent(urgent);
      }
      
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto pb-20">
        <Header />
        
        <main className="mt-6">
          <EmergencyInput onSubmit={handleEmergencySubmit} isProcessing={isProcessing} />
          
          {(instructions.length > 0 && query) && (
            <FirstAidInstructions 
              instructions={instructions} 
              emergency={currentEmergency ? currentEmergency.title : query}
              isUrgent={isUrgent}
            />
          )}
          
          {!query && (
            <div className="w-full max-w-5xl mx-auto mt-12 px-4">
              <div className="text-center mb-8 animate-slide-up">
                <h2 className="text-2xl font-medium mb-2">Common Emergencies</h2>
                <p className="text-muted-foreground">Select one or describe your emergency situation above</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
                {commonEmergencies.map((emergency) => (
                  <EmergencyCard
                    key={emergency.id}
                    title={emergency.title}
                    description={emergency.description}
                    icon={emergency.icon}
                    onClick={() => handleEmergencyCardClick(emergency)}
                  />
                ))}
              </div>
              
              <div className="mt-12 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '300ms' }}>
                <p className="max-w-2xl mx-auto">
                  <strong>Disclaimer:</strong> This app provides general first aid guidance based on common practices. 
                  It is not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of qualified medical professionals for serious injuries or emergencies.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
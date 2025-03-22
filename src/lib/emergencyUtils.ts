
import { toast } from "sonner";

export const analyzeEmergency = (query: string): { isUrgent: boolean; callEmergency: boolean } => {
  const normalizedQuery = query.toLowerCase();
  
  const urgentKeywords = [
    'unconscious', 'not breathing', 'heart attack', 'stroke', 'seizure',
    'severe bleeding', 'choking', 'drowning', 'electric shock', 'poisoning',
    'suicide', 'overdose', 'gunshot', 'stab', 'anaphylaxis', 'allergic reaction',
    'can\'t breathe', 'stopped breathing', 'no pulse', 'dying', 'collapsed',
    'cardiac arrest', 'heart stopped', 'not responding', 'unresponsive'
  ];

  const callEmergencyServices = urgentKeywords.some(keyword => 
    normalizedQuery.includes(keyword)
  );
  
  // If it's an urgent situation that requires immediate emergency services
  if (callEmergencyServices) {
    toast("EMERGENCY SITUATION DETECTED", {
      description: "Please call emergency services (911) immediately while following first aid steps.",
      duration: 10000
    });
    
    return { isUrgent: true, callEmergency: true };
  }
  
  // Check if it's urgent but might not necessarily need immediate 911
  const potentiallyUrgentKeywords = [
    'pain', 'severe', 'blood', 'injured', 'accident', 'fell', 'hit', 'cut',
    'burn', 'broken', 'fracture', 'head', 'spine', 'back', 'neck'
  ];
  
  const isPotentiallyUrgent = potentiallyUrgentKeywords.some(keyword => 
    normalizedQuery.includes(keyword)
  );
  
  return { isUrgent: isPotentiallyUrgent, callEmergency: false };
};

export const getFallbackInstructions = () => {
  return [
    { 
      id: 1, 
      text: 'Check if the person is responsive by tapping them and asking if they\'re okay.' 
    },
    { 
      id: 2, 
      text: 'Ensure the scene is safe for both you and the person before approaching.' 
    },
    { 
      id: 3, 
      text: 'Call for emergency services (911) if the situation appears serious or you\'re unsure.' 
    },
    { 
      id: 4, 
      text: 'Check their airway, breathing, and circulation if they are unresponsive.' 
    },
    { 
      id: 5, 
      text: 'If trained, provide appropriate first aid according to the situation.' 
    },
    { 
      id: 6, 
      text: 'Stay with the person and monitor their condition until help arrives.' 
    }
  ];
};


import { toast } from "sonner"

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
    'burn', 'broken', 'fracture', 'head', 's  pine', 'back', 'neck'
  ];
  
  const isPotentiallyUrgent = potentiallyUrgentKeywords.some(keyword => 
    normalizedQuery.includes(keyword)
  );
  
  return { isUrgent: isPotentiallyUrgent, callEmergency: false };
};

export const getFallbackInstructions = async(prompt:string): Promise<string> => {
  const response = await fetch("http://localhost:8080/", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`API call failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.response;
};

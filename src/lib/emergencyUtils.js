import { toast } from "sonner";
import { OpenAI } from "openai";

export const analyzeEmergency = (query) => {
  const normalizedQuery = query.toLowerCase();
  
  const urgentKeywords = [
    'unconscious', 'not breathing', 'heart attack', 'stroke', 'seizure',
    'severe bleeding', 'choking', 'drowning', 'electric shock', 'poisoning',
    'suicide', 'overdose', 'gunshot', 'stab', 'anaphylaxis', 'allergic reaction',
    "can't breathe", 'stopped breathing', 'no pulse', 'dying', 'collapsed',
    'cardiac arrest', 'heart stopped', 'not responding', 'unresponsive'
  ];

  const callEmergencyServices = urgentKeywords.some(keyword => 
    normalizedQuery.includes(keyword)
  );
  
  if (callEmergencyServices) {
    toast("EMERGENCY SITUATION DETECTED", {
      description: "Please call emergency services (911) immediately while following first aid steps.",
      duration: 10000
    });
    
    return { isUrgent: true, callEmergency: true };
  }
  
  const potentiallyUrgentKeywords = [
    'pain', 'severe', 'blood', 'injured', 'accident', 'fell', 'hit', 'cut',
    'burn', 'broken', 'fracture', 'head', 'spine', 'back', 'neck'
  ];
  
  const isPotentiallyUrgent = potentiallyUrgentKeywords.some(keyword => 
    normalizedQuery.includes(keyword)
  );
  
  return { isUrgent: isPotentiallyUrgent, callEmergency: false };
};

export const getFallbackInstructions = async (prompt) => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // WARNING: Exposing your API key in the browser is not recommended in production!
  });

  const openaiPrompt = `You are an AI first aid assistant. Provide clear, step-by-step first aid instructions for the following situation:
  
"${prompt}"

Important guidelines:
1. If this is a life-threatening emergency, start your response with "CALL 911 IMMEDIATELY."
2. Provide concise, actionable steps in a numbered list.
3. Use simple, clear language that anyone can follow in an emergency.
4. If more information is needed to provide proper guidance, ask specific follow-up questions.
5. Include when to seek professional medical help.
6. Make the response conversational and reassuring.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // fallback to "gpt-3.5-turbo" if needed
      messages: [
        { role: "system", content: "You are a first aid expert providing emergency medical guidance." },
        { role: "user", content: openaiPrompt }
      ],
      temperature: 0.3,
    });

    const instructionsText = response.choices[0].message.content.trim();
    const instructionsArray = instructionsText.split('\n').filter(line => line.trim() !== '');

    return instructionsArray.map((instruction, index) => ({ id: index + 1, text: instruction }));
  } catch (error) {
    throw new Error(`Failed to generate instructions: ${error.message}`);
  }
};
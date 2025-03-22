
export const commonEmergencies = [
  {
    id: 'choking',
    title: 'Choking',
    description: 'Heimlich maneuver and other techniques to help someone who is choking.',
    icon: 'heartPulse',
    isUrgent: true,
    instructions: [
      { 
        id: 1, 
        text: 'Encourage the person to cough forcefully if they can. If they can\'t speak, cough, or breathe, proceed to the next steps immediately.' 
      },
      { 
        id: 2, 
        text: 'Stand behind the person. Wrap your arms around their waist.',
        imageUrl: 'https://www.redcross.org/content/dam/redcross/uncategorized/6/Choking_Adult_1.jpg'
      },
      { 
        id: 3, 
        text: 'Make a fist with one hand and position it above the person\'s navel (belly button) and below the breastbone.' 
      },
      { 
        id: 4, 
        text: 'Grab your fist with your other hand. Press into the abdomen with quick, upward thrusts.',
        imageUrl: 'https://www.redcross.org/content/dam/redcross/uncategorized/6/Choking_Adult_2.jpg'
      },
      { 
        id: 5, 
        text: 'Repeat thrusts until the object is expelled or the person becomes unconscious.' 
      },
      { 
        id: 6, 
        text: 'If the person becomes unconscious, call 911 immediately and begin CPR if trained.',
        isUrgent: true 
      }
    ]
  },
  {
    id: 'bleeding',
    title: 'Severe Bleeding',
    description: 'How to control bleeding and prevent shock in emergency situations.',
    icon: 'bandage',
    isUrgent: true,
    instructions: [
      { 
        id: 1, 
        text: 'Call 911 immediately for severe, uncontrolled bleeding.',
        isUrgent: true 
      },
      { 
        id: 2, 
        text: 'Apply direct pressure to the wound using a clean cloth, bandage, or your hand if nothing else is available.',
        imageUrl: 'https://www.redcross.org/content/dam/redcrossblood/rcb/donate-blood/blood-services-bleeding-control-apply-direct-pressure.jpg'
      },
      { 
        id: 3, 
        text: 'If possible, raise the injured area above the level of the heart to slow bleeding.' 
      },
      { 
        id: 4, 
        text: 'Apply pressure continuously for at least 15 minutes. Do not remove the cloth if it becomes soaked with blood - add another cloth on top.' 
      },
      { 
        id: 5, 
        text: 'If bleeding continues and you have access to a tourniquet, apply it following the instructions. Only use as a last resort for life-threatening limb bleeding.',
        imageUrl: 'https://www.redcross.org/content/dam/redcrossblood/rcb/donate-blood/blood-services-bleeding-control-tourniquet.jpg'
      },
      { 
        id: 6, 
        text: 'Keep the person warm and calm while waiting for emergency services.' 
      }
    ]
  },
  {
    id: 'heartAttack',
    title: 'Heart Attack',
    description: 'Recognize the signs of a heart attack and take immediate action.',
    icon: 'heart',
    isUrgent: true,
    instructions: [
      { 
        id: 1, 
        text: 'Call 911 immediately - do not delay.',
        isUrgent: true 
      },
      { 
        id: 2, 
        text: 'Help the person sit or lie down in a comfortable position, with head and shoulders elevated.' 
      },
      { 
        id: 3, 
        text: 'If the person is not allergic to aspirin and if advised by emergency services, give them a 325 mg aspirin to chew (not swallow whole).' 
      },
      { 
        id: 4, 
        text: 'Loosen any tight clothing, especially around the chest or neck.' 
      },
      { 
        id: 5, 
        text: 'Stay with the person and monitor their condition until emergency services arrive.' 
      },
      { 
        id: 6, 
        text: 'Be prepared to perform CPR if the person becomes unconscious and is not breathing normally.',
        imageUrl: 'https://www.redcross.org/content/dam/redcross/uncategorized/6/cpr-adult.jpg'
      }
    ]
  },
  {
    id: 'burns',
    title: 'Burns',
    description: 'First aid for different types and severities of burns.',
    icon: 'thermometer',
    isUrgent: false,
    instructions: [
      { 
        id: 1, 
        text: 'Ensure the burning has stopped and remove the person from the source of the burn.' 
      },
      { 
        id: 2, 
        text: 'For minor burns, cool the burn with cool (not cold) running water for 10-15 minutes.',
        imageUrl: 'https://www.redcross.org/content/dam/redcrossblood/rcb/donate-blood/burn-minor-treatment.jpg'
      },
      { 
        id: 3, 
        text: 'Do not use ice, as this can cause further damage to the tissue.' 
      },
      { 
        id: 4, 
        text: 'Remove any jewelry or tight items from the burned area before swelling occurs.' 
      },
      { 
        id: 5, 
        text: 'Cover the burn with a sterile, non-stick bandage or clean cloth.' 
      },
      { 
        id: 6, 
        text: 'For severe burns (charred, white, or deep), call 911 immediately. Do not immerse large severe burns in water, and do not remove burnt clothing stuck to the skin.',
        isUrgent: true 
      }
    ]
  },
  {
    id: 'stroke',
    title: 'Stroke',
    description: 'How to recognize and respond to a possible stroke using the FAST method.',
    icon: 'heartPulse',
    isUrgent: true,
    instructions: [
      { 
        id: 1, 
        text: 'Remember the FAST acronym to check for signs of stroke:', 
      },
      { 
        id: 2, 
        text: 'F - Face: Ask the person to smile. Does one side of the face droop?',
        imageUrl: 'https://www.redcross.org/content/dam/redcrossblood/rcb/donate-blood/stroke-fast-face.jpg'
      },
      { 
        id: 3, 
        text: 'A - Arms: Ask the person to raise both arms. Does one arm drift downward?',
        imageUrl: 'https://www.redcross.org/content/dam/redcrossblood/rcb/donate-blood/stroke-fast-arms.jpg'
      },
      { 
        id: 4, 
        text: 'S - Speech: Ask the person to repeat a simple phrase. Is their speech slurred or strange?' 
      },
      { 
        id: 5, 
        text: 'T - Time: If you observe any of these signs, call 911 immediately. Note the time when symptoms first appeared.',
        isUrgent: true 
      },
      { 
        id: 6, 
        text: 'While waiting for emergency services: Keep the person still and calm. Do not give them medication, food, or drinks. If the person is unconscious, lay them on their side with their head slightly raised and supported.' 
      }
    ]
  },
  {
    id: 'poisoning',
    title: 'Poisoning',
    description: 'What to do if someone has swallowed, inhaled, or touched a poisonous substance.',
    icon: 'pill',
    isUrgent: true,
    instructions: [
      { 
        id: 1, 
        text: 'Call poison control center (1-800-222-1222) or 911 immediately.',
        isUrgent: true 
      },
      { 
        id: 2, 
        text: 'Try to identify what poison was involved and how much was taken. Keep the container or any remains of the substance if possible.' 
      },
      { 
        id: 3, 
        text: 'Do not try to induce vomiting or give any fluids unless directed to do so by poison control or emergency personnel.' 
      },
      { 
        id: 4, 
        text: 'For poison on the skin: Remove contaminated clothing and rinse skin with running water for 15-20 minutes.' 
      },
      { 
        id: 5, 
        text: 'For poison in the eye: Gently flush the eye with lukewarm water for 15-20 minutes.' 
      },
      { 
        id: 6, 
        text: 'For inhaled poison: Get the person to fresh air immediately.' 
      }
    ]
  }
];

export const getMatchingEmergency = (query) => {
  const normalizedQuery = query.toLowerCase();
  
  // Look for exact matches first
  for (const emergency of commonEmergencies) {
    if (emergency.id.toLowerCase() === normalizedQuery || 
        emergency.title.toLowerCase() === normalizedQuery) {
      return emergency;
    }
  }
  
  // Look for partial matches
  for (const emergency of commonEmergencies) {
    if (emergency.id.toLowerCase().includes(normalizedQuery) || 
        emergency.title.toLowerCase().includes(normalizedQuery) ||
        emergency.description.toLowerCase().includes(normalizedQuery)) {
      return emergency;
    }
  }
  
  // Look for keyword matches
  const keywords = {
    'chok': 'choking',
    'heimlich': 'choking',
    'obstructed airway': 'choking',
    'can\'t breathe': 'choking',
    'bleed': 'bleeding',
    'blood': 'bleeding',
    'cut': 'bleeding',
    'wound': 'bleeding',
    'heart attack': 'heartAttack',
    'chest pain': 'heartAttack',
    'cardiac': 'heartAttack',
    'burn': 'burns',
    'scald': 'burns',
    'fire': 'burns',
    'stroke': 'stroke',
    'face drooping': 'stroke',
    'poison': 'poisoning',
    'swallow': 'poisoning',
    'toxic': 'poisoning',
    'ingest': 'poisoning'
  };
  
  for (const [keyword, emergencyId] of Object.entries(keywords)) {
    if (normalizedQuery.includes(keyword)) {
      return commonEmergencies.find(emergency => emergency.id === emergencyId);
    }
  }
  
  return undefined;
};

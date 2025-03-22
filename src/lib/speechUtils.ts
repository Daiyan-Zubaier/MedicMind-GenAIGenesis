
// Speech synthesis and recognition utilities

// Speech synthesis
export const speak = (text: string, callback?: () => void): void => {
  if (!window.speechSynthesis) {
    console.error('Speech synthesis not supported');
    if (callback) callback();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Adjust voice settings
  utterance.rate = 0.9; // Slightly slower for better comprehension
  utterance.pitch = 1;
  
  // Get available voices and try to select an English voice
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(voice => 
    voice.lang.startsWith('en-') && voice.name.includes('Female')
  );
  
  if (englishVoice) {
    utterance.voice = englishVoice;
  }
  
  // Event for when speech has finished
  utterance.onend = () => {
    if (callback) callback();
  };
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    if (callback) callback();
  };
  
  window.speechSynthesis.speak(utterance);
};

// Speech recognition initialization
let recognition: SpeechRecognition | null = null;

export const initSpeechRecognition = (): SpeechRecognition | null => {
  if (recognition) return recognition;
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.error('Speech recognition not supported');
    return null;
  }
  
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  return recognition;
};

export const listenForReady = (
  onReady: () => void,
  onError?: () => void
): (() => void) => {
  const recognition = initSpeechRecognition();
  
  if (!recognition) {
    if (onError) onError();
    return () => {};
  }
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    if (transcript.includes('ready') || 
        transcript.includes('next') || 
        transcript.includes('continue') ||
        transcript.includes('yes')) {
      onReady();
    } else {
      // If user said something else, start listening again
      setTimeout(() => recognition.start(), 1000);
    }
  };
  
  recognition.onerror = () => {
    if (onError) onError();
  };
  
  recognition.start();
  
  // Return a function to stop listening
  return () => {
    recognition.stop();
  };
};

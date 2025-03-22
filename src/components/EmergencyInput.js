
import React, { useEffect, useRef, useState } from 'react';
import { SearchCheck, Loader2, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { startVoiceToText } from '@/lib/speechUtils';
import { toast } from 'sonner';

const EmergencyInput = ({ onSubmit, isProcessing }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);
  const stopListeningRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    return () => {
      if (stopListeningRef.current) {
        stopListeningRef.current();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      if (stopListeningRef.current) {
        stopListeningRef.current();
        stopListeningRef.current = null;
      }
      setIsListening(false);
      toast.info("Voice input stopped");
      return;
    }

    setIsListening(true);
    toast.info("Listening for voice input...");
    
    stopListeningRef.current = startVoiceToText(
      (transcript) => {
        setInput(prev => prev ? `${prev} ${transcript}` : transcript);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-2 px-4 animate-fade-in">
      <div className="glass-panel rounded-xl p-4 sm:p-6">
        <p className="text-center mb-4 text-sm text-muted-foreground">
          Describe the emergency situation (e.g., "Someone is choking")
        </p>
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's the emergency?"
            className={cn(
              "glass-input w-full py-3 px-4 pr-24 rounded-lg text-base placeholder:text-muted-foreground/70",
              isProcessing && "opacity-80"
            )}
            disabled={isProcessing}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <button
              type="button"
              onClick={toggleVoiceInput}
              disabled={isProcessing}
              className={cn(
                "p-1.5 rounded-full transition-colors",
                isListening ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10",
                isProcessing && "opacity-50"
              )}
              aria-label="Voice input"
            >
              <Mic className={cn("h-5 w-5", isListening && "animate-pulse")} />
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="p-1 text-primary disabled:text-muted-foreground/50 transition-colors"
              aria-label="Search"
            >
              {isProcessing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <SearchCheck className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmergencyInput;

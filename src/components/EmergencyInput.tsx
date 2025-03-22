
import React, { useEffect, useRef, useState } from 'react';
import { SearchCheck, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmergencyInputProps {
  onSubmit: (input: string) => void;
  isProcessing: boolean;
}

const EmergencyInput: React.FC<EmergencyInputProps> = ({ onSubmit, isProcessing }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSubmit(input.trim());
      setInput('');
    }
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
              "glass-input w-full py-3 px-4 pr-12 rounded-lg text-base placeholder:text-muted-foreground/70",
              isProcessing && "opacity-80"
            )}
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-primary disabled:text-muted-foreground/50 transition-colors"
            aria-label="Search"
          >
            {isProcessing ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SearchCheck className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmergencyInput;

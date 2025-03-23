
import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 animate-slide-down">
      <div className="max-w-5xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Heart className="h-6 w-6 text-emergency" />
          <h1 className="text-2xl font-light tracking-tight">
            <span className="font-semibold">MedicMind</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

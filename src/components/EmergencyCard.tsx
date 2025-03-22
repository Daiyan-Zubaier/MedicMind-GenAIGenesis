
import React from 'react';
import { cn } from '@/lib/utils';
import { HeartPulse, Bandage, Pill, Thermometer, Heart } from 'lucide-react';

interface EmergencyCardProps {
  title: string;
  description: string;
  icon: 'heartPulse' | 'bandage' | 'pill' | 'thermometer' | 'heart';
  onClick: () => void;
  className?: string;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({
  title,
  description,
  icon,
  onClick,
  className,
}) => {
  const icons = {
    heartPulse: <HeartPulse className="h-6 w-6" />,
    bandage: <Bandage className="h-6 w-6" />,
    pill: <Pill className="h-6 w-6" />,
    thermometer: <Thermometer className="h-6 w-6" />,
    heart: <Heart className="h-6 w-6" />,
  };

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-5 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col",
        className
      )}
      onClick={onClick}
    >
      <div className="bg-primary/10 rounded-lg p-2.5 w-fit mb-4">
        {icons[icon]}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground flex-grow">{description}</p>
    </div>
  );
};

export default EmergencyCard;

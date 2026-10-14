import React from 'react';
import {
  Wrench,
  Zap,
  Sparkles,
  Car,
  Compass,
  Laptop,
  HeartPulse,
  Hammer,
  ShieldCheck,
  Paintbrush,
  Scissors,
  HelpCircle,
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  iconName?: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, iconName, className = 'w-6 h-6' }) => {
  const norm = (name || '').toLowerCase();
  const iconStr = (iconName || '').toLowerCase();

  if (norm.includes('plumb') || iconStr.includes('faucet') || iconStr.includes('wrench')) {
    return <Wrench className={className} />;
  }
  if (norm.includes('electr') || iconStr.includes('bolt') || iconStr.includes('zap')) {
    return <Zap className={className} />;
  }
  if (norm.includes('clean') || iconStr.includes('broom') || iconStr.includes('sparkle')) {
    return <Sparkles className={className} />;
  }
  if (norm.includes('mechanic') || norm.includes('vehicle') || iconStr.includes('tools')) {
    return <Car className={className} />;
  }
  if (norm.includes('driver') || iconStr.includes('car') || iconStr.includes('compass')) {
    return <Compass className={className} />;
  }
  if (norm.includes('tech') || iconStr.includes('laptop') || norm.includes('computer')) {
    return <Laptop className={className} />;
  }
  if (norm.includes('doctor') || norm.includes('health') || iconStr.includes('user-md') || iconStr.includes('heart')) {
    return <HeartPulse className={className} />;
  }
  if (norm.includes('paint')) {
    return <Paintbrush className={className} />;
  }
  if (norm.includes('salon') || norm.includes('beauty')) {
    return <Scissors className={className} />;
  }
  if (norm.includes('carpenter')) {
    return <Hammer className={className} />;
  }
  return <HelpCircle className={className} />;
};

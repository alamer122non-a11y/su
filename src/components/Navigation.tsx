import React from 'react';
import { Home, Sparkles, Wallet, User, Mail } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

export function Navigation({ currentScreen, setCurrentScreen }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'الرئيسية' },
    { id: 'aimirror', icon: Sparkles, label: 'مرآتي' },
    { id: 'wallet', icon: Wallet, label: 'المحفظة' },
    { id: 'gmail', icon: Mail, label: 'البريد' },
    { id: 'profile', icon: User, label: 'حسابي' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-[#4A2511] text-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-around items-center">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button 
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex flex-col items-center p-2 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-gray-300 hover:text-white'}`}
            >
              <Icon size={24} className={isActive ? 'mb-1' : 'mb-1 opacity-80'} />
              <span className="text-[10px] md:text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

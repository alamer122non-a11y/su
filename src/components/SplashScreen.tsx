import React from 'react';

interface SplashScreenProps {
  onNext: () => void;
  onAdminClick: () => void;
}

export function SplashScreen({ onNext, onAdminClick }: SplashScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FAF8F5]">
      <div className="text-center mb-10 flex flex-col items-center">
        <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-[#D4AF37] mb-6 bg-[#4A2511] flex items-center justify-center">
          <img 
            src="/src/assets/images/su_salon_logo_1781811749743.jpg" 
            alt="SU SALON LOGO" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-4.5xl font-serif text-[#4A2511] font-bold tracking-widest">SU SALON</h1>
        <p className="text-[#D4AF37] text-sm tracking-widest mt-2 font-medium">الأناقة والرفاهية لجمالك</p>
      </div>
      <button 
        onClick={onNext}
        className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#4A2511] font-bold py-3 px-12 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      >
        ابدأ التجربة الملكية
      </button>
      <button 
        onClick={onAdminClick}
        className="absolute bottom-8 text-gray-400 hover:text-[#4A2511] text-sm underline cursor-pointer transition-colors"
      >
        لوحة الإدارة
      </button>
    </div>
  );
}

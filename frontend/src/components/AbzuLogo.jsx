// AbzuLogo.jsx - الشعار الرسمي التفاعلي الحي لمنصة ABZU
import React from 'react';

export default function AbzuLogo({ isProcessing = false }) {
  return (
    <div className="relative flex items-center justify-center select-none group cursor-pointer">
      <div className={`absolute w-20 h-20 rounded-full blur-xl transition-all duration-700 ${
        isProcessing ? 'bg-[#004BFF]/30 scale-125' : 'bg-[#D4AF37]/10 group-hover:bg-[#004BFF]/20 group-hover:scale-110'
      }`} />
      <div className={`w-16 h-16 border flex items-center justify-center transition-all duration-700 rounded-none relative z-10 ${
        isProcessing ? 'border-[#004BFF] shadow-[0_0_15px_rgba(0,75,255,0.4)]' : 'border-[#D4AF37]/30 group-hover:border-[#004BFF]'
      }`}>
        <svg className={`w-8 h-8 transition-all duration-700 fill-current ${
          isProcessing ? 'text-[#004BFF] scale-105' : 'text-[#D4AF37] group-hover:text-white animate-spin-slow'
        }`} viewBox="0 0 24 24">
          <path d="M12 2l10 18h-20l10-18z"/>
        </svg>
      </div>
    </div>
  );
}

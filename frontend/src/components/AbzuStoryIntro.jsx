// AbzuStoryIntro.jsx - قصة التشويق السينمائي المصلحة والكاملة لمنصة ABZU
import React, { useState, useEffect } from "react";
import AbzuLogo from "./AbzuLogo";
import playAbzuSound from "./AbzuAudioEngine.js"; // ✅ استدعاء مباشر ومصلح من نفس مجلد المكونات

export default function AbzuStoryIntro({ onStoryComplete }) {
  const [storyStage, setStoryStage] = useState(0);

  useEffect(() => {
    // المحطة 1: نبض الحياة والاتصال ببحر المعرفة
    const t1 = setTimeout(() => {
      setStoryStage(1);
      playAbzuSound('intro-pulse', 0.4); // إطلاق صوت النبض الجهير للكون السومري
    }, 1200);

    // المحطة 2: نقش النص الترحيبي الليزري الفاخر
    const t2 = setTimeout(() => setStoryStage(2), 3200);

    // المحطة 3: اكتمال القصة، انقشاع الضباب وفتح مساحة العمل
    const t3 = setTimeout(() => {
      setStoryStage(3);
      playAbzuSound('seal-secure', 0.5); // إطلاق صوت نقرة الحجر والختم المشفر
      if (onStoryComplete) onStoryComplete(); // فك قفل الموقع والدخول
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onStoryComplete]);

  if (storyStage === 3) return null; // اختفاء الشاشة تماماً بعد انتهاء السيناريو

  return (
    <div className="fixed inset-0 bg-[#12161A] z-50 flex flex-col items-center justify-center select-none overflow-hidden text-center px-4 transition-opacity duration-1000">
      
      {/* تموجات هالة أبزو الضوئية الحية المتنفسة في الأعماق */}
      <div className={`absolute w-[450px] h-[450px] rounded-full bg-[#004BFF]/5 blur-[120px] transition-all duration-1000 transform scale-150 ${
        storyStage >= 1 ? 'opacity-100 animate-pulse' : 'opacity-0'
      }`} />

      {/* المحتوى البصري والقصصي الموحد */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl">
        
        {/* استدعاء الشعار التفاعلي الحي */}
        <AbzuLogo isProcessing={storyStage === 1} />

        {/* مسار النقش النصي التفاعلي للقصة */}
        <div className="h-16 flex items-center justify-center">
          {storyStage === 1 && (
            <p className="text-white/30 text-xs font-mono tracking-[0.3em] uppercase animate-pulse">
              [ CONNECTING_TO_ABZU_CORE ]
            </p>
          )}
          {storyStage === 2 && (
            <h2 className="text-[#D4AF37] text-lg md:text-xl font-medium tracking-wide leading-relaxed animate-fade-in" style={{ direction: 'rtl' }}>
              نظام <span className="font-bold text-white tracking-widest">ABZU</span> يستشعر حضورك المعرفي... <br />
              <span className="text-white/60 text-sm font-light mt-1 block">جاري فتح بوابات بحر الحكمة الرقمي الأول.</span>
            </h2>
          )}
        </div>

      </div>

      {/* لمسة تاريخية في أسفل شاشة التشويق */}
      <div className="absolute bottom-8 font-mono text-[9px] text-white/10 tracking-[0.4em] uppercase">
        ABZU_SYSTEM_INITIALIZE // AUDIO_ON
      </div>

    </div>
  );
}

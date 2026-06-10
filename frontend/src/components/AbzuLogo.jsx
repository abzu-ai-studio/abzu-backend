// AbzuLogo.jsx - الشعار المسماري الحي والتموج المائي السيبراني لمنصة ABZU
import React, { useEffect, useRef } from 'react';

export default function AbzuLogo({ isProcessing = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    canvas.width = 200;
    canvas.height = 200;

    let angle = 0;
    // محاكاة فيزياء التموج المائي وبحر الحكمة السومري الرقمي حياً على الشاشة
    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // رسم الهالة الضوئية الزرقاء المتنفسة
      ctx.beginPath();
      ctx.arc(100, 100, 70, 0, Math.PI * 2);
      ctx.fillStyle = isProcessing ? 'rgba(0, 75, 255, 0.08)' : 'rgba(0, 75, 255, 0.03)';
      ctx.fill();

      // رسم خطوط التموج المائي الدائرية المحيطة بالشعار المسماري
      ctx.strokeStyle = '#004BFF';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = isProcessing ? 0.8 : 0.2;
      
      ctx.beginPath();
      for (let i = 0; i < 360; i += 5) {
        const rad = (i * Math.PI) / 180;
        // معادلة التموج السائل الحركي الخارق لمنع التجميد البصري
        const waveOffset = Math.sin(rad * 6 + angle) * (isProcessing ? 6 : 2);
        const r = 70 + waveOffset;
        const x = 100 + Math.cos(rad) * r;
        const y = 100 + Math.sin(rad) * r;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      angle += isProcessing ? 0.08 : 0.02;
      animationFrameId = requestAnimationFrame(drawWave);
    };

    drawWave();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isProcessing]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      
      {/* الـ Canvas المائي التفاعلي الحي خلف الشعار */}
      <canvas ref={canvasRef} className="absolute w-[200px] h-[200px] z-0" />

      {/* الختم المسماري السومري الصلب لـ ABZU في المنتصف بزاوية حادة */}
      <div className={`relative z-10 w-24 h-24 bg-[#12161A] border border-[#D4AF37]/40 flex items-center justify-center transition-all duration-700 ${
        isProcessing ? 'shadow-[0_0_40px_rgba(0,75,255,0.4)] border-[#004BFF] scale-105' : 'shadow-xl'
      }`} style={{ transform: 'rotate(45deg)' }}>
        
        {/* تعديل زاوية النص ليبقى مستقيماً ومقروءاً داخل المعين الهندسي */}
        <div style={{ transform: 'rotate(-45deg)' }} className="flex flex-col items-center justify-center text-center">
          <span className="text-white font-serif font-bold text-2xl tracking-widest block leading-none">A</span>
          <span className="text-[#D4AF37] font-mono text-[9px] tracking-[0.2em] uppercase mt-1">CORE</span>
        </div>

      </div>
    </div>
  );
}

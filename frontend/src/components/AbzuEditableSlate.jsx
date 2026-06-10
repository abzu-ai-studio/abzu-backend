// AbzuEditableSlate.jsx - لوح المخرجات الحي القابل للتعديل البرمجي المباشر
import React, { useState, useEffect } from 'react';
import playAbzuSound from './AbzuAudioEngine.js';

export default function AbzuEditableSlate({ initialContent, onCodeUpdate }) {
  const [codeContent, setCodeContent] = useState(initialContent);

  // تحديث المحتوى تلقائياً عندما يرسل السيرفر إجابة جديدة
  useEffect(() => {
    setCodeContent(initialContent);
  }, [initialContent]);

  const handleCodeChange = (e) => {
    setCodeContent(e.target.value);
    // إطلاق صوت نقش ناعم جداً عند تعديل المطور للكود بيده لتعزيز التفاعل الحي
    playAbzuSound('laser-type', 0.05); 
  };

  const handleApplyFix = () => {
    playAbzuSound('seal-secure', 0.4); // صوت نقرة الختم عند اعتماد التعديل البشري
    if (onCodeUpdate) {
      onLayerChange(codeContent);
    }
    alert("🤖 [نظام ABZU للتعلم الذاتي]: تم استيعاب تعديلك البشري وجاري تلقيم النواة البرمجية بها.");
  };

  return (
    <div className="abzu-live-slate animate-fade-in">
      
      {/* البار العلوي التفاعلي للوح البازلت */}
      <div className="slate-header-action">
        <button 
          onClick={handleApplyFix}
          style={{ background: 'transparent', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)', padding: '6px 12px', fontSize: '12px' }}
        >
          اعتماد وحقن التعديل ⚡
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#34D399', fontSize: '11px', fontFamily: 'monospace' }}>[بروتوكول الختم الأسطواني آمن]</span>
          <span style={{ color: '#D4AF37', fontSize: '12px', fontWeight: 'bold' }}>ABZU_LIVE_EDITOR</span>
        </div>
      </div>

      {/* مساحة التعديل والكتابة البرمجية المباشرة (Editable Textarea) */}
      <textarea
        value={codeContent}
        onChange={handleCodeChange}
        className="slate-code-area"
        placeholder="// جاري نقش مخرجات الذكاء الاصطناعي هنا..."
      />

    </div>
  );
}

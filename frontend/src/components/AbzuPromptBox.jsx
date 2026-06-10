// AbzuPromptBox.jsx - النسخة النهائية المنسقة والمصلحة لصندوق الأوامر
import React, { useState } from 'react';
import playAbzuSound from './AbzuAudioEngine.js';

export default function AbzuPromptBox({ onSendPrompt, isLoading = false }) {
  const [isFocused, setIsFocused] = useState(false);
  const [promptText, setPromptText] = useState('');

  const handleInputChange = (e) => {
    setPromptText(e.target.value);
    if (e.target.value.length > promptText.length) {
      playAbzuSound('laser-type', 0.08); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executeAction();
    }
  };

  const executeAction = () => {
    if (!promptText.trim() || isLoading) return;
    playAbzuSound('seal-secure', 0.4); 
    if (onSendPrompt) onSendPrompt(promptText);
    setPromptText(''); 
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'white', border: isFocused ? '1px solid #004BFF' : '1px solid rgba(18, 22, 26, 0.1)', boxShadow: isFocused ? '0 0 20px rgba(0,75,255,0.1)' : 'none', transition: 'all 0.3s' }}>
      
      <textarea
        value={promptText}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyPress}
        disabled={isLoading}
        placeholder="انقش أمرك المعرفي هنا في أعماق أبزو (اضغط Enter للإرسال)..."
        style={{ width: '100%', border: 'none', outline: 'none', padding: '16px', fontSize: '15px', boxSizing: 'border-box', background: 'transparent', resize: 'none', height: '80px', textAlign: 'right' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', backgroundColor: 'rgba(250, 246, 240, 0.5)', borderTop: '1px solid rgba(18, 22, 26, 0.05)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'rgba(18,12,26,0.4)', fontFamily: 'monospace' }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: isFocused || isLoading ? '#004BFF' : '#cbd5e1', borderRadius: '50%', display: 'inline-block' }}></span>
          <span>CYLINDER_SEAL_ENCRYPTION_SAFE</span>
        </div>

        <button
          onClick={executeAction}
          disabled={!promptText.trim() || isLoading}
          style={{ background: promptText.trim() && !isLoading ? '#12161A' : '#e2e8f0', color: promptText.trim() && !isLoading ? '#D4AF37' : '#94a3b8', border: 'none', padding: '8px 18px', fontWeight: 'bold', cursor: promptText.trim() && !isLoading ? 'pointer' : 'not-allowed', transition: 'all 0.3s' }}
        >
          إرسال النقش 🏛️
        </button>

      </div>
    </div>
  );
}

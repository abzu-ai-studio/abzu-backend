import React, { useState } from 'react';
import AbzuStoryIntro from './components/AbzuStoryIntro';
import AbzuSidebar from './components/AbzuSidebar';
import AbzuPromptBox from './components/AbzuPromptBox';
import AbzuEditableSlate from './components/AbzuEditableSlate'; // استدعاء المحرر المدمج الجديد

export default function App() {
  const [isStoryFinished, setIsStoryFinished] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(3);

  const handleSendPromptToServer = async (text) => {
    setIsLoading(true);
    setAiResponse('');

    try {
      const response = await fetch('http://localhost:5000/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await response.json();
      if (data.success) {
        setAiResponse(data.response);
      } else {
        setAiResponse(data.error || "فشل بروتوكول النقش المعرفي.");
      }
    } catch (error) {
      setAiResponse("// ⚠️ خطأ: تأكد من تشغيل سيرفر الباك إند الخلفي بنجاح في الترمينال الأول.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF6F0] relative select-none" style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      
      <AbzuStoryIntro onStoryComplete={() => setIsStoryFinished(true)} />

      {isStoryFinished && (
        <div className="abzu-layout-container animate-fade-in">
          
          {/* مساحة العمل والإنتاجية (الجانب الأيمن) */}
          <div className="min-h-screen">
            
            {/* الهيدر العلوي */}
            <div className="border-b">
              <div style={{ fontSize: '11px', color: 'rgba(18,22,26,0.4)', fontFamily: 'monospace' }}>WORKSPACE // CORE_NODE // ONLINE</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(18,22,26,0.8)' }}>
                لوح المعرفة: <span style={{ color: '#004BFF', fontWeight: 'bold' }}>LAYER 0{currentLayer}</span>
              </div>
            </div>

            {/* منطقة تيار المخرجات - استدعاء اللوح المدمج المطور */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto', margin: '10px 0' }}>
              
              {isLoading && (
                <div style={{ textAlign: 'center', color: '#D4AF37', fontFamily: 'monospace', fontSize: '12px' }} className="animate-pulse">
                  [جاري نقش شفرتك على الألواح الرقمية لـ ABZU...]
                </div>
              )}

              {aiResponse && !isLoading && (
                <AbzuEditableSlate 
                  initialContent={aiResponse} 
                  onCodeUpdate={(updatedCode) => console.log("الكود المحدث:", updatedCode)}
                />
              )}

            </div>

            {/* صندوق الأوامر الحي في الأسفل */}
            <AbzuPromptBox onSendPrompt={handleSendPromptToServer} isLoading={isLoading} />

          </div>

          {/* الشريط الجانبي الأرشيفي (الزقورة) مستقر بثبات على اليسار */}
          <AbzuSidebar onLayerChange={(id) => setCurrentLayer(id)} />

        </div>
      )}

    </div>
  );
}

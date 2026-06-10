import React, { useState } from 'react';
import AbzuStoryIntro from './components/AbzuStoryIntro';
import AbzuSidebar from './components/AbzuSidebar';
import AbzuPromptBox from './components/AbzuPromptBox';
import AbzuEditableSlate from './components/AbzuEditableSlate';

export default function App() {
  const [isStoryFinished, setIsStoryFinished] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(3);

  const handleSendPromptToServer = async (text) => {
    if (isLoading) return;
    setIsLoading(true);
    setAiResponse(''); 

    try {
      const response = await fetch('https://onrender.com', {
        method: 'POST',
        mode: 'cors', 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          prompt: text,
          layer: currentLayer 
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAiResponse(data.response); 
      } else {
        setAiResponse(data.error || "فشل بروتوكول النقش المعرفي السحابي.");
      }
    } catch (error) {
      console.error("🔴 خطأ في الاتصال بالخادم السحابي:", error);
      setAiResponse("// ⚠️ خطأ في الاتصال: تعذر الوصول لنواة ABZU أونلاين.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF6F0] relative select-none" style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      
      {/* مقدمة التشويق السينمائي فور الفتح */}
      <AbzuStoryIntro onStoryComplete={() => setIsStoryFinished(true)} />

      {/* مساحة العمل تفتح بثبات بعد انتهاء القصة */}
      {isStoryFinished && (
        <div className="abzu-layout-container animate-fade-in">
          
          <div className="min-h-screen">
            
            <div className="border-b">
              <div style={{ fontSize: '11px', color: 'rgba(18,22,26,0.4)', fontFamily: 'monospace' }}>WORKSPACE // CORE_NODE // LIVE_CLOUD</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(18,22,26,0.8)' }}>
                لوح المعرفة الحالي: <span style={{ color: '#004BFF', fontWeight: 'bold' }}>LAYER 0{currentLayer}</span>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto', margin: '10px 0' }}>
              
              {isLoading && (
                <div style={{ textAlign: 'center', color: '#D4AF37', fontFamily: 'monospace', fontSize: '12px' }} className="animate-pulse">
                  [جاري نقش شفرتك على الألواح الرقمية لـ ABZU أونلاين...]
                </div>
              )}

              {aiResponse && !isLoading && (
                <AbzuEditableSlate 
                  initialContent={aiResponse} 
                  onCodeUpdate={(updatedCode) => console.log("الكود المحدث:", updatedCode)}
                />
              )}

            </div>

            {/* صندوق الأوامر الحصين المستدعى مع حظر التحديث */}
            <AbzuPromptBox onSendPrompt={handleSendPromptToServer} isLoading={isLoading} />

          </div>

          <AbzuSidebar onLayerChange={(id) => setCurrentLayer(id)} />

        </div>
      )}

    </div>
  );
}

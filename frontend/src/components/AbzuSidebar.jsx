// AbzuSidebar.jsx - الشريط الجانبي المحدث بجلب البيانات الحية من السحاب
import React, { useState, useEffect } from 'react';

export default function AbzuSidebar({ onLayerChange }) {
  const [activeLayer, setActiveLayer] = useState(3);
  const [layerHistory, setLayerHistory] = useState([]); // حفظ عناوين الأرشيف السحابي

  const zigguratLayers = [
    { id: 3, name: 'القمة: هندسة الأكواد والتطبيقات', type: 'لوح نشط ومعالج', color: '#D4AF37' },
    { id: 2, name: 'الوسط: معمارية البيانات الضخمة', type: 'مكتمل بنسبة 70%', color: '#004BFF' },
    { id: 1, name: 'القاعدة: الأفكار والبحوث التأسيسية', type: 'مؤرشف ومحمي محلياً', color: '#718096' }
  ];

  // دالة جلب الأرشيف حياً من سيرفر الـ Node.js
  const fetchLayerHistory = async (layerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/history/${layerId}`);
      const data = await response.json();
      if (data.success) {
        setLayerHistory(data.history);
      }
    } catch (error) {
      console.error("🔴 خطأ في جلب الأرشيف:", error);
    }
  };

  // جلب البيانات تلقائياً عند فتح الموقع لأول مرة للطبقة الثالثة
  useEffect(() => {
    fetchLayerHistory(3);
  }, []);

  const handleLayerClick = (id) => {
    setActiveLayer(id);
    fetchLayerHistory(id); // جلب أرشيف الطبقة المضغوطة فوراً
    if (onLayerChange) onLayerChange(id);
  };

  return (
    <div className="abzu-sidebar">
      <div className="flex flex-col gap-6" style={{ width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>NODE // SECURE</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', fontFamily: 'serif' }}>ABZU</span>
            <div style={{ width: '10px', height: '10px', backgroundColor: '#004BFF', borderRadius: '50%' }}></div>
          </div>
        </div>

        <button style={{ width: '100%', padding: '12px', background: 'transparent', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}>
          + لوح معرفي جديد
        </button>

        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', textAlign: 'right' }}>
            الأرشيف المعرفي (الهيكل الصاعد)
          </label>
          
          {/* طبقات الزقورة */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {zigguratLayers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => handleLayerClick(layer.id)}
                className={`ziggurat-layer-item ${activeLayer === layer.id ? 'active' : ''}`}
                style={{ marginRight: `${(3 - layer.id) * 10}px` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', opacity: 0.3 }}>LAYER 0{layer.id}</span>
                  <span style={{ fontWeight: '500', fontSize: '13px' }}>{layer.name}</span>
                </div>
                
                {/* عرض المحادثات القديمة الخاصة بهذه الطبقة من السحاب مباشرة داخل الزقورة */}
                {activeLayer === layer.id && layerHistory.length > 0 && (
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px', borderRight: '1px dashed rgba(212,175,55,0.3)', paddingRight: '6px' }}>
                    {layerHistory.map((chat) => (
                      <div key={chat._id} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                        📜 {chat.userPrompt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
          <span>v1.0.0</span>
          <span>CYLINDER_SEAL</span>
        </div>
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.02)', padding: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', color: '#D4AF37', fontSize: '10px', fontFamily: 'monospace' }}>
          CORE_WORKSPACE_CONNECTED
        </div>
      </div>

    </div>
  );
}

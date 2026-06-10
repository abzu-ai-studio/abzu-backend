// AbzuAudioEngine.js - محرك الهندسة الصوتية التفاعلية المصلح لمنصة ABZU

const playAbzuSound = (soundName, volume = 0.4) => {
  if (typeof window === 'undefined') return;
  
  try {
    // الروابط الطويلة والكاملة المباشرة لملفات الصوت لكي يقرأها المتصفح فوراً وبدون كراش
    const audioUrls = {
      'intro-pulse': 'https://soundjay.com',   // صوت نبض جهير عميق
      'laser-type': 'https://soundjay.com',    // صوت نقش ليزري ناعم خفيف
      'seal-secure': 'https://soundjay.com'    // صوت نقرة حجرية صلبة وفخمة
    };

    const audio = new Audio(audioUrls[soundName]);
    audio.volume = volume;
    
    audio.play().catch((err) => {
      console.log(`[نظام صوت ABZU]: تم كتم الصوت مؤقتاً حتى يضغط المستخدم على الشاشة.`, err);
    });
  } catch (error) {
    console.error("🔴 خطأ في محرك الأصوات لـ ABZU:", error);
  }
};

export default playAbzuSound;

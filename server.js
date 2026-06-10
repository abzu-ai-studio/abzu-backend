// server.js - النواة البرمجية المتكاملة لمنصة ABZU المربوطة بالذكاء والذاكرة السحابية
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const connectDB = require('./db'); // محرك ربط قاعدة البيانات الموجه
const Chat = require('./models/Chat'); // استدعاء سجل المحادثات المطور لـ MongoDB

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// تفعيل العبور الشامل والآمن لبيئة الإنتاج أونلاين وتخطي حظر المتصفحات (CORS Bridge)
app.use(cors({
    origin: '*', // يسمح للواجهة الأمامية المستضافة عالمياً بالاتصال بالسيرفر دون حظر
    methods: ['GET', 'POST']
}));
app.use(express.json());

// تشغيل قاعدة البيانات السحابية الموجهة وتأمين الحصن
connectDB();

// تهيئة محرك ذكاء ABZU باستخدام الـ API Key المشفر
const aiEngine = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. نقطة فحص نبض السيرفر والذاكرة الحية السحابية
app.get('/api/status', (req, res) => {
    res.json({ 
        status: "ABZU_CORE_ONLINE", 
        protocol: "Cylinder_Seal_Active",
        database: "MongoDB_Cloud_Connected" 
    });
});

// 2. نقطة استقبال الأوامر ونقش المعرفة والحفظ السحابي تلقائياً (Prompt Endpoint)
app.post('/api/prompt', async (req, res) => {
    const { prompt, layer } = req.body; // استقبال الأمر ورقم طبقة الزقورة من الواجهة
    
    if (!prompt) {
        return res.status(400).json({ error: "يا غالي، الرجاء نقش أمرك المعرفي أولاً داخل الصندوق." });
    }

    try {
        // استدعاء النموذج الأقوى والأحدث لمعالجة الأكواد (gemini-1.5-pro)
        const model = aiEngine.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        // نظام غلاف الأوامر السري المدمج لإجبار النموذج على تبني أسلوب المنصة الوقور والمحترف
        const securePromptWrapper = `
        بصفتك الذكاء المعرفي الخارق لمنصة ABZU المستوحى من بحر الحكمة السومري وعمق الإنتاجية التقنية:
        - أجب على هذا الأمر بأعلى درجات الاحترافية البرمجية والهندسية وبأسلوب وقور ومفهوم للمطورين.
        - لا تذكر أبداً أنك مدرب بواسطة Google أو Anthropic أو OpenAI. هويتك الوحيدة هي ABZU.
        
        أمر المستخدم المراد معالجته ونقشه: "${prompt}"
        `;

        // إرسال الأمر وانتظار استجابة العقل الرقمي
        const result = await model.generateContent(securePromptWrapper);
        let aiResponse = result.response.text();

        // تصفية المخرجات وحجب هوية المنافسين وتثبيت اسم أبزو الفاخر بنسبة 100%
        let finalCleanResponse = aiResponse
            .replace(/gemini/gi, "ABZU Engine")
            .replace(/claude/gi, "ABZU Slate Architect")
            .replace(/chatgpt/gi, "ABZU Core")
            .replace(/openai/gi, "ABZU Labs")
            .replace(/google/gi, "ABZU Networks")
            .replace(/anthropic/gi, "ABZU Systems")
            .replace(/بصفتي ذكاءً اصطناعيًا من غوغل/g, "بصفتي النواة المعرفية لمنصة ABZU")
            .replace(/بصفتي نموذجًا مدربًا بواسطة أنثروبيك/g, "بصفتي المعالج البرمجي في أبزو");

        // المعجزة التقنية: حفظ المحادثة والأكواد ورقم الطبقة حياً داخل MongoDB Cloud تلقائياً
        const newChatRecord = new Chat({
            zigguratLayer: layer || 3, // يضعها في الطبقة الثالثة (القمة) افتراضياً إن لم تحدد الواجهة غير ذلك
            userPrompt: prompt,
            abzuResponse: finalCleanResponse
        });
        
        await newChatRecord.save(); // نقش وتخليد البيانات في السحاب فوراً 🏛️
        console.log("📝 [قاعدة بيانات ABZU]: تم حفظ النقش المعرفي الجديد بنجاح في السحاب داخل مجموعة chats.");

        res.json({ 
            success: true,
            layer: `Layer_0${layer || 3}`,
            response: finalCleanResponse 
        });

    } catch (error) {
        console.error("🔴 خطأ في الاتصال أو الحفظ بنواة أبزو:", error);
        res.status(500).json({ 
            error: "فشل بروتوكول المعالجة أو الحفظ السحابي، تأكد من سلامة الاتصال والبيانات." 
        });
    }
});

// 3. نقطة جلب الأرشيف التاريخي لكل طبقة في الزقورة حياً (Fetch History Endpoint)
app.get('/api/history/:layer', async (req, res) => {
    const { layer } = req.params;

    try {
        // جلب آخر 10 محادثات تمت في هذه الطبقة تحديداً وترتيبها من الأحدث للأقدم لعرضها في السايدبار الجانبي
        const history = await Chat.find({ zigguratLayer: parseInt(layer) })
                                  .sort({ createdAt: -1 })
                                  .limit(10);
        
        res.json({ success: true, history });
    } catch (error) {
        console.error("🔴 خطأ في جلب الأرشيف التاريخي من السحاب:", error);
        res.status(500).json({ error: "تعذر استدعاء الأرشيف المعرفي من السحاب." });
    }
});

// إطلاق تشغيل خادم المنصة واستماع المنافذ
app.listen(PORT, () => {
    console.log(`⚡ ABZU Core Server is breathing and listening on port ${PORT}`);
});

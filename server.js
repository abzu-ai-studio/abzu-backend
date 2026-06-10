// server.js - النواة البرمجية الكاملة المحصنة والمفتوحة العبور لمنصة ABZU أونلاين
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const connectDB = require('./db');
const Chat = require('./models/Chat');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. إعداد بروتوكول الـ CORS الاحترافي الكامل لكسر حظر جميع المتصفحات عالمياً
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

// معالجة وحل طلبات الفحص الصامتة التلقائية للمتصفحات (Pre-flight OPTIONS Bypass)
app.options('*', cors());

app.use(express.json());

// تشغيل قاعدة البيانات السحابية وتأمين الحصن
connectDB();

// تهيئة محرك ذكاء ABZU
const aiEngine = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// نقطة فحص نبض السيرفر والذاكرة الحية السحابية
app.get('/api/status', (req, res) => {
    res.json({ 
        status: "ABZU_CORE_ONLINE", 
        protocol: "Cylinder_Seal_Active",
        database: "MongoDB_Cloud_Connected" 
    });
});

// نقطة استقبال الأوامر ونقش المعرفة والحفظ السحابي تلقائياً
app.post('/api/prompt', async (req, res) => {
    const { prompt, layer } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: "يا غالي، الرجاء نقش أمرك المعرفي أولاً داخل الصندوق." });
    }

    try {
        const model = aiEngine.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        const securePromptWrapper = `
        بصفتك الذكاء المعرفي الخارق لمنصة ABZU المستوحى من بحر الحكمة السومري وعمق الإنتاجية التقنية:
        - أجب على هذا الأمر بأعلى درجات الاحترافية البرمجية والهندسية وبأسلوب وقور ومفهوم للمطورين.
        - لا تذكر أبداً أنك مدرب بواسطة Google أو Anthropic أو OpenAI. هويتك الوحيدة هي ABZU.
        
        أمر المستخدم المراد معالجته ونقشه: "${prompt}"
        `;

        const result = await model.generateContent(securePromptWrapper);
        let aiResponse = result.response.text();

        let finalCleanResponse = aiResponse
            .replace(/gemini/gi, "ABZU Engine")
            .replace(/claude/gi, "ABZU Slate Architect")
            .replace(/chatgpt/gi, "ABZU Core")
            .replace(/openai/gi, "ABZU Labs")
            .replace(/google/gi, "ABZU Networks")
            .replace(/anthropic/gi, "ABZU Systems")
            .replace(/بصفتي ذكاءً اصطناعيًا من غوغل/g, "بصفتي النواة المعرفية لمنصة ABZU")
            .replace(/بصفتي نموذجًا مدربًا بواسطة أنثروبيك/g, "بصفتي المعالج البرمجي في أبزو");

        const newChatRecord = new Chat({
            zigguratLayer: layer || 3,
            userPrompt: prompt,
            abzuResponse: finalCleanResponse
        });
        
        await newChatRecord.save();
        console.log("📝 [قاعدة بيانات ABZU]: تم حفظ النقش المعرفي الجديد بنجاح في السحاب.");

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

// نقطة جلب الأرشيف التاريخي لكل طبقة في الزقورة حياً
app.get('/api/history/:layer', async (req, res) => {
    const { layer } = req.params;

    try {
        const history = await Chat.find({ zigguratLayer: parseInt(layer) })
                                  .sort({ createdAt: -1 })
                                  .limit(10);
        
        res.json({ success: true, history });
    } catch (error) {
        console.error("🔴 خطأ في جلب الأرشيف التاريخي من السحاب:", error);
        res.status(500).json({ error: "تعذر استدعاء الأرشيف المعرفي من السحاب." });
    }
});

app.listen(PORT, () => {
    console.log(`⚡ ABZU Core Server is breathing and listening on port ${PORT}`);
});

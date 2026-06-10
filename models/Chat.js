// models/Chat.js - سجل وهيكلية تخزين المحادثات والأكواد في قاعدة بيانات ABZU
const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    // تتبع طبقة المعرفة والإنتاجية التابعة للزقورة (Layer 1, 2, or 3)
    zigguratLayer: {
        type: Number,
        default: 3,
        enum: [1, 2, 3] 
    },
    // نقش وأمر المستخدم الأصلي (The User Prompt)
    userPrompt: {
        type: String,
        required: true,
        trim: true
    },
    // المخرجات والحلول البرمجية الفاخرة الناتجة من العقل الخارق مصفاة ومطهرة
    abzuResponse: {
        type: String,
        required: true
    },
    // ميزة فريدة لتتبع ما إذا قام المستخدم بتعديل الكود يدوياً داخل الألواح الحية لاحقاً
    isEditedByUser: {
        type: Boolean,
        default: false
    },
    customerFixedCode: {
        type: String,
        default: ""
    },
    // التوقيت الزمني الدقيق لنقش المعرفة
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// تصدير الموديل ليكون جاهزاً للاستدعاء داخل السيرفر الرئيسي
module.exports = mongoose.model('Chat', ChatSchema);

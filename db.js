// db.js - محرك الذاكرة الموجه والكامل لمنصة ABZU
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // إعدادات إجبارية لتوجيه التخزين داخل قاعدة بيانات مخصصة باسم abzu بدلاً من test
        const connectionOptions = {
            dbName: 'abzu' // ✅ هنا نثبت اسم قاعدة البيانات الفاخر للمنصة
        };

        await mongoose.connect(process.env.MONGO_URI, connectionOptions);
        
        console.log("🏛️ [قاعدة بيانات ABZU]: تم الاتصال بنجاح بـ MongoDB Cloud Cluster.");
        console.log("📜 [بروتوكول الختم الأسطواني]: الذاكرة الموجهة والأرشيف الصاعد نشط الآن.");
    } catch (error) {
        console.error("🔴 فشل الاتصال بقاعدة بيانات أبزو المعرفية:");
        console.error(`🔒 السبب التقني: ${error.message}`);
    }
};

module.exports = connectDB;

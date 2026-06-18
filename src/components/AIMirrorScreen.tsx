import React from 'react';
import { Sparkles, Camera, Upload, Search } from 'lucide-react';

export function AIMirrorScreen() {
  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5]">
      <div className="bg-gradient-to-b from-[#D4AF37] to-[#B89020] text-white p-8 rounded-b-[40px] shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2 md:text-4xl">
          مرآتي <Sparkles size={28} />
        </h2>
        <p className="text-white/90 text-sm md:text-base">مساعدك الذكي لاختيار الإطلالة المناسبة لك</p>
      </div>

      <div className="p-6 -mt-6 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <h3 className="font-bold text-[#4A2511] mb-6 flex items-center gap-2 border-b pb-3">
              <Search size={20} className="text-[#D4AF37]" />
              أخبرنا عنك
            </h3>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">اختر الجنس</label>
                <select className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors text-sm">
                  <option>ذكر</option>
                  <option>أنثى</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">شكل الوجه</label>
                <select className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors text-sm">
                  <option>بيضاوي</option>
                  <option>دائري</option>
                  <option>مربع</option>
                  <option>طويل</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">لون البشرة</label>
                <select className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors text-sm">
                  <option>حنطي</option>
                  <option>أسمر</option>
                  <option>فاتح</option>
                  <option>داكن</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-500 mb-2 text-center">أو استخدم صورتك للتحليل الذكي</label>
              <div className="flex gap-3">
                <button className="flex-1 bg-[#4A2511] text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#3A1D0D] transition-colors">
                  <Camera size={18} /> التقاط
                </button>
                <button className="flex-1 bg-[#D4AF37] text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#B89020] transition-colors">
                  <Upload size={18} /> رفع صورة
                </button>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-[#4A2511] to-[#2A1509] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow">
              <Sparkles size={20} className="text-[#D4AF37]" />
              اقترح لي الإطلالة
            </button>
          </div>

          {/* Mock Results */}
          <div className="lg:mt-0 mt-8">
            <h3 className="font-bold text-[#4A2511] mb-4 flex items-center gap-2 md:text-xl">
              <Sparkles size={20} className="text-[#D4AF37]" />
              اقتراحات الذكاء الاصطناعي
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border-r-4 border-[#D4AF37] shadow-sm">
                <p className="text-sm text-gray-500 mb-2">قصات مناسبة</p>
                <p className="font-bold text-[#4A2511] text-lg">كلاسيك - تدريج جانبي - طبيعي</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border-r-4 border-[#D4AF37] shadow-sm">
                <p className="text-sm text-gray-500 mb-2">ألوان مقترحة</p>
                <p className="font-bold text-[#4A2511] text-lg">بني دافئ - ذهبي - أسود ناعم</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

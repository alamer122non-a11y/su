import React from 'react';
import { CreditCard, History, Star } from 'lucide-react';

export function WalletScreen() {
  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5]">
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#4A2511] mb-6 text-center md:text-3xl">محفظة الخبير</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-gradient-to-br from-[#4A2511] to-[#2A1509] rounded-3xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <p className="text-sm text-gray-300 mb-2 relative z-10">الرصيد الحالي</p>
              <div className="flex items-end gap-2 mb-6 relative z-10">
                <h3 className="text-5xl font-bold text-[#D4AF37]">7,420</h3>
                <span className="text-xl mb-1 text-[#D4AF37]">نقطة</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4 mt-2 relative z-10">
                <span className="opacity-80">ID: 88540</span>
                <span className="font-medium">أحمد محمد</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-[#4A2511] mb-1">245</div>
                <div className="text-xs text-gray-500">إجمالي الحجوزات</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-[#4A2511] mb-1 flex items-center justify-center gap-1">
                  <Star size={18} className="text-[#D4AF37]" fill="#D4AF37" /> 4.9
                </div>
                <div className="text-xs text-gray-500">التقييم العام</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#4A2511] mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-[#D4AF37]" />
              شحن رصيد (حصرياً عبر كاشي)
            </h3>
            
            <div className="bg-[#F0FDF4] border border-[#16A34A]/20 p-5 rounded-2xl mb-8">
              <div className="flex items-center gap-2 mb-4 text-[#16A34A] font-bold">
                <div className="w-6 h-6 bg-[#16A34A] rounded flex items-center justify-center text-white text-xs">C</div>
                تطبيق كاشي - Cashi
              </div>
              <select className="w-full p-3 rounded-xl border border-gray-200 mb-4 bg-white focus:outline-none focus:border-[#16A34A] text-sm">
                <option>1000 نقطة — 5,000 ج.س</option>
                <option>2000 نقطة — 10,000 ج.س</option>
                <option>5000 نقطة — 25,000 ج.س</option>
              </select>
              <button className="w-full bg-[#16A34A] text-white font-bold py-3 rounded-xl shadow-md hover:bg-[#15803d] transition-colors">
                ادفع بواسطة Cashi
              </button>
            </div>

            <h3 className="font-bold text-[#4A2511] mb-4 flex items-center gap-2">
              <History size={20} className="text-[#D4AF37]" />
              آخر العمليات المالية
            </h3>
            
            <div className="space-y-3">
              {[
                { title: 'شحن 3000 نقطة', desc: 'بواسطة بطاقة بنكية • 25 / 01 / 2026', type: 'add' },
                { title: 'تفعيل حملة ترويجية', desc: 'خصم 500 نقطة لتصدر البحث • 20 / 01 / 2026', type: 'sub' }
              ].map((tx, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">{tx.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-1">{tx.desc}</p>
                  </div>
                  <div className={`font-bold text-lg ${tx.type === 'add' ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.type === 'add' ? '+' : '-'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

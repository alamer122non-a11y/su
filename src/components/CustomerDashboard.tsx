import React from 'react';
import { MapPin, Star, Search } from 'lucide-react';

export function CustomerDashboard() {
  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5]">
      <div className="bg-[#4A2511] text-white p-6 rounded-b-[40px] shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" alt="User" className="w-14 h-14 rounded-full border-2 border-[#D4AF37] object-cover" />
              <div>
                <h2 className="font-bold text-lg md:text-xl">الزبون: سارة محمد</h2>
                <p className="text-sm text-gray-300 flex items-center gap-1"><MapPin size={14}/> الخرطوم - حي العمارات</p>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full overflow-hidden border border-[#D4AF37] shadow-lg bg-[#4A2511]">
              <img 
                src="/src/assets/images/su_salon_logo_1781811749743.jpg" 
                alt="SU SALON LOGO" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="relative max-w-2xl">
            <input 
              type="text" 
              placeholder="ابحث عن خبير أو خدمة..." 
              className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-10 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 transition-colors"
            />
            <Search className="absolute right-4 top-3.5 text-white/60" size={18} />
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <h3 className="font-bold text-[#4A2511] mb-4 flex items-center gap-2 md:text-xl">
          <Star className="text-[#D4AF37]" fill="#D4AF37" size={20} />
          الخبراء المتاحون الآن
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'أحمد محمد', role: 'خبير تدريج وشعر', rating: 4.9, dist: '0.5 كم', img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=150&h=150&fit=crop' },
            { name: 'خالد حسن', role: 'أخصائي لحية وشارب', rating: 4.7, dist: '1.2 كم', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
            { name: 'مريم عبدالله', role: 'خبيرة تجميل وعناية', rating: 5.0, dist: '2.0 كم', img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=150&h=150&fit=crop' },
            { name: 'سارة علي', role: 'خبيرة مكياج', rating: 4.8, dist: '2.5 كم', img: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=150&h=150&fit=crop' }
          ].map((expert, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
              <img src={expert.img} alt={expert.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-[#4A2511]">{expert.name}</h4>
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">يبعد {expert.dist}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{expert.role}</p>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                  <Star size={14} className="text-[#D4AF37]" fill="#D4AF37" />
                  {expert.rating}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-[#4A2511] mt-8 mb-4 md:text-xl">خدمات التجميل المتاحة</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { title: 'حلاقة وتصفيف', price: '4,500 ج.س', img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=300&fit=crop' },
            { title: 'تحديد ذقن', price: '2,500 ج.س', img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=300&fit=crop' },
            { title: 'مكياج سهرة', price: '15,000 ج.س', img: 'https://images.unsplash.com/photo-1516975080661-46bce0a40346?w=300&h=300&fit=crop' },
            { title: 'تنظيف بشرة', price: '8,000 ج.س', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop' },
            { title: 'صبغة شعر', price: '12,000 ج.س', img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=300&h=300&fit=crop' },
            { title: 'عناية بالأظافر', price: '5,000 ج.س', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=300&h=300&fit=crop' }
          ].map((service, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <img src={service.img} alt={service.title} className="w-full h-32 md:h-40 object-cover" />
              <div className="p-3 text-center">
                <h4 className="font-bold text-sm md:text-base text-[#4A2511] mb-1">{service.title}</h4>
                <p className="text-xs md:text-sm font-bold text-[#D4AF37]">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

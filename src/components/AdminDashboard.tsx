import React, { useState } from 'react';
import { Users, Scissors, Wallet, TrendingUp, ArrowRight, Activity, Percent, ShieldCheck, Search, CornerDownLeft } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'experts' | 'transactions'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Retrieve signed up users to extract experts dynamically
  const dbUsers = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('su_salon_users') || '[]');
    } catch (e) {
      return [];
    }
  }, []);

  const dbExperts = React.useMemo(() => {
    return dbUsers
      .filter((u: any) => u.role === 'expert')
      .map((u: any) => ({
        name: u.name,
        specialty: u.specialty || 'تجميل ومكياج',
        status: u.status || 'نشط',
        joins: u.joins || 'يونيو 2026',
        totalBookings: u.totalBookings || 0,
        revenue: u.revenue || '0 ج.س'
      }));
  }, [dbUsers]);

  // Mock list of experts for admin view combined with registered ones
  const baseExpertsList = [
    { name: 'أحمد محمد', specialty: 'حلاقة وتصفيف شعر', status: 'نشط', joins: 'يناير 2026', totalBookings: 84, revenue: '420,000 ج.س' },
    { name: 'مريم عبدالله', specialty: 'تجميل ومكياج', status: 'نشط', joins: 'فبراير 2026', totalBookings: 42, revenue: '210,000 ج.س' },
    { name: 'خالد حسن', specialty: 'حلاقة وتصفيف شعر', status: 'غير نشط', joins: 'فبراير 2026', totalBookings: 18, revenue: '90,000 ج.س' },
    { name: 'سارة علي', specialty: 'عناية بالبشرة', status: 'نشط', joins: 'مارس 2026', totalBookings: 10, revenue: '50,000 ج.س' }
  ];

  const expertsList = React.useMemo(() => {
    return [...baseExpertsList, ...dbExperts];
  }, [dbExperts]);

  // Mock statistics dynamically sized
  const stats = React.useMemo(() => ({
    totalVisitors: 1420,
    totalExperts: 38 + dbExperts.length,
    totalTransactions: 154 + dbExperts.length * 2,
    totalRevenues: '770,000 ج.س'
  }), [dbExperts]);

  // Specialty Breakdown dynamically updated
  const specialties = React.useMemo(() => {
    const baseSpecialties = [
      { name: 'حلاقة وتصفيف شعر', count: 18 },
      { name: 'تجميل ومكياج', count: 10 },
      { name: 'عناية بالبشرة', count: 6 },
      { name: 'باديكير وعناية بالأظافر', count: 4 },
      { name: 'تجهيز عرسان متكامل', count: 0 }
    ];

    dbExperts.forEach((ex: any) => {
      const spec = baseSpecialties.find(s => s.name === ex.specialty);
      if (spec) {
        spec.count += 1;
      } else {
        baseSpecialties.push({ name: ex.specialty, count: 1 });
      }
    });

    const totalExpCount = baseSpecialties.reduce((sum, s) => sum + s.count, 0);
    const colorsList = ['bg-amber-600', 'bg-amber-500', 'bg-yellow-500', 'bg-yellow-600', 'bg-amber-700', 'bg-orange-600'];
    
    return baseSpecialties
      .filter(s => s.count > 0)
      .map((spec, i) => ({
        name: spec.name,
        count: spec.count,
        percentage: totalExpCount > 0 ? Math.round((spec.count / totalExpCount) * 100) : 0,
        color: colorsList[i % colorsList.length]
      }));
  }, [dbExperts]);

  // Mock Transactions list
  const transactionsList = [
    { id: '#TX-1054', expert: 'أحمد محمد', amount: '5,000 ج.س', points: '1000 نقطة', gateway: 'Cashi', time: 'منذ ١٠ دقائق', status: 'مكتمل' },
    { id: '#TX-1053', expert: 'مريم عبدالله', amount: '10,000 ج.س', points: '2000 نقطة', gateway: 'Cashi', time: 'منذ ٣٠ دقيقة', status: 'مكتمل' },
    { id: '#TX-1052', expert: 'سارة علي', amount: '25,000 ج.س', points: '5000 نقطة', gateway: 'Cashi', time: 'منذ ساعتين', status: 'مكتمل' },
    { id: '#TX-1051', expert: 'خالد حسن', amount: '5,000 ج.س', points: '1000 نقطة', gateway: 'Cashi', time: 'أمس', status: 'معلق' },
    { id: '#TX-1050', expert: 'رنا يوسف', amount: '10,000 ج.س', points: '2000 نقطة', gateway: 'Cashi', time: 'قبل يومين', status: 'مكتمل' }
  ];

  const filteredExperts = expertsList.filter(expert =>
    expert.name.includes(searchTerm) || expert.specialty.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Top Banner */}
      <div className="bg-[#4A2511] text-white p-6 rounded-b-[40px] shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              title="العودة لشاشة البداية"
            >
              <ArrowRight size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37] shadow-md bg-[#4A2511]">
                <img 
                  src="/src/assets/images/su_salon_logo_1781811749743.jpg" 
                  alt="SU SALON LOGO" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  لوحة التحكم الإدارية <ShieldCheck size={22} className="text-[#D4AF37]" />
                </h1>
                <p className="text-xs text-gray-300">نظام إدارة SU SALON الشامل</p>
              </div>
            </div>
          </div>
          <div className="text-left">
            <span className="text-[10px] bg-[#D4AF37] text-[#4A2511] font-bold px-3 py-1 rounded-full uppercase">
              مدير النظام
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold">عدد الزوار</p>
              <h3 className="text-lg md:text-2xl font-bold text-[#4A2511]">{stats.totalVisitors}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Scissors size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold">إجمالي الخبراء</p>
              <h3 className="text-lg md:text-2xl font-bold text-[#4A2511]">{stats.totalExperts}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold">العمليات المنفذة</p>
              <h3 className="text-lg md:text-2xl font-bold text-[#4A2511]">{stats.totalTransactions}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold">إجمالي الإيرادات</p>
              <h3 className="text-base md:text-lg font-bold text-[#4A2511] truncate">{stats.totalRevenues}</h3>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          <button 
            className={`pb-3 px-6 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'border-[#4A2511] text-[#4A2511]' : 'border-transparent text-gray-500 hover:text-[#4A2511]'}`}
            onClick={() => setActiveTab('overview')}
          >
            نظرة عامة ومجالات الخبراء
          </button>
          <button 
            className={`pb-3 px-6 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'experts' ? 'border-[#4A2511] text-[#4A2511]' : 'border-transparent text-gray-500 hover:text-[#4A2511]'}`}
            onClick={() => setActiveTab('experts')}
          >
            إدارة الخبراء ({stats.totalExperts})
          </button>
          <button 
            className={`pb-3 px-6 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'transactions' ? 'border-[#4A2511] text-[#4A2511]' : 'border-transparent text-gray-500 hover:text-[#4A2511]'}`}
            onClick={() => setActiveTab('transactions')}
          >
            العمليات المالية الأخيرة
          </button>
        </div>

        {/* TAB CONTENTS */}

        {/* Tab 1: Overview & Specialties */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Specialty Breakdown chart using styling */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg text-[#4A2511] mb-6 flex items-center gap-2">
                <Scissors size={20} className="text-[#D4AF37]" />
                توزيع الخبراء حسب الاختصاص والمجال
              </h3>
              <div className="space-y-5">
                {specialties.map((spec, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-gray-700">{spec.name}</span>
                      <span className="text-gray-500 font-mono">{spec.count} خبراء ({spec.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${spec.color} rounded-full transition-all duration-1000`} 
                        style={{ width: `${spec.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Insights */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#4A2511] mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-[#D4AF37]" />
                  تحليلات سريعة للمنصة
                </h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="p-4 bg-gray-50 rounded-xl flex items-start gap-3">
                    <div className="p-2 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold leading-none">ملاحظة</div>
                    <p>مجال <strong> حلاقة وتصفيف شعر الرجال </strong> يمثل النسبة الأكبر من الخبراء المسجلين حالياً على التطبيق بنسبة 47%.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl flex items-start gap-3">
                    <div className="p-2 bg-green-100 text-green-800 rounded-lg text-xs font-bold leading-none">مؤشر</div>
                    <p>متوسط العمليات اليومية التي تتم من خلال بوابة <strong>كاشي (Cashi)</strong> ارتفع بنسبة 14% هذا الأسبوع.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-4 flex justify-between items-center text-xs text-gray-400">
                <span>تحديث تلقائي: مباشر</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span> متصل بالنظام</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Expert Management */}
        {activeTab === 'experts' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Search and filter */}
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <input 
                  type="text" 
                  placeholder="ابحث بالحسم أو المجال..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-9 text-sm focus:outline-none focus:border-[#4A2511] transition-colors"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
              </div>
              <div className="text-xs text-gray-400 font-bold self-end sm:self-auto">
                يعرض {filteredExperts.length} من {expertsList.length} خبراء حاليين
              </div>
            </div>

            {/* Desktop Table & Mobile List Responsive View */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className="py-4 px-6">الاسم</th>
                    <th className="py-4 px-6">المجال / التخصص</th>
                    <th className="py-4 px-6 md:table-cell hidden">تاريخ التسجيل</th>
                    <th className="py-4 px-6 text-center">إجمالي الطلبات</th>
                    <th className="py-4 px-6 text-center">الأرباح</th>
                    <th className="py-4 px-6">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredExperts.map((exp, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-800">{exp.name}</td>
                      <td className="py-4 px-6 text-gray-600">{exp.specialty}</td>
                      <td className="py-4 px-6 text-gray-400 md:table-cell hidden">{exp.joins}</td>
                      <td className="py-4 px-6 text-center text-gray-700 font-mono font-bold">{exp.totalBookings}</td>
                      <td className="py-4 px-6 text-center text-green-700 font-bold font-mono">{exp.revenue}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${exp.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {exp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Recent Transactions */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 font-bold text-[#4A2511]">
              سجل الشحن والعمليات الأخيرة عبر كاشي (Cashi) وباقي الوسائل
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className="py-4 px-6">العملية</th>
                    <th className="py-4 px-6">الخبير المستفيد</th>
                    <th className="py-4 px-6">المبلغ الإجمالي</th>
                    <th className="py-4 px-6">المقابل بالنقاء</th>
                    <th className="py-4 px-6">الوسيط المالي</th>
                    <th className="py-4 px-6">التاريخ / الوقت</th>
                    <th className="py-4 px-6">حالة العملية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactionsList.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-mono text-gray-500">{tx.id}</td>
                      <td className="py-4 px-6 font-bold text-gray-800">{tx.expert}</td>
                      <td className="py-4 px-6 text-gray-700 font-bold font-mono">{tx.amount}</td>
                      <td className="py-4 px-6 text-amber-600 font-bold">{tx.points}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 font-bold text-[#16A34A]">
                          <span className="w-5 h-5 bg-[#16A34A] rounded flex items-center justify-center text-white text-[10px]">C</span>
                          {tx.gateway}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400 text-xs">{tx.time}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${tx.status === 'مكتمل' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

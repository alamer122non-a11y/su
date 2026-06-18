import React, { useState, useEffect } from 'react';

export function AuthScreen({ onLogin }: { onLogin: (role: string) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('customer');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('حلاقة وتصفيف شعر');
  const [expertName, setExpertName] = useState('');

  // Seed default admin in localStorage matching the DB-only login requirement
  useEffect(() => {
    try {
      const dbUsers = JSON.parse(localStorage.getItem('su_salon_users') || '[]');
      const hasAdmin = dbUsers.some((u: any) => u.role === 'admin' || u.phoneNumber === '7777777');
      if (!hasAdmin) {
        dbUsers.push({
          name: 'مدير النظام',
          phoneNumber: '7777777',
          password: '7777777',
          role: 'admin',
          joins: 'يونيو 2026',
          totalBookings: 12,
          revenue: '150,000 ج.س',
          status: 'نشط'
        });
        localStorage.setItem('su_salon_users', JSON.stringify(dbUsers));
      }
    } catch (e) {
      console.error('Error seeding users:', e);
    }
  }, []);

  const specialtiesList = [
    'حلاقة وتصفيف شعر',
    'تجميل ومكياج',
    'عناية بالبشرة',
    'باديكير وعناية بالأظافر',
    'تجهيز عرسان متكامل'
  ];

  const handleSubmit = () => {
    if (isLogin) {
      // Look up in localStorage database
      const dbUsers = JSON.parse(localStorage.getItem('su_salon_users') || '[]');
      const foundUser = dbUsers.find((u: any) => u.phoneNumber === phoneNumber);
      
      if (foundUser) {
        if (foundUser.password === password) {
          localStorage.setItem('su_salon_current_user', JSON.stringify({
            ...foundUser,
            avatar: foundUser.avatar || (foundUser.role === 'expert' ? 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=150&h=150&fit=crop' : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'),
            portfolio: foundUser.portfolio || [
              { id: 1, title: 'طقم تصفيف مميز', img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=300&fit=crop' },
              { id: 2, title: 'قصة شعر ناعمة وعصرية', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop' }
            ]
          }));
          onLogin(foundUser.role);
          return;
        } else {
          alert('كلمة المرور غير صحيحة!');
          return;
        }
      }
      
      // Fallback default role login for direct test run
      const fallbackUser = {
        name: role === 'expert' ? 'مريم عبدالله' : 'سارة محمد',
        phoneNumber: phoneNumber || '0912345678',
        role,
        specialty: role === 'expert' ? specialty || 'تجميل ومكياج' : undefined,
        joins: 'يونيو 2026',
        totalBookings: 18,
        revenue: '90,000 ج.س',
        status: 'نشط',
        avatar: role === 'expert' ? 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=150&h=150&fit=crop' : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        portfolio: [
          { id: 1, title: 'طقم تصفيف مميز', img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=300&fit=crop' },
          { id: 2, title: 'قصة شعر ناعمة وعصرية', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop' }
        ]
      };
      localStorage.setItem('su_salon_current_user', JSON.stringify(fallbackUser));
      onLogin(role);
    } else {
      // Signup
      const dbUsers = JSON.parse(localStorage.getItem('su_salon_users') || '[]');
      
      if (dbUsers.some((u: any) => u.phoneNumber === phoneNumber)) {
        alert('رقم الهاتف هذا مسجل بالفعل!');
        return;
      }

      const newUser = {
        name: role === 'expert' ? (expertName || 'خبير جديد') : 'زبون جديد',
        phoneNumber,
        password,
        role,
        specialty: role === 'expert' ? specialty : undefined,
        joins: 'يونيو 2026',
        totalBookings: 0,
        revenue: '0 ج.س',
        status: 'نشط',
        avatar: role === 'expert' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop' : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        portfolio: []
      };

      dbUsers.push(newUser);
      localStorage.setItem('su_salon_users', JSON.stringify(dbUsers));
      localStorage.setItem('su_salon_current_user', JSON.stringify(newUser));

      if (role === 'expert') {
        alert(`تم تسجيلك كخبير بنجاح وحفظ بياناتك في قاعدة البيانات الحيوية!\nالاسم: ${newUser.name}\nالتخصص: ${newUser.specialty}`);
        onLogin('expert');
      } else {
        alert('تم تسجيل حسابك الجديد بنجاح وحفظه في قاعدة البيانات!');
        onLogin('customer');
      }
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col bg-[#FAF8F5] items-center justify-center">
      <div className="w-full max-w-md my-auto">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] mb-3 shadow-md bg-[#4A2511]">
            <img 
              src="/src/assets/images/su_salon_logo_1781811749743.jpg" 
              alt="SU SALON LOGO" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-3.5xl font-serif text-[#4A2511] font-bold">SU SALON</h1>
          <p className="text-xs text-gray-500 mt-1">الأناقة والرفاهية العصرية لجمالك</p>
        </div>

        <div className="flex bg-gray-200 rounded-full mb-8 p-1">
          <button 
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${isLogin ? 'bg-[#4A2511] text-white' : 'text-gray-600'}`}
            onClick={() => setIsLogin(true)}
          >
            دخول
          </button>
          <button 
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${!isLogin ? 'bg-[#4A2511] text-white' : 'text-gray-600'}`}
            onClick={() => setIsLogin(false)}
          >
            تسجيل جديد
          </button>
        </div>

        {!isLogin && (
          <div className="flex gap-4 mb-6">
            <button 
              className={`flex-1 py-3 rounded-lg border-2 font-bold transition-all ${role === 'customer' ? 'border-[#D4AF37] bg-[#FFFDF5] text-[#4A2511]' : 'border-gray-200 text-gray-500'}`}
              onClick={() => setRole('customer')}
            >
              زبون
            </button>
            <button 
              className={`flex-1 py-3 rounded-lg border-2 font-bold transition-all ${role === 'expert' ? 'border-[#D4AF37] bg-[#FFFDF5] text-[#4A2511]' : 'border-gray-200 text-gray-500'}`}
              onClick={() => setRole('expert')}
            >
              خبير تجميل
            </button>
          </div>
        )}

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">الاسم الكامل</label>
              <input 
                type="text" 
                placeholder="أدخل اسمك هنا" 
                value={expertName}
                onChange={(e) => setExpertName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-white transition-colors" 
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">رقم الهاتف</label>
            <input 
              type="tel" 
              placeholder="مثال: 09xxxxxxxx" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-white transition-colors text-right" 
              dir="ltr"
            />
          </div>

          {!isLogin && role === 'expert' && (
            <div className="animate-fadeIn">
              <label className="block text-sm text-[#4A2511] font-bold mb-1">تحديد مجال التخصص أو الخدمة</label>
              <select 
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full p-3 border-2 border-[#D4AF37] rounded-lg focus:outline-none bg-[#FFFDF5] text-[#4A2511] font-bold transition-all"
              >
                {specialtiesList.map((spec, i) => (
                  <option key={i} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">كلمة المرور</label>
            <input 
              type="password" 
              placeholder="********" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-white transition-colors" 
            />
          </div>
          {isLogin && <p className="text-xs text-gray-400 text-right mt-2 cursor-pointer hover:text-[#D4AF37]">نسيت كلمة المرور؟</p>}
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-[#4A2511] text-white font-bold py-4 rounded-lg mt-8 shadow-lg hover:bg-[#3A1D0D] transition-colors cursor-pointer"
        >
          {isLogin ? 'تسجيل الدخول' : 'انضمام للعائلة'}
        </button>
      </div>
    </div>
  );
}

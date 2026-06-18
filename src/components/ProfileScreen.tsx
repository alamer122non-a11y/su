import React, { useState, useEffect } from 'react';
import { Camera, Plus, Trash2, LogOut, User, Image, Award, Check, Edit3, Phone, Briefcase, Sparkles } from 'lucide-react';

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [user, setUser] = useState<any>(null);
  const [newWorkTitle, setNewWorkTitle] = useState('');
  const [newWorkImg, setNewWorkImg] = useState('');
  const [uploadOption, setUploadOption] = useState<'url' | 'preset'>('preset');
  const [selectedPresetImg, setSelectedPresetImg] = useState('');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);

  // Elegant presets of hairstyles & makeup to choose from
  const workPresets = [
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1605497746444-ac9dbd50a959?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516975080661-46bce0a40346?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',
  ];

  // Elegant profile avatar presets
  const avatarPresets = [
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=150&h=150&fit=crop', // Female expert
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', // Young female
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=150&h=150&fit=crop', // Male expert 1
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', // Male expert 2
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', // Customer female
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', // Customer male
  ];

  useEffect(() => {
    // Load current logged-in user from localStorage
    const savedUser = localStorage.getItem('su_salon_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Fallback
      setUser({
        name: 'سارة محمد',
        phoneNumber: '0912345678',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        portfolio: []
      });
    }
  }, []);

  const saveUserAndUpdateDB = (updatedUser: any) => {
    setUser(updatedUser);
    localStorage.setItem('su_salon_current_user', JSON.stringify(updatedUser));

    // Update inside list of all users
    try {
      const dbUsers = JSON.parse(localStorage.getItem('su_salon_users') || '[]');
      const index = dbUsers.findIndex((u: any) => u.phoneNumber === updatedUser.phoneNumber);
      if (index !== -1) {
        dbUsers[index] = { ...dbUsers[index], ...updatedUser };
        localStorage.setItem('su_salon_users', JSON.stringify(dbUsers));
      }
    } catch (e) {
      console.error('Error saving back to dbUsers', e);
    }
  };

  const handleUpdateAvatar = (newAvatar: string) => {
    if (!user) return;
    const updated = { ...user, avatar: newAvatar };
    saveUserAndUpdateDB(updated);
    setShowAvatarModal(false);
  };

  const handleAddWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const imgUrl = uploadOption === 'preset' ? selectedPresetImg : newWorkImg;
    if (!imgUrl || !newWorkTitle) {
      alert('الرجاء إدخال عنوان واختيار أو كتابة رابط الصورة!');
      return;
    }

    const newWorkItem = {
      id: Date.now(),
      title: newWorkTitle,
      img: imgUrl
    };

    const updatedPortfolio = [newWorkItem, ...(user.portfolio || [])];
    const updated = { ...user, portfolio: updatedPortfolio };
    saveUserAndUpdateDB(updated);

    // Reset fields
    setNewWorkTitle('');
    setNewWorkImg('');
    setSelectedPresetImg('');
    setShowAddWorkModal(false);
  };

  const handleDeleteWork = (id: number) => {
    if (!user || !user.portfolio) return;
    if (confirm('هل أنت متأكد من حذف هذه الصورة من قائمة أعمالك؟')) {
      const updatedPortfolio = user.portfolio.filter((item: any) => item.id !== id);
      const updated = { ...user, portfolio: updatedPortfolio };
      saveUserAndUpdateDB(updated);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleUpdateAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewWorkImg(reader.result);
          setUploadOption('url');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isExpert = user.role === 'expert';

  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5]">
      {/* Top Header Background banner */}
      <div className="bg-[#4A2511] text-white p-6 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_top,_var(--tw-gradient-stops)) from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              حسابي والتحكم <Sparkles size={18} className="text-[#D4AF37] animate-pulse" />
            </h1>
            <p className="text-xs text-gray-300">مرحباً بك في عالم الفخامة والجمال</p>
          </div>
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-1 bg-red-600/20 hover:bg-red-600/35 border border-red-500/30 text-red-200 text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer"
          >
            <LogOut size={14} />
            خروج
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto -mt-6">
        {/* Profile Card Info Box */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl flex flex-col md:flex-row items-center md:items-center justify-between gap-6 relative z-20">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-right">
            {/* Circular Avatar Container with Hover trigger */}
            <div className="relative group cursor-pointer" onClick={() => setShowAvatarModal(true)}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl bg-[#FAF8F5]">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-0 right-0 p-1.5 bg-[#4A2511] rounded-full text-white border-2 border-white shadow-md">
                <Camera size={14} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                <h2 className="text-xl font-bold text-[#4A2511]">{user.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${isExpert ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-gray-100 text-gray-700'}`}>
                  {isExpert ? 'خبير تجميل متكامل' : 'عضو عائلة الصالون'}
                </span>
              </div>
              
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex items-center justify-center md:justify-start gap-1">
                  <Phone size={12} className="text-[#D4AF37]" />
                  <span>رقم الهاتف: {user.phoneNumber}</span>
                </div>
                {isExpert && (
                  <div className="flex items-center justify-center md:justify-start gap-1 font-bold text-[#4A2511]">
                    <Briefcase size={12} className="text-[#D4AF37]" />
                    <span>مجال التخصص: {user.specialty || 'خدمات شعر وتجميل متكامل'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick stats for expert */}
          {isExpert && (
            <div className="flex gap-4 border-t md:border-t-0 md:border-r border-gray-100 pt-4 md:pt-0 md:pr-6 w-full md:w-auto justify-around">
              <div className="text-center px-4">
                <span className="block text-xs text-gray-400 font-bold">الطلبات الكلية</span>
                <span className="text-lg font-bold text-[#4A2511] font-mono">{user.totalBookings || 12}</span>
              </div>
              <div className="text-center px-4">
                <span className="block text-xs text-gray-400 font-bold">إجمالي الأرباح</span>
                <span className="text-lg font-bold text-green-700 font-mono">{user.revenue || '60,000 ج.س'}</span>
              </div>
              <div className="text-center px-4">
                <span className="block text-xs text-gray-400 font-bold">تاريخ الانضمام</span>
                <span className="text-sm font-bold text-[#D4AF37]">{user.joins || 'يونيو 2026'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic section: My Work Portfolio (Visible ONLY for expert) */}
        {isExpert ? (
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-[#4A2511] flex items-center gap-1.5">
                  <Image size={20} className="text-[#D4AF37]" />
                  معرض أعمالي للعملاء ({user.portfolio?.length || 0})
                </h3>
                <p className="text-xs text-gray-400">اعرض تصاميمك، تسريحاتك، ومكياجك لتجذب العملاء لحجز خدماتك</p>
              </div>

              <button 
                onClick={() => setShowAddWorkModal(true)}
                className="flex items-center gap-1.5 bg-[#4A2511] text-white hover:bg-[#3A1D0D] font-bold text-sm px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Plus size={16} />
                إضافة عمل جديد
              </button>
            </div>

            {/* Portfolio Grid */}
            {!user.portfolio || user.portfolio.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-gray-200">
                <Image className="mx-auto text-gray-300 mb-2" size={48} />
                <h4 className="font-bold text-[#4A2511] mb-1">لا يوجد أعمال في معرضك بعد</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">إن إضافة صور من أعمالك السابقة للعملاء يرفع من رصيد حجز صالونك الخاص بنسبة تتجاوز 80%!</p>
                <button 
                  onClick={() => setShowAddWorkModal(true)}
                  className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-[#4A2511] hover:bg-[#c29e2f] font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  <Plus size={14} /> إضافة أول صورة للعمل
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {user.portfolio.map((item: any) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group relative">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-bold text-sm text-[#4A2511] truncate">{item.title}</h4>
                    </div>
                    
                    {/* Delete Option */}
                    <button 
                      onClick={() => handleDeleteWork(item.id)}
                      className="absolute top-2 left-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-md cursor-pointer"
                      title="حذف هذا العمل"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Customer standard screen content */
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reserved Bookings simulation */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-base text-[#4A2511] mb-4 flex items-center gap-1.5">
                <Award size={18} className="text-[#D4AF37]" />
                مستوى عضويتي والمكافآت
              </h3>
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100/50 flex justify-between items-center mb-4">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-amber-700 font-bold">العضوية الحالية</span>
                  <span className="text-base font-bold text-[#4A2511]">العضوية الملكية SU ROYAL</span>
                </div>
                <div className="p-2 bg-amber-600 text-white rounded-xl font-bold text-sm">
                  ★ VIP
                </div>
              </div>
              <p className="text-xs text-gray-500">يحصل حاملو العضوية الملكية على خصومات فورية 15% على جميع خدمات الحلاقة، التجميل ومعالجة البشرة، بالإضافة إلى أولوية الحجز.</p>
            </div>

            {/* Favorites and quick actions */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-[#4A2511] mb-3 flex items-center gap-1.5">
                  <Check size={18} className="text-green-600" />
                  حجوزاتي القادمة
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <span className="block font-bold text-gray-700">تجهيز عرسان متكامل مع أحمد محمد</span>
                      <span className="text-gray-400">غداً الساعة 4:00 مساءً</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded text-[10px]">مؤكد</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-gray-400 border-t pt-4 mt-4 text-center">
                مرحباً بك في SU SALON - شكراً لاختيارك الأفضل دائماً
              </div>
            </div>
          </div>
        )}

        {/* Simple Logout block explicitly visible for any user */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-right">
            <h4 className="font-bold text-[#4A2511] text-sm">هل ترغب في تسجيل الخروج؟</h4>
            <p className="text-xs text-gray-400">يمكنك العودة في أي وقت للاستفادة الكاملة من ميزات الذكاء الاصطناعي</p>
          </div>
          <button 
            onClick={onLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 font-bold text-sm px-8 py-3 rounded-2xl transition-all shadow-md cursor-pointer"
          >
            <LogOut size={16} />
            تسجيل الخروج من الحساب
          </button>
        </div>
      </div>

      {/* MODAL 1: Choose Profile picture / Avatar */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-right">
            <button 
              onClick={() => setShowAvatarModal(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-[#4A2511]"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-[#4A2511] mb-2">تحديث الصورة الشخصية</h3>
            <p className="text-xs text-gray-400 mb-6 font-medium">اختر صورة لتظهر للعملاء في لوحة الطلبات وفي حسابك الفاخر</p>

            <div className="space-y-6">
              {/* Preset Avatars Selection */}
              <div>
                <span className="block text-xs font-bold text-gray-500 mb-3">حدد من الأنماط الجاهزة:</span>
                <div className="grid grid-cols-3 gap-3">
                  {avatarPresets.map((avatarUrl, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleUpdateAvatar(avatarUrl)}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer aspect-square border-4 hover:border-amber-500 transition-all ${user.avatar === avatarUrl ? 'border-amber-600 shadow-lg' : 'border-transparent'}`}
                    >
                      <img src={avatarUrl} alt="Avatar Preset" className="w-full h-full object-cover" />
                      {user.avatar === avatarUrl && (
                        <div className="absolute inset-0 bg-[#4A2511]/30 flex items-center justify-center text-white">
                          <Check size={20} className="stroke-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct File Upload Support */}
              <div className="pt-4 border-t">
                <span className="block text-xs font-bold text-gray-500 mb-3">أو قم برفع صورة مخصصة من جهازك:</span>
                <label className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer transition-colors">
                  <Camera className="text-[#D4AF37] mb-1" size={24} />
                  <span className="text-xs font-bold text-gray-600">اختر ملف الصورة</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add portfolio work image to profile */}
      {showAddWorkModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-right">
            <button 
              onClick={() => setShowAddWorkModal(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-[#4A2511]"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-[#4A2511] mb-2 flex items-center gap-1">
              <PlusCircleIcon size={20} className="text-[#D4AF37]" />
              إضافة عمل جديد للمعرض
            </h3>
            <p className="text-xs text-gray-400 mb-6">قم بإثراء المعرض بصور تسريحاتك ومكياجك لجذب انتباه العملاء</p>

            <form onSubmit={handleAddWork} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">وصف أو عنوان مظهر العمل</label>
                <input 
                  type="text" 
                  placeholder="مثال: تسريحة شعر كلاسيكية، مكياج عروس ملكي" 
                  value={newWorkTitle}
                  onChange={(e) => setNewWorkTitle(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <span className="block text-xs font-bold text-gray-500 mb-2">طريقة اختيار صورة العمل:</span>
                <div className="flex bg-gray-100 rounded-lg p-1 text-xs font-bold mb-3">
                  <button 
                    type="button" 
                    onClick={() => setUploadOption('preset')}
                    className={`flex-1 py-1.5 rounded-md transition-all ${uploadOption === 'preset' ? 'bg-white text-[#4A2511] shadow' : 'text-gray-500'}`}
                  >
                    نماذج راقية جاهزة
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setUploadOption('url')}
                    className={`flex-1 py-1.5 rounded-md transition-all ${uploadOption === 'url' ? 'bg-white text-[#4A2511] shadow' : 'text-gray-500'}`}
                  >
                    رابط صورة أو تحميل جهاز
                  </button>
                </div>

                {uploadOption === 'preset' ? (
                  <div className="grid grid-cols-3 gap-3 max-h-40 overflow-y-auto p-1 border rounded-xl">
                    {workPresets.map((presetImg, idx) => (
                      <div 
                        key={idx} 
                        type="button"
                        onClick={() => setSelectedPresetImg(presetImg)}
                        className={`relative rounded-xl overflow-hidden cursor-pointer aspect-square border-2 hover:border-amber-500 transition-all ${selectedPresetImg === presetImg ? 'border-amber-600 shadow' : 'border-transparent'}`}
                      >
                        <img src={presetImg} alt="Work Preset" className="w-full h-full object-cover" />
                        {selectedPresetImg === presetImg && (
                          <div className="absolute inset-0 bg-[#4A2511]/30 flex items-center justify-center text-white">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">رابط مباشر لصورة (URL)</label>
                      <input 
                        type="text" 
                        placeholder="https://example.com/styling-image.jpg" 
                        value={newWorkImg}
                        onChange={(e) => setNewWorkImg(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="flex items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer transition-colors relative">
                      <Camera className="text-[#D4AF37] mb-1" size={18} />
                      <span className="text-xs font-bold text-gray-600 block mr-2">خيار سريع: اختر ملف للتحميل</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleWorkFileUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t mt-4 flex gap-3">
                <button 
                  type="submit"
                  className="flex-1 bg-[#4A2511] text-white hover:bg-[#3A1D0D] font-bold py-3 rounded-2xl shadow transition-all cursor-pointer text-sm"
                >
                  تأكيد الحفظ والنشر
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddWorkModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-2xl transition-all cursor-pointer text-sm"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Icon alias helper
function PlusCircleIcon({ size, className }: { size?: number, className?: string }) {
  return <Plus size={size} className={className} />;
}

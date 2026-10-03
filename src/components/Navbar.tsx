import React, { useState } from 'react';
import { useTimeBank } from '../context/TimeBankContext';
import { Clock, Menu, X, PlusCircle, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onOpenAddSkill: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAddSkill }) => {
  const { currentView, navigateTo, user, bookings } = useTimeBank();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count active/upcoming sessions for a small badge
  const upcomingCount = bookings.filter(b => b.status === 'upcoming' || b.status === 'in_progress').length;

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'skills', label: 'تصفّح المهارات' },
    { id: 'sessions', label: 'جلساتي', count: upcomingCount },
    { id: 'leaderboard', label: 'لوحة المتصدرين' },
    { id: 'profile', label: 'الملف الشخصي' },
  ];

  const handleNavClick = (id: string) => {
    navigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EDE6DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Zone 1: Brand title, one line wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-right group cursor-pointer focus:outline-none"
            aria-label="بنك الساعات - الصفحة الرئيسية"
          >
            <div className="w-10 h-10 rounded-xl bg-[#354C30] flex items-center justify-center text-[#F4F7F3] shadow-sm transition-transform group-hover:scale-105">
              <Clock className="w-5 h-5 text-[#E6935C]" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#243321] group-hover:text-[#354C30] transition-colors">
                بنك الساعات
              </span>
              <span className="text-[11px] text-[#788875] -mt-0.5 font-medium hidden sm:inline">
                الوقت هو العملة
              </span>
            </div>
          </button>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-sm font-semibold transition-colors cursor-pointer focus:outline-none ${
                    isActive
                      ? 'text-[#2B3E27] font-bold'
                      : 'text-[#5C6B5E] hover:text-[#2B3E27]'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {item.label}
                    {item.count ? (
                      <span className="w-5 h-5 rounded-full bg-[#E06D28] text-white text-[11px] font-bold flex items-center justify-center">
                        {item.count}
                      </span>
                    ) : null}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#354C30] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Hour Balance Pill / Button */}
            <button
              onClick={() => handleNavClick('profile')}
              title="عرض محفظة الساعات في ملفك الشخصي"
              className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#E5EDE3] hover:bg-[#D6E4D3] text-[#243321] transition-colors text-xs sm:text-sm font-bold cursor-pointer border border-[#CBDEC8]"
            >
              <Clock className="w-4 h-4 text-[#354C30]" />
              <span className="tabular-nums">{user.hoursBalance.toFixed(1)}</span>
              <span className="text-xs font-normal text-[#5C6B5E]">ساعة</span>
            </button>

            {/* Quick Action Button: Add Skill */}
            <button
              onClick={onOpenAddSkill}
              className="hidden lg:flex items-center gap-1.5 py-2 px-4 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white text-xs sm:text-sm font-medium transition-all shadow-sm cursor-pointer hover:shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>أضف مهارتك</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#354C30] hover:bg-[#E5EDE3] md:hidden cursor-pointer focus:outline-none"
              aria-label="فتح القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EDE6DC] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-right text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#E5EDE3] text-[#2B3E27]'
                    : 'text-[#4A594C] hover:bg-[#F2ECE3]'
                }`}
              >
                <span>{item.label}</span>
                {item.count ? (
                  <span className="w-5 h-5 rounded-full bg-[#E06D28] text-white text-[11px] font-bold flex items-center justify-center">
                    {item.count}
                  </span>
                ) : (
                  <ArrowLeft className="w-4 h-4 text-[#8C9C8D]" />
                )}
              </button>
            );
          })}
          
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddSkill();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#354C30] text-white text-sm font-semibold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>أضف مهارة جديدة للتعليم</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

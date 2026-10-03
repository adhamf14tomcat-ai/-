import React from 'react';
import { useTimeBank } from '../context/TimeBankContext';
import { Clock, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useTimeBank();

  return (
    <footer className="bg-white border-t border-[#EDE6DC] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3 text-right">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#354C30] flex items-center justify-center text-white">
                <Clock className="w-4 h-4 text-[#E6935C]" />
              </div>
              <span className="text-lg font-bold text-[#243321]">بنك الساعات</span>
            </div>
            <p className="text-xs text-[#5C6B5E] max-w-sm leading-relaxed">
              منصة مجتمعية مفتوحة قائمة على مبدأ تكافؤ القيمة الإنسانية: كل ساعة من وقتك تُكافئ ساعة من وقت غيرك. علّم ساعة، وتعلّم ساعة.
            </p>
            <div className="text-[11px] text-[#788875] flex items-center gap-1.5 pt-1">
              <span>مبني بروح المشاركة والعطاء المجتمعي</span>
              <Heart className="w-3.5 h-3.5 text-[#D96827] fill-current" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2 text-right">
            <h4 className="text-xs font-bold text-[#243321] uppercase tracking-wider">أقسام المنصة</h4>
            <ul className="space-y-1.5 text-xs text-[#5C6B5E]">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#243321] transition-colors cursor-pointer">
                  الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('skills')} className="hover:text-[#243321] transition-colors cursor-pointer">
                  تصفح دليل المهارات
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sessions')} className="hover:text-[#243321] transition-colors cursor-pointer">
                  جلساتي السابقة والقادمة
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('leaderboard')} className="hover:text-[#243321] transition-colors cursor-pointer">
                  لوحة المتصدرين في العطاء
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-[#243321] transition-colors cursor-pointer">
                  محفظة الساعات والملف الشخصي
                </button>
              </li>
            </ul>
          </div>

          {/* Ethics & Guarantee */}
          <div className="space-y-2 text-right">
            <h4 className="text-xs font-bold text-[#243321] uppercase tracking-wider">مبادئ بنك الساعات</h4>
            <ul className="space-y-1.5 text-xs text-[#5C6B5E]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#354C30]" />
                <span>المعرفة حق متبادل</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#354C30]" />
                <span>الوقت متساوٍ بين الجميع</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#354C30]" />
                <span>حماية الخصوصية والأمان</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 mt-8 border-t border-[#F2ECE3] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#788875] gap-3">
          <p>© {new Date().getFullYear()} بنك الساعات. جميع الحقوق محفوظة لأعضاء المجتمع المعرفي.</p>
          <p>الوقت هو العملة الأكثر عدلاً وإنسانية.</p>
        </div>
      </div>
    </footer>
  );
};

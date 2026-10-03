import React from 'react';
import { useTimeBank } from '../context/TimeBankContext';
import { heroCommunityImg, SUCCESS_STORIES } from '../data/mockData';
import { 
  Sparkles, 
  CalendarCheck, 
  Clock, 
  ArrowLeft, 
  Users, 
  BookOpen, 
  Compass, 
  CheckCircle2, 
  Star,
  Quote
} from 'lucide-react';

interface HomeViewProps {
  onOpenAddSkill: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenAddSkill }) => {
  const { totalPlatformHours, navigateTo, teachers, openBooking } = useTimeBank();

  // Top 3 featured teachers
  const featuredTeachers = teachers.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Right text column (in RTL this comes first on right) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#354C30] bg-[#E5EDE3] px-3.5 py-1.5 rounded-full border border-[#CBDEC8]">
                <Clock className="w-4 h-4 text-[#D96827]" />
                <span>أول بنك وقت عربي قائم على التكافل المعرفي</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#243321] tracking-tight leading-[1.25] text-balance">
                علّم ساعة، <br />
                <span className="text-[#D96827] underline decoration-[#E8BFA0] decoration-wavy decoration-2">
                  تعلّم ساعة.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#526354] leading-relaxed max-w-2xl font-normal">
                منصة اجتماعية لتبادل المهارات بين الناس باستخدام الوقت كعملة بدل المال.
                كل ساعة تعلّمها لشخص آخر تُضاف مباشرة إلى رصيدك الزمني، وكل ساعة تتعلّمها تُخصم من رصيدك. لا مكان للمال هنا، المعرفة والعطاء هما الأساس.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('skills')}
                  className="py-3.5 px-6 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white font-semibold text-base transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>تصفّح المهارات المتاحة</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={onOpenAddSkill}
                  className="py-3.5 px-6 rounded-xl bg-white hover:bg-[#F5EFE6] text-[#354C30] font-semibold text-base border border-[#D9D1C3] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>ابدأ الآن وأضف مهارتك</span>
                  <Sparkles className="w-4 h-4 text-[#D96827]" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#6B7C6D]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#354C30]" />
                  <span>مجاني 100% بدون أي رسوم نقدية</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#354C30]" />
                  <span>جلسات أونلاين وحضورية موثقة</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#354C30]" />
                  <span>نظام تقييم وضمان تبادل الساعات</span>
                </div>
              </div>
            </div>

            {/* Left media column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E5DDD0] bg-white group">
                <img
                  src={heroCommunityImg}
                  alt="مجتمع بنك الساعات يتبادل المعرفة"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating overlay counter card */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E2D8C9] shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E06D28] text-white flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7C6D] font-medium">إجمالي الساعات المتبادلة</p>
                      <p className="text-xl font-bold text-[#243321] tabular-nums">
                        {totalPlatformHours.toLocaleString('ar-EG')} ساعة
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-semibold text-[#354C30] bg-[#E5EDE3] px-2.5 py-1 rounded-md">
                      تنمو يومياً
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Platform Stats Counter Bar */}
      <section className="bg-white border-y border-[#EDE6DC] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#354C30] tabular-nums">
                {totalPlatformHours.toLocaleString('ar-EG')}+
              </div>
              <p className="text-xs sm:text-sm text-[#6B7C6D] font-medium">ساعة معرفية تم تبادلها</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D96827] tabular-nums">
                ٨٥٠+
              </div>
              <p className="text-xs sm:text-sm text-[#6B7C6D] font-medium">معلّم ومتعلّم نشط</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#354C30] tabular-nums">
                ١٤٠+
              </div>
              <p className="text-xs sm:text-sm text-[#6B7C6D] font-medium">مهارة وتخصص متنوّع</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#243321] tabular-nums">
                ٤.٩ / ٥.٠
              </div>
              <p className="text-xs sm:text-sm text-[#6B7C6D] font-medium">متوسط رضا المستفيدين</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Three Illustrated Steps (شرح مختصر بثلاث خطوات مصورة) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#D96827] tracking-wider">كيف يعمل بنك الساعات؟</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#243321]">
            ثلاث خطوات بسيطة لتبادل المعرفة
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B5E]">
            نظام عادل يقدّر وقتك وخبرتك، ويعطيك حرية الاستفادة من مهارات الآخرين دون مقابل مالي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-7 border border-[#E8E0D5] relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#E5EDE3] text-[#354C30] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-[#D9DDD7] tabular-nums">01</span>
              </div>
              <h3 className="text-lg font-bold text-[#243321] mb-2">أضف مهارتك</h3>
              <p className="text-sm text-[#5C6B5E] leading-relaxed">
                حدد ما تتقنه سواء في البرمجة، اللغات، التصميم، الحِرف اليدوية، الطبخ، أو الاستشارات الإدارية واجعل ساعتك متاحة للمجتمع.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F2ECE3]">
              <span className="text-xs font-semibold text-[#354C30]">
                تمنحك المنصة رصيداً مبدئياً فور إضافة أول مهارة
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-7 border border-[#E8E0D5] relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#FDF1E8] text-[#D96827] flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-[#D9DDD7] tabular-nums">02</span>
              </div>
              <h3 className="text-lg font-bold text-[#243321] mb-2">احجز جلسة</h3>
              <p className="text-sm text-[#5C6B5E] leading-relaxed">
                تصفح قائمة المعلمين، اختر التوقيت والمدة (نصف ساعة، ساعة، أو ساعتان) واقرأ تقييمات المتعلمين السابقين قبل تأكيد الموعد.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F2ECE3]">
              <span className="text-xs font-semibold text-[#D96827]">
                جلسات تفاعلية عبر الفيديو أو حضورية في مدينتك
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-7 border border-[#E8E0D5] relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#E5EDE3] text-[#354C30] flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-[#D9DDD7] tabular-nums">03</span>
              </div>
              <h3 className="text-lg font-bold text-[#243321] mb-2">اكسب ساعات</h3>
              <p className="text-sm text-[#5C6B5E] leading-relaxed">
                بعد إنهاء كل جلسة تعليمية، يتم تحويل الساعات تلقائياً إلى محفظتك الزمنية لتتعلم بها أي شيء جديد في أي وقت تشاء.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F2ECE3]">
              <span className="text-xs font-semibold text-[#354C30]">
                سندات تحويل زمني فورية مع نظام توثيق موثوق
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Featured Skills Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#243321]">مهارات بارزة جاهزة للتبادل اليوم</h2>
            <p className="text-sm text-[#5C6B5E]">احجز جلستك الأولى مباشرة باستخدام رصيدك الزمني</p>
          </div>
          <button
            onClick={() => navigateTo('skills')}
            className="text-sm font-bold text-[#354C30] hover:text-[#243321] flex items-center gap-1.5 cursor-pointer"
          >
            <span>عرض كل المهارات ({teachers.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl border border-[#E8E0D5] p-5 flex flex-col justify-between hover:border-[#354C30]/40 transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-14 h-14 rounded-full object-cover border border-[#E2D8C9]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-bold text-base text-[#243321]">{teacher.name}</h3>
                    <p className="text-xs text-[#6B7C6D] line-clamp-1">{teacher.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#5C6B5E]">
                      <span className="flex items-center text-[#D96827] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current ml-0.5" />
                        {teacher.rating.toFixed(1)}
                      </span>
                      <span>·</span>
                      <span>{teacher.city}</span>
                      <span>·</span>
                      <span>{teacher.type === 'online' ? 'أونلاين' : 'حضوري'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#ECE5D8] mb-4">
                  <span className="text-[11px] font-bold text-[#354C30] block mb-1">المهارة المعروضة:</span>
                  <p className="text-sm font-semibold text-[#243321]">{teacher.primarySkill}</p>
                </div>

                <p className="text-xs text-[#5C6B5E] leading-relaxed line-clamp-2 mb-4">
                  {teacher.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2ECE3] flex items-center justify-between">
                <div className="text-xs text-[#6B7C6D]">
                  أنجزت <span className="font-bold text-[#243321] tabular-nums">{teacher.hoursCompleted}</span> ساعة
                </div>
                <button
                  onClick={() => openBooking(teacher)}
                  className="py-2 px-4 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  احجز جلسة
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Success Stories (قصص نجاح قصيرة من مستخدمين) */}
      <section className="bg-[#FAF4EB] border-y border-[#EDE1D1] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-[#D96827] tracking-wider">أثر حقيقي في حياة الناس</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#243321]">
              قصص نجاح من مجتمع بنك الساعات
            </h2>
            <p className="text-sm text-[#5C6B5E]">
              تجارب ملهمة لأعضاء استبدلوا المال بالوقت والمعرفة، وحققوا أهدافهم الشخصية والمهنية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl p-6 border border-[#E5DDD0] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#E2D8C9]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#243321]">{story.name}</h4>
                      <p className="text-xs text-[#6B7C6D]">{story.city}</p>
                    </div>
                  </div>

                  {/* Skills Exchange Badge */}
                  <div className="text-xs bg-[#F4F7F3] p-2.5 rounded-lg border border-[#DCE8D9] mb-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-[#354C30]">
                      <span className="font-bold">علّم:</span>
                      <span className="text-[#243321]">{story.skillTaught}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#D96827]">
                      <span className="font-bold">تعلّم:</span>
                      <span className="text-[#243321]">{story.skillLearned}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A594C] leading-relaxed relative">
                    <Quote className="w-4 h-4 text-[#D8CFBF] inline-block ml-1 opacity-70" />
                    {story.story}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F2ECE3] flex items-center justify-between text-xs text-[#6B7C6D]">
                  <span>إجمالي التبادل:</span>
                  <span className="font-bold text-[#354C30] tabular-nums">{story.hoursExchanged} ساعة معرفية</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#354C30] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold text-[#E89E6E] tracking-wider">انضم إلى أسرع مجتمع معرفي نمواً</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              لديك مهارة ينتظرها غيرك، وهناك مهارة تنتظرك لتتعلمها.
            </h2>
            <p className="text-sm sm:text-base text-[#D3E0D1] leading-relaxed">
              ابدأ اليوم بإضافة مهاراتك واحصل على ساعات ترحيبية تخولك حضور أول جلسة تدريبية لك على الفور.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenAddSkill}
                className="py-3 px-6 rounded-xl bg-[#E06D28] hover:bg-[#C95717] text-white font-bold text-sm transition-all shadow cursor-pointer"
              >
                أضف مهاراتك وانضم للمجتمع
              </button>
              <button
                onClick={() => navigateTo('skills')}
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20 cursor-pointer"
              >
                استكشف الدليل الكامل
              </button>
            </div>
          </div>

          {/* Decorative subtle clock emblem */}
          <div className="absolute -left-12 -bottom-12 opacity-10 pointer-events-none">
            <Clock className="w-80 h-80 text-white" />
          </div>
        </div>
      </section>

    </div>
  );
};

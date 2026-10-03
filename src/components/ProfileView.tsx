import React, { useState } from 'react';
import { useTimeBank } from '../context/TimeBankContext';
import { 
  Clock, 
  Sparkles, 
  Award, 
  Plus, 
  Star, 
  Calendar, 
  MapPin, 
  Video, 
  CheckCircle, 
  Trash2, 
  BookOpen, 
  ArrowUpRight,
  Gift
} from 'lucide-react';

interface ProfileViewProps {
  onOpenAddSkill: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenAddSkill }) => {
  const { 
    user, 
    bookings, 
    removeOfferedSkill, 
    addWantedSkill, 
    removeWantedSkill, 
    addWelcomeGrant, 
    startLiveSession 
  } = useTimeBank();

  const [activeTab, setActiveTab] = useState<'skills' | 'sessions' | 'badges' | 'reviews'>('skills');
  const [newWantedInput, setNewWantedInput] = useState('');

  const handleAddWanted = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWantedInput.trim()) {
      addWantedSkill(newWantedInput);
      setNewWantedInput('');
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming' || b.status === 'in_progress');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Profile Top Card with Prominent Hours Balance */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6DC] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* User info */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-right">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#FAF7F2] shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243321]">{user.name}</h1>
                <span className="text-xs bg-[#E5EDE3] text-[#354C30] font-bold px-2.5 py-0.5 rounded-full border border-[#CBDEC8]">
                  عضو معتمد
                </span>
              </div>
              <p className="text-sm font-medium text-[#D96827]">{user.title}</p>
              <p className="text-xs sm:text-sm text-[#5C6B5E] max-w-xl leading-relaxed">
                {user.bio}
              </p>
              
              <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-[#788875]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {user.city}
                </span>
                <span>·</span>
                <span>{user.totalHoursTaught} ساعة تدريب منجزة</span>
                <span>·</span>
                <span>{user.totalHoursLearned} ساعة تعلّم</span>
              </div>
            </div>
          </div>

          {/* Prominent Hours Balance Hero Box (الرصيد الحالي من الساعات بشكل بارز) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#354C30] to-[#243321] text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#CBDBC7] block mb-1">
                  محفظتك الزمنية في بنك الساعات
                </span>
                <p className="text-sm text-[#E5EDE3]/80">الرصيد المتاح للاستخدام فوراً</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#E06D28]" />
              </div>
            </div>

            <div className="relative z-10 my-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight tabular-nums text-white">
                {user.hoursBalance.toFixed(1)}
              </span>
              <span className="text-lg font-bold text-[#E8BFA0]">ساعة</span>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between gap-2">
              <button
                onClick={onOpenAddSkill}
                className="py-2 px-3 rounded-lg bg-[#E06D28] hover:bg-[#C95717] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                علّم واكسب ساعات
              </button>

              <button
                onClick={addWelcomeGrant}
                title="إضافة ساعتين تجريبيتين للمحفظة"
                className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/20 cursor-pointer flex items-center gap-1.5"
              >
                <Gift className="w-3.5 h-3.5 text-[#E8BFA0]" />
                <span>+٢ ساعة تجريبية</span>
              </button>
            </div>

            {/* Subtle background clock watermark */}
            <div className="absolute -left-6 -bottom-6 opacity-10 pointer-events-none">
              <Clock className="w-36 h-36" />
            </div>
          </div>

        </div>
      </div>

      {/* 2. Profile Tabs */}
      <div className="border-b border-[#EDE6DC] flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('skills')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'skills'
              ? 'border-[#354C30] text-[#354C30]'
              : 'border-transparent text-[#6B7C6D] hover:text-[#243321]'
          }`}
        >
          المهارات (المعروضة والمطلوبة)
        </button>

        <button
          onClick={() => setActiveTab('sessions')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'sessions'
              ? 'border-[#354C30] text-[#354C30]'
              : 'border-transparent text-[#6B7C6D] hover:text-[#243321]'
          }`}
        >
          <span>سجل الجلسات</span>
          {upcomingBookings.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#E06D28] text-white text-[11px] font-bold flex items-center justify-center">
              {upcomingBookings.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'badges'
              ? 'border-[#354C30] text-[#354C30]'
              : 'border-transparent text-[#6B7C6D] hover:text-[#243321]'
          }`}
        >
          الشارات والإنجازات ({user.badges.filter(b => b.unlocked).length})
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'border-[#354C30] text-[#354C30]'
              : 'border-transparent text-[#6B7C6D] hover:text-[#243321]'
          }`}
        >
          التقييمات وآراء المستفيدين ({user.reviewsReceived.length})
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* Tab A: Skills Offered & Wanted */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Skills I Offer (المهارات التي أقدّمها) */}
          <div className="bg-white rounded-2xl p-6 border border-[#EDE6DC] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#243321]">مهارات أقدّمها للمجتمع</h3>
                <p className="text-xs text-[#5C6B5E]">الساعات التي تدرّب فيها الآخرين تشحن رصيدك تلقائياً</p>
              </div>
              <button
                onClick={onOpenAddSkill}
                className="py-1.5 px-3 rounded-lg bg-[#E5EDE3] hover:bg-[#D6E4D3] text-[#354C30] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة مهارة</span>
              </button>
            </div>

            <div className="space-y-3">
              {user.offeredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-xl bg-[#FAF7F2] border border-[#ECE5D8] flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#243321]">{skill.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#6B7C6D]">
                      <span>{skill.category}</span>
                      <span>·</span>
                      <span>المستوى: {skill.level}</span>
                      <span>·</span>
                      <span className="font-semibold text-[#354C30]">{skill.hoursCompleted} ساعة منجزة</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeOfferedSkill(skill.id)}
                    title="حذف المهارة"
                    className="p-1.5 text-[#A5B3A3] hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Skills I Want to Learn (المهارات التي أريد تعلّمها) */}
          <div className="bg-white rounded-2xl p-6 border border-[#EDE6DC] shadow-xs space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[#243321]">مهارات أبحث عنها وأريد تعلّمها</h3>
              <p className="text-xs text-[#5C6B5E]">سنقترح عليك معلمين مناسبين بناءً على هذه القائمة</p>
            </div>

            {/* Quick add form */}
            <form onSubmit={handleAddWanted} className="flex gap-2">
              <input
                type="text"
                value={newWantedInput}
                onChange={(e) => setNewWantedInput(e.target.value)}
                placeholder="أضف مهارة ترغب بتعلّمها (مثال: محادثة فرنسية، مونتاج فيديو)..."
                className="flex-1 py-2 px-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
              />
              <button
                type="submit"
                className="py-2 px-4 rounded-xl bg-[#354C30] text-white text-xs font-bold hover:bg-[#2B3E27] transition-colors cursor-pointer"
              >
                إضافة
              </button>
            </form>

            {/* Wanted skills list */}
            <div className="space-y-2.5">
              {user.wantedSkills.map((wanted) => (
                <div
                  key={wanted}
                  className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#ECE5D8] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#D96827]" />
                    <span className="text-xs font-bold text-[#243321]">{wanted}</span>
                  </div>
                  <button
                    onClick={() => removeWantedSkill(wanted)}
                    title="إزالة"
                    className="p-1 text-[#A5B3A3] hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab B: Sessions History (سجل الجلسات السابقة والقادمة) */}
      {activeTab === 'sessions' && (
        <div className="space-y-8">
          
          {/* Upcoming & In Progress Sessions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#243321] flex items-center gap-2">
              <span>الجلسات القادمة والنشطة</span>
              <span className="text-xs bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#DDD5C7] text-[#5C6B5E]">
                {upcomingBookings.length}
              </span>
            </h3>

            {upcomingBookings.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-[#EDE6DC] p-6 text-[#6B7C6D] text-xs sm:text-sm">
                لا توجد لديك جلسات قادمة حالياً. تصفح المهارات واحجز أول جلسة لك!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingBookings.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white rounded-2xl border-2 border-[#354C30]/20 p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold text-[#354C30] bg-[#E5EDE3] px-2.5 py-0.5 rounded-full">
                          {session.status === 'in_progress' ? 'قيد الانعقاد الآن' : 'جلسة مؤكدة'}
                        </span>
                        <span className="text-xs text-[#5C6B5E] font-medium">
                          المدة: {session.duration} ساعة
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={session.teacherAvatar}
                          alt={session.teacherName}
                          className="w-12 h-12 rounded-full object-cover border border-[#E2D8C9]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-[#243321]">{session.teacherName}</h4>
                          <p className="text-xs text-[#D96827] font-semibold">{session.skillTitle}</p>
                        </div>
                      </div>

                      <div className="text-xs text-[#5C6B5E] space-y-1 bg-[#FAF7F2] p-3 rounded-xl border border-[#EDE6DC] mb-3">
                        <div>📅 الموعد: <strong className="text-[#243321]">{session.date}</strong> ({session.timeSlot})</div>
                        <div>📍 النوع: {session.type === 'online' ? 'جلسة أونلاين عبر المنصة' : session.locationDetails || 'حضوري'}</div>
                        {session.note && <div className="text-[11px] italic mt-1">ملاحظة: {session.note}</div>}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-[#788875]">المعاملة: محجوزة من الرصيد</span>
                      <button
                        onClick={() => startLiveSession(session.id)}
                        className="py-2 px-4 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>دخول قاعة الجلسة</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed Sessions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#243321] flex items-center gap-2">
              <span>الجلسات المكتملة</span>
              <span className="text-xs bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#DDD5C7] text-[#5C6B5E]">
                {completedBookings.length}
              </span>
            </h3>

            <div className="space-y-3">
              {completedBookings.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-2xl border border-[#EDE6DC] p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={session.teacherAvatar}
                      alt={session.teacherName}
                      className="w-12 h-12 rounded-full object-cover border border-[#E2D8C9]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#243321]">{session.teacherName}</h4>
                      <p className="text-xs text-[#5C6B5E]">{session.skillTitle}</p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#788875]">
                        <span>{session.date}</span>
                        <span>·</span>
                        <span>تم تحويل {session.hoursTransferred || session.duration} ساعة للمعلم</span>
                      </div>
                    </div>
                  </div>

                  {session.ratingGiven && (
                    <div className="text-right sm:text-left bg-[#FAF7F2] p-2.5 rounded-xl border border-[#ECE5D8] w-full sm:w-auto">
                      <div className="flex items-center gap-1 text-[#D96827] text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>تقييمك: {session.ratingGiven} / ٥</span>
                      </div>
                      {session.feedbackGiven && (
                        <p className="text-[11px] text-[#6B7C6D] max-w-xs truncate mt-0.5">
                          "{session.feedbackGiven}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab C: Badges and Achievements (الشارات والإنجازات) */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl p-5 border text-center transition-all ${
                badge.unlocked
                  ? 'bg-white border-[#354C30]/40 shadow-xs'
                  : 'bg-[#FAF7F2] border-[#E8E0D5] opacity-75'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3 ${
                  badge.unlocked
                    ? 'bg-[#E5EDE3] text-[#354C30]'
                    : 'bg-[#EAE4D9] text-[#8F9E8D]'
                }`}
              >
                <Award className="w-7 h-7" />
              </div>

              <h4 className="font-bold text-sm text-[#243321] mb-1">{badge.title}</h4>
              <p className="text-xs text-[#5C6B5E] leading-relaxed mb-3">{badge.description}</p>

              <span
                className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${
                  badge.unlocked
                    ? 'bg-[#354C30] text-white'
                    : 'bg-[#EAE4D9] text-[#6B7C6D]'
                }`}
              >
                {badge.progress || (badge.unlocked ? 'مكتمل' : 'قيد التقدم')}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab D: Reviews received (التقييمات والتعليقات) */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-2xl p-6 border border-[#EDE6DC] space-y-4">
          <div>
            <h3 className="text-lg font-bold text-[#243321]">آراء المتعلمين الذين درّبتهم</h3>
            <p className="text-xs text-[#5C6B5E]">شهادات حقيقية من المستفيدين من جلساتك في بنك الساعات</p>
          </div>

          <div className="space-y-3 pt-2">
            {user.reviewsReceived.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl bg-[#FAF7F2] border border-[#ECE5D8] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#243321]">{rev.userName}</span>
                    <span className="text-xs text-[#788875]">({rev.skillName})</span>
                  </div>
                  <div className="flex items-center text-[#D96827]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-[#D9DDD7]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#4A594C] leading-relaxed">"{rev.comment}"</p>
                <div className="text-[10px] text-[#8F9E8D]">{rev.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

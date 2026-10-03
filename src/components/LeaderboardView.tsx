import React, { useState } from 'react';
import { useTimeBank } from '../context/TimeBankContext';
import { LEADERBOARD_MEMBERS } from '../data/mockData';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  Clock, 
  Users, 
  ArrowLeft, 
  HeartHandshake, 
  Sparkles 
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { teachers, openBooking } = useTimeBank();
  const [selectedMonth, setSelectedMonth] = useState('شوال ١٤٤٧ / أكتوبر');

  const topThree = LEADERBOARD_MEMBERS.slice(0, 3);
  const remainingMembers = LEADERBOARD_MEMBERS.slice(3);

  const handleBookLeader = (leaderName: string) => {
    // Find matching teacher in directory or fallback
    const matched = teachers.find(t => leaderName.includes(t.name) || t.name.includes(leaderName.replace('م. ', '').replace('أ. ', '')));
    if (matched) {
      openBooking(matched);
    } else if (teachers.length > 0) {
      openBooking(teachers[0]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D96827] bg-[#FDF1E8] px-3 py-1 rounded-full border border-[#F6D5BF]">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>لوحة الشرف المعرفية</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#243321]">أكثر الأعضاء عطاءً هذا الشهر</h1>
          <p className="text-sm text-[#5C6B5E]">
            نكرّم ملهمي مجتمعنا الذين وهبوا أوقاتهم لنشر المعرفة ومساعدة الآخرين دون مقابل مالي.
          </p>
        </div>

        {/* Month Selector */}
        <div className="bg-white p-1 rounded-xl border border-[#EDE6DC] shadow-xs flex items-center text-xs font-semibold">
          <span className="px-3 py-1.5 bg-[#FAF7F2] rounded-lg text-[#243321]">
            {selectedMonth}
          </span>
        </div>
      </div>

      {/* Top 3 Podium (منصة المتصدرين الثلاثة) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-6">
        
        {/* Rank 2 (Silver) */}
        <div className="order-2 md:order-1 bg-white rounded-3xl p-6 border border-[#EDE6DC] shadow-sm text-center relative flex flex-col justify-between hover:border-[#354C30]/40 transition-all">
          <div className="space-y-4">
            <div className="relative inline-block mx-auto">
              <img
                src={topThree[1].avatar}
                alt={topThree[1].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#E2E8F0] shadow-sm mx-auto"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-300 text-slate-800 font-black text-xs flex items-center justify-center border-2 border-white shadow-xs">
                2
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-[#243321]">{topThree[1].name}</h3>
              <p className="text-xs text-[#6B7C6D]">{topThree[1].city}</p>
              <p className="text-xs font-semibold text-[#D96827] mt-1">{topThree[1].skill}</p>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#ECE5D8] space-y-1 text-xs">
              <div className="flex justify-between text-[#5C6B5E]">
                <span>ساعات العطاء هذا الشهر:</span>
                <strong className="text-[#354C30] font-extrabold tabular-nums">
                  {topThree[1].hoursGivenThisMonth} ساعة
                </strong>
              </div>
              <div className="flex justify-between text-[#5C6B5E]">
                <span>المتعلمون المستفيدون:</span>
                <span className="font-bold text-[#243321] tabular-nums">
                  {topThree[1].learnersCount} متعلم
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F2ECE3] mt-4">
            <button
              onClick={() => handleBookLeader(topThree[1].name)}
              className="w-full py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#354C30] text-[#354C30] hover:text-white font-bold text-xs transition-colors border border-[#DDD5C7] cursor-pointer"
            >
              طلب جلسة معه
            </button>
          </div>
        </div>

        {/* Rank 1 (Gold - Elevated) */}
        <div className="order-1 md:order-2 bg-gradient-to-b from-white to-[#F9F7F2] rounded-3xl p-7 border-2 border-[#D96827]/40 shadow-lg text-center relative flex flex-col justify-between -translate-y-2 md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D96827] text-white px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 shadow-sm">
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span>بطل العطاء لهذا الشهر</span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="relative inline-block mx-auto">
              <img
                src={topThree[0].avatar}
                alt={topThree[0].name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#D96827] shadow-md mx-auto"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E06D28] text-white font-black text-sm flex items-center justify-center border-2 border-white shadow-xs">
                1
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-[#243321]">{topThree[0].name}</h3>
              <p className="text-xs text-[#6B7C6D]">{topThree[0].city}</p>
              <p className="text-xs font-semibold text-[#354C30] mt-1">{topThree[0].skill}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFF8F3] border border-[#F6D5BF] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5C6B5E]">
                <span>ساعات العطاء هذا الشهر:</span>
                <strong className="text-[#D96827] font-black text-sm tabular-nums">
                  {topThree[0].hoursGivenThisMonth} ساعة
                </strong>
              </div>
              <div className="flex justify-between text-[#5C6B5E]">
                <span>المتعلمون المستفيدون:</span>
                <span className="font-bold text-[#243321] tabular-nums">
                  {topThree[0].learnersCount} متعلم
                </span>
              </div>
              <div className="flex justify-between text-[#5C6B5E]">
                <span>التقييم العام:</span>
                <span className="font-bold text-[#D96827] flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-current" />
                  {topThree[0].rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F2ECE3] mt-4">
            <button
              onClick={() => handleBookLeader(topThree[0].name)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              احجز جلسة مع المتصدر
            </button>
          </div>
        </div>

        {/* Rank 3 (Bronze) */}
        <div className="order-3 md:order-3 bg-white rounded-3xl p-6 border border-[#EDE6DC] shadow-sm text-center relative flex flex-col justify-between hover:border-[#354C30]/40 transition-all">
          <div className="space-y-4">
            <div className="relative inline-block mx-auto">
              <img
                src={topThree[2].avatar}
                alt={topThree[2].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#E8C29D] shadow-sm mx-auto"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#C28854] text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-xs">
                3
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-[#243321]">{topThree[2].name}</h3>
              <p className="text-xs text-[#6B7C6D]">{topThree[2].city}</p>
              <p className="text-xs font-semibold text-[#D96827] mt-1">{topThree[2].skill}</p>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#ECE5D8] space-y-1 text-xs">
              <div className="flex justify-between text-[#5C6B5E]">
                <span>ساعات العطاء هذا الشهر:</span>
                <strong className="text-[#354C30] font-extrabold tabular-nums">
                  {topThree[2].hoursGivenThisMonth} ساعة
                </strong>
              </div>
              <div className="flex justify-between text-[#5C6B5E]">
                <span>المتعلمون المستفيدون:</span>
                <span className="font-bold text-[#243321] tabular-nums">
                  {topThree[2].learnersCount} متعلم
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F2ECE3] mt-4">
            <button
              onClick={() => handleBookLeader(topThree[2].name)}
              className="w-full py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#354C30] text-[#354C30] hover:text-white font-bold text-xs transition-colors border border-[#DDD5C7] cursor-pointer"
            >
              طلب جلسة معها
            </button>
          </div>
        </div>

      </div>

      {/* Rankings List Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#EDE6DC] shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#243321]">بقية الأعضاء الأكثر تفانياً هذا الشهر:</h3>

        <div className="divide-y divide-[#F2ECE3]">
          {remainingMembers.map((member) => (
            <div
              key={member.id}
              className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FAF7F2] px-3 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-center text-sm font-black text-[#788875] tabular-nums">
                  #{member.rank}
                </span>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#E2D8C9]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#243321]">{member.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#5C6B5E]">
                    <span>{member.skill}</span>
                    <span>·</span>
                    <span>{member.city}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-[#5C6B5E] w-full sm:w-auto justify-between sm:justify-end">
                <div>
                  <span className="text-[#8F9E8D] block text-[10px]">ساعات هذا الشهر</span>
                  <strong className="text-[#354C30] font-bold text-sm tabular-nums">
                    {member.hoursGivenThisMonth} ساعة
                  </strong>
                </div>

                <div>
                  <span className="text-[#8F9E8D] block text-[10px]">مستفيدون</span>
                  <span className="font-bold text-[#243321] tabular-nums">
                    {member.learnersCount}
                  </span>
                </div>

                <div className="flex items-center text-[#D96827] font-bold">
                  <Star className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>{member.rating.toFixed(1)}</span>
                </div>

                <button
                  onClick={() => handleBookLeader(member.name)}
                  className="py-1.5 px-3 rounded-lg bg-[#E5EDE3] hover:bg-[#354C30] text-[#354C30] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  احجز
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community ethos statement */}
      <div className="p-6 rounded-2xl bg-[#FAF4EB] border border-[#EDE1D1] text-center max-w-2xl mx-auto space-y-2">
        <Sparkles className="w-5 h-5 text-[#D96827] mx-auto" />
        <h4 className="font-bold text-sm text-[#243321]">
          كل دقيقة تقدمها لمجتمعك تبني عالماً أكثر كرماً واستقلالية
        </h4>
        <p className="text-xs text-[#5C6B5E] leading-relaxed">
          في بنك الساعات، العطاء ليس تفضلاً بل استثمار في رأس المال البشري. كل ساعة تعلّمها تعود إليك مضاعفة متى ما احتجت إليها.
        </p>
      </div>

    </div>
  );
};

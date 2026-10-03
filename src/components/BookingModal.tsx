import React, { useState } from 'react';
import { useTimeBank } from '../context/TimeBankContext';
import { Teacher, SessionDuration, SessionType } from '../types';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2,
  Gift
} from 'lucide-react';

interface BookingModalProps {
  teacher: Teacher;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ teacher, onClose }) => {
  const { user, confirmBooking, addWelcomeGrant, navigateTo } = useTimeBank();

  // Calendar dates: next 5 days
  const today = new Date();
  const availableDates = Array.from({ length: 6 }).map((_, idx) => {
    const d = new Date();
    d.setDate(today.getDate() + idx + 1);
    const dayName = d.toLocaleDateString('ar-EG', { weekday: 'long' });
    const formatted = d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' });
    return {
      id: d.toISOString().split('T')[0],
      dayName,
      formatted,
      isWeekend: d.getDay() === 5 || d.getDay() === 6,
    };
  });

  const availableSlots = [
    '١٠:٠٠ ص - ١١:٠٠ ص',
    '٠١:٣٠ م - ٠٢:٣٠ م',
    '٠٤:٣٠ م - ٠٥:٣٠ م',
    '٠٦:٠٠ م - ٠٧:٠٠ م',
    '٠٨:٠٠ م - ٠٩:٠٠ م',
  ];

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].formatted);
  const [selectedSlot, setSelectedSlot] = useState<string>(availableSlots[2]);
  const [selectedDuration, setSelectedDuration] = useState<SessionDuration>(1);
  const [sessionType, setSessionType] = useState<SessionType>(teacher.type);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Balance calculation
  const currentBalance = user.hoursBalance;
  const sessionCost = selectedDuration;
  const balanceAfter = Math.round((currentBalance - sessionCost) * 10) / 10;
  const hasEnoughBalance = balanceAfter >= 0;

  const handleBooking = () => {
    if (!hasEnoughBalance) return;
    setIsSubmitting(true);

    const success = confirmBooking({
      teacherId: teacher.id,
      teacherName: teacher.name,
      teacherAvatar: teacher.avatar,
      skillTitle: teacher.primarySkill,
      date: selectedDate,
      timeSlot: selectedSlot,
      duration: selectedDuration,
      type: sessionType,
      locationDetails: sessionType === 'in_person' ? teacher.locationDetails : undefined,
      note: note.trim() || undefined,
    });

    if (success) {
      onClose();
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-[#EDE6DC] shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#EDE6DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-12 h-12 rounded-full object-cover border border-[#E2D8C9]"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="text-lg font-bold text-[#243321]">
                حجز جلسة مع {teacher.name}
              </h2>
              <p className="text-xs text-[#5C6B5E]">{teacher.primarySkill}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#788875] hover:text-[#243321] rounded-full hover:bg-[#EAE4D9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* 1. Date Selector (تقويم لاختيار الموعد) */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[#243321] mb-2.5">
              <CalendarIcon className="w-4 h-4 text-[#354C30]" />
              <span>اختر يوم الجلسة:</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {availableDates.map((item) => {
                const isSelected = selectedDate === item.formatted;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedDate(item.formatted)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#354C30] text-white border-[#354C30] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#243321] border-[#E5DDD0] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <span className="block text-[11px] font-medium opacity-80 mb-0.5">
                      {item.dayName}
                    </span>
                    <span className="block text-xs font-extrabold">{item.formatted}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Duration Selector (اختيار المدة: ٣٠ دقيقة، ساعة، ساعتان) */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[#243321] mb-2.5">
              <Clock className="w-4 h-4 text-[#354C30]" />
              <span>مدة الجلسة المطلوبة:</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: 0.5 as SessionDuration, label: '٣٠ دقيقة', hours: '٠.٥ ساعة' },
                { val: 1 as SessionDuration, label: 'ساعة كاملة', hours: '١.٠ ساعة' },
                { val: 2 as SessionDuration, label: 'ساعتان', hours: '٢.٠ ساعة' },
              ].map((dur) => {
                const isSelected = selectedDuration === dur.val;
                return (
                  <button
                    key={dur.val}
                    type="button"
                    onClick={() => setSelectedDuration(dur.val)}
                    className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E5EDE3] border-[#354C30] text-[#354C30] font-bold ring-1 ring-[#354C30]'
                        : 'bg-[#FAF7F2] border-[#E5DDD0] text-[#4A594C] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <span className="block text-sm font-bold">{dur.label}</span>
                    <span className="block text-[11px] text-[#788875] mt-0.5">
                      ({dur.hours})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Time Slots */}
          <div>
            <label className="block text-xs font-bold text-[#243321] mb-2">
              التوقيت المتاح للمعلم:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer text-center ${
                      isSelected
                        ? 'bg-[#354C30] text-white border-[#354C30]'
                        : 'bg-white text-[#4A594C] border-[#DDD5C7] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Session format: Online or in person */}
          <div>
            <label className="block text-xs font-bold text-[#243321] mb-2">
              طريقة اللقاء:
            </label>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#ECE5D8] flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-[#243321]">
                {sessionType === 'online' ? (
                  <>
                    <Video className="w-4 h-4 text-[#354C30]" />
                    <span>جلسة فيديو أونلاين عبر المنصة (غرفة تفاعلية مدمجة)</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-[#D96827]" />
                    <span>لقاء حضوري: {teacher.locationDetails || teacher.city}</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <label className="block text-xs font-bold text-[#243321] mb-1.5">
              موضوع الجلسة أو ما ترغب بالتركيز عليه (اختياري):
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="مثال: أريد مراجعة كود مشروع، أو التدرب على نطق حرف معين..."
              className="w-full py-2.5 px-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
            />
          </div>

          {/* 5. Balance Summary Box (عرض الرصيد قبل الحجز وبعده) */}
          <div className="p-4.5 rounded-2xl bg-[#F7F4EE] border border-[#E2D8C9] space-y-2.5">
            <h4 className="text-xs font-bold text-[#243321] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D96827]" />
              <span>تسوية المحفظة الزمنية للحجز:</span>
            </h4>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[#5C6B5E]">
                <span>رصيدك الحالي من الساعات:</span>
                <span className="font-bold text-[#243321] tabular-nums">
                  {currentBalance.toFixed(1)} ساعة
                </span>
              </div>

              <div className="flex items-center justify-between text-[#D96827]">
                <span>تكلفة هذه الجلسة:</span>
                <span className="font-bold tabular-nums">
                  - {sessionCost.toFixed(1)} ساعة
                </span>
              </div>

              <div className="pt-2 border-t border-[#DDD5C7] flex items-center justify-between font-bold">
                <span className="text-[#243321]">الرصيد المتبقي بعد الحجز:</span>
                <span
                  className={`tabular-nums text-sm ${
                    hasEnoughBalance ? 'text-[#354C30]' : 'text-red-600'
                  }`}
                >
                  {balanceAfter.toFixed(1)} ساعة
                </span>
              </div>
            </div>

            {/* Insufficient balance notice */}
            {!hasEnoughBalance && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p>
                    رصيدك الزمني غير كافٍ لإتمام هذا الحجز. يمكنك تقديم مهارة لشخص آخر لكسب ساعات جديدة!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addWelcomeGrant()}
                  className="w-full py-1.5 rounded-lg bg-[#354C30] text-white font-bold flex items-center justify-center gap-1.5 hover:bg-[#2B3E27] transition-colors"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>تفعيل منحة مجتمعية (+٢ ساعة مجانية)</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#FAF7F2] border-t border-[#EDE6DC] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-[#DDD5C7] text-xs font-semibold text-[#5C6B5E] hover:bg-[#EAE4D9] transition-colors cursor-pointer"
          >
            إلغاء
          </button>

          <button
            type="button"
            disabled={!hasEnoughBalance || isSubmitting}
            onClick={handleBooking}
            className={`py-3 px-6 rounded-xl font-bold text-xs text-white transition-all shadow-sm cursor-pointer flex items-center gap-2 ${
              hasEnoughBalance
                ? 'bg-[#354C30] hover:bg-[#2B3E27]'
                : 'bg-[#98A696] cursor-not-allowed opacity-60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تأكيد الحجز وخصم {sessionCost} ساعة</span>
          </button>
        </div>

      </div>
    </div>
  );
};

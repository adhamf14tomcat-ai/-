import React, { useState, useEffect } from 'react';
import { useTimeBank } from '../context/TimeBankContext';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Share2, 
  PhoneOff, 
  MapPin, 
  Clock, 
  Star, 
  Send, 
  CheckCircle, 
  Sparkles, 
  Award, 
  FileText,
  MessageSquare
} from 'lucide-react';

export const LiveSessionView: React.FC = () => {
  const { activeLiveBooking, completeSession, leaveLiveSession, user } = useTimeBank();

  // If no active session, show clean fallback
  if (!activeLiveBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#243321]">لا توجد جلسة نشطة حالياً</h2>
        <p className="text-sm text-[#5C6B5E]">اختر جلسة من قائمة "جلساتي" للانضمام إلى القاعة.</p>
        <button
          onClick={leaveLiveSession}
          className="py-2.5 px-6 rounded-xl bg-[#354C30] text-white text-xs font-bold cursor-pointer"
        >
          العودة إلى جلساتي
        </button>
      </div>
    );
  }

  // Live session media toggles
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Timer in seconds
  const [elapsedSeconds, setElapsedSeconds] = useState(145);
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Chat in session
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isMe: boolean }>>([
    {
      sender: activeLiveBooking.teacherName,
      text: 'أهلاً بك في جلستنا اليوم! هل الصوت والصورة واضحان عندك؟',
      time: '٠٥:٠٢ م',
      isMe: false,
    },
    {
      sender: user.name,
      text: 'أهلاً بك! نعم واضحة تماماً، ومستعد للبدء.',
      time: '٠٥:٠٣ م',
      isMe: true,
    }
  ]);
  const [newChatText, setNewChatText] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [
      ...prev,
      { sender: user.name, text: newChatText.trim(), time: timeStr, isMe: true }
    ]);
    setNewChatText('');
  };

  // Rating & Completion flow
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [isTransferred, setIsTransferred] = useState(false);

  const handleEndSessionClick = () => {
    setShowRatingModal(true);
  };

  const handleConfirmCompletion = () => {
    // Complete session in context
    completeSession(activeLiveBooking.id, rating, feedback.trim());
    setIsTransferred(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Session Top Header Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EDE6DC] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={activeLiveBooking.teacherAvatar}
            alt={activeLiveBooking.teacherName}
            className="w-12 h-12 rounded-full object-cover border border-[#E2D8C9]"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg text-[#243321]">
                {activeLiveBooking.teacherName}
              </h1>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>جلسة مباشرة</span>
              </span>
            </div>
            <p className="text-xs text-[#5C6B5E]">{activeLiveBooking.skillTitle}</p>
          </div>
        </div>

        {/* Timer & Finish Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 bg-[#FAF7F2] py-2 px-3.5 rounded-xl border border-[#DDD5C7] text-xs font-bold text-[#243321] tabular-nums">
            <Clock className="w-4 h-4 text-[#D96827]" />
            <span>الوقت المنقضي: {formatTimer(elapsedSeconds)}</span>
          </div>

          <button
            onClick={handleEndSessionClick}
            className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>إنهاء الجلسة وتقييمها</span>
          </button>
        </div>
      </div>

      {/* Main Session Workspace */}
      {activeLiveBooking.type === 'online' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Video Stream Area (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative bg-[#1A231B] rounded-3xl overflow-hidden aspect-video border border-[#2B3E27] shadow-lg flex flex-col justify-between p-4 sm:p-6 text-white">
              
              {/* Teacher Tile Banner */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{activeLiveBooking.teacherName} (المعلّم)</span>
                </div>
                <div className="text-xs text-[#CBDBC7] bg-black/40 px-2.5 py-1 rounded-md">
                  دقة عالية 1080p
                </div>
              </div>

              {/* Center Teacher View (Simulated) */}
              <div className="my-auto text-center space-y-3 z-10">
                <div className="relative inline-block">
                  <img
                    src={activeLiveBooking.teacherAvatar}
                    alt={activeLiveBooking.teacherName}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#354C30] shadow-md mx-auto"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                    <Mic className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">{activeLiveBooking.teacherName} يتحدث الآن</h3>
                  <p className="text-xs text-white/70">"دعنا نراجع الخطوة التالية معاً..."</p>
                </div>
              </div>

              {/* Self Video PIP (Picture in picture) */}
              <div className="absolute bottom-18 left-4 w-28 sm:w-36 aspect-video bg-[#2D3B2E] rounded-xl border border-white/20 shadow-md overflow-hidden flex items-center justify-center">
                {isVideoOn ? (
                  <div className="relative w-full h-full">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/60 px-1 rounded text-white">
                      أنت
                    </span>
                  </div>
                ) : (
                  <div className="text-center p-2 text-white/60">
                    <VideoOff className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-[10px]">الكاميرا معطلة</span>
                  </div>
                )}
              </div>

              {/* Bottom Control Bar */}
              <div className="z-10 bg-black/50 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-xl transition-colors cursor-pointer ${
                    isMicOn ? 'bg-white/15 hover:bg-white/25 text-white' : 'bg-red-600 text-white'
                  }`}
                  title={isMicOn ? 'كتم الميكروفون' : 'تشغيل الميكروفون'}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-xl transition-colors cursor-pointer ${
                    isVideoOn ? 'bg-white/15 hover:bg-white/25 text-white' : 'bg-red-600 text-white'
                  }`}
                  title={isVideoOn ? 'إيقاف الكاميرا' : 'تشغيل الكاميرا'}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-3 rounded-xl transition-colors cursor-pointer ${
                    isScreenSharing ? 'bg-[#E06D28] text-white' : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                  title="مشاركة الشاشة"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                <button
                  onClick={handleEndSessionClick}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  إنهاء وتحويل الساعات
                </button>
              </div>

            </div>

            {/* Session Goals Card */}
            <div className="bg-white rounded-2xl p-4 border border-[#EDE6DC] text-xs space-y-2">
              <h4 className="font-bold text-[#243321]">ملاحظات ومحاور الجلسة:</h4>
              <p className="text-[#5C6B5E] leading-relaxed">
                {activeLiveBooking.note || 'التركيز على التطبيق العملي والتدريب المباشر على مهارة ' + activeLiveBooking.skillTitle}
              </p>
            </div>
          </div>

          {/* Interactive Chat (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#EDE6DC] shadow-xs flex flex-col h-[520px]">
            <div className="p-4 border-b border-[#EDE6DC] flex items-center gap-2 text-xs font-bold text-[#243321]">
              <MessageSquare className="w-4 h-4 text-[#354C30]" />
              <span>محادثة الجلسة المباشرة</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.isMe ? 'items-start' : 'items-end'}`}
                >
                  <span className="text-[10px] text-[#788875] mb-0.5">{msg.sender}</span>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.isMe
                        ? 'bg-[#354C30] text-white rounded-br-xs'
                        : 'bg-[#FAF7F2] text-[#243321] border border-[#E5DDD0] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-[#A5B3A3] mt-0.5">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-[#EDE6DC] flex gap-2">
              <input
                type="text"
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                placeholder="اكتب رسالة أو رابطاً تعليمياً..."
                className="flex-1 py-2 px-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#354C30] text-white hover:bg-[#2B3E27] transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* In-Person Meeting Guide Card */
        <div className="bg-white rounded-3xl p-8 border border-[#EDE6DC] shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#FDF1E8] text-[#D96827] flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#243321]">لقاء حضوري مباشر</h2>
            <p className="text-xs sm:text-sm text-[#5C6B5E]">
              أنت تلتقي مع {activeLiveBooking.teacherName} في الموقع المحدد أدناه.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE5D8] space-y-2">
            <span className="text-xs font-bold text-[#354C30]">عنوان المكان المتفق عليه:</span>
            <p className="text-sm font-semibold text-[#243321]">
              {activeLiveBooking.locationDetails || 'مساحة العمل الإبداعية المشتركة'}
            </p>
            <p className="text-xs text-[#788875]">يرجى إبراز هذا السجل عند الوصول لتأكيد موعدك.</p>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleEndSessionClick}
              className="py-3 px-8 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white font-bold text-sm transition-all shadow cursor-pointer"
            >
              إنهاء الجلسة الحضورية وتسوية الساعات
            </button>
          </div>
        </div>
      )}

      {/* Post-Completion Rating & Hour Transfer Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full border border-[#EDE6DC] shadow-2xl p-6 sm:p-8 space-y-6 text-center animate-fadeIn">
            
            {!isTransferred ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-[#E5EDE3] text-[#354C30] flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 fill-current text-[#D96827]" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-[#243321]">كيف كانت جلستك التعليمية؟</h3>
                  <p className="text-xs text-[#5C6B5E]">
                    تقييمك لمعلمك {activeLiveBooking.teacherName} يساعد مجتمع بنك الساعات على التطور المستمر.
                  </p>
                </div>

                {/* Interactive Star Rating (تقييم بالنجوم) */}
                <div className="flex items-center justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer focus:outline-none transition-transform hover:scale-115"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'text-[#D96827] fill-[#D96827]'
                            : 'text-[#D9DDD7]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-xs font-bold text-[#354C30]">
                  {rating === 5 && 'جلسة ممتازة ومثمرة جداً ⭐⭐⭐⭐⭐'}
                  {rating === 4 && 'جلسة جيدة جداً ومفيدة ⭐⭐⭐⭐'}
                  {rating === 3 && 'جلسة جيدة ومقبولة ⭐⭐⭐'}
                  {rating <= 2 && 'تحتاج إلى تحسين'}
                </div>

                {/* Comment & Feedback textarea (تعليق) */}
                <div className="text-right">
                  <label className="block text-xs font-bold text-[#243321] mb-1.5">
                    كلمة شكر أو ملاحظات إضافية للمعلم:
                  </label>
                  <textarea
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="اكتب تعليقاً لطيفاً يصف ما تعلمته وكيف كانت تجربة تبادل الوقت معه..."
                    className="w-full p-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE6DC] text-xs text-[#5C6B5E]">
                  <span>عند التأكيد، سيتم </span>
                  <strong className="text-[#354C30]">تحويل {activeLiveBooking.duration} ساعة تلقائياً</strong>
                  <span> من محفظتك إلى محفظة المعلم.</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRatingModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[#DDD5C7] text-xs font-semibold text-[#5C6B5E] hover:bg-[#EAE4D9] cursor-pointer"
                  >
                    متابعة الجلسة
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmCompletion}
                    className="flex-1 py-2.5 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    اعتماد وتحويل الساعات
                  </button>
                </div>
              </>
            ) : (
              /* Success / Transferred State with official receipt */
              <div className="space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#E5EDE3] text-[#354C30] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#243321]">اكتمل التحويل بنجاح!</h3>
                  <p className="text-xs text-[#5C6B5E]">
                    تم إيداع الساعات في رصيد المعلم وتوثيق الجلسة في سجل تبادل المعرفة.
                  </p>
                </div>

                {/* Transfer Receipt Card (سند تحويل زمني) */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] text-right text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-[#354C30] border-b border-[#ECE5D8] pb-2">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>سند تحويل زمني رسمي</span>
                    </span>
                    <span className="text-[10px] text-[#788875] tabular-nums">#TB-{Date.now().toString().slice(-6)}</span>
                  </div>

                  <div className="flex justify-between text-[#5C6B5E]">
                    <span>المتعلم (المحوّل منه):</span>
                    <span className="font-bold text-[#243321]">{user.name}</span>
                  </div>

                  <div className="flex justify-between text-[#5C6B5E]">
                    <span>المعلم (المحوّل إليه):</span>
                    <span className="font-bold text-[#243321]">{activeLiveBooking.teacherName}</span>
                  </div>

                  <div className="flex justify-between text-[#5C6B5E]">
                    <span>المهارة المنفذة:</span>
                    <span className="font-bold text-[#243321]">{activeLiveBooking.skillTitle}</span>
                  </div>

                  <div className="flex justify-between text-[#5C6B5E] pt-1 border-t border-[#ECE5D8]">
                    <span>الساعات المحولة:</span>
                    <span className="font-extrabold text-[#D96827] tabular-nums">
                      + {activeLiveBooking.duration} ساعة كاملة
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={leaveLiveSession}
                  className="w-full py-3 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  العودة إلى ملفي وسجل الجلسات
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

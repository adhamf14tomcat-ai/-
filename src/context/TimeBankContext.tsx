import React, { createContext, useContext, useState, useEffect } from 'react';
import { Teacher, UserProfile, Booking, SessionDuration, SessionType, TeacherSkill } from '../types';
import { INITIAL_TEACHERS, INITIAL_USER } from '../data/mockData';

interface TimeBankContextType {
  user: UserProfile;
  teachers: Teacher[];
  bookings: Booking[];
  activeLiveBooking: Booking | null;
  totalPlatformHours: number;
  currentView: string;
  selectedTeacherForBooking: Teacher | null;
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;
  navigateTo: (view: string) => void;
  openBooking: (teacher: Teacher) => void;
  closeBooking: () => void;
  confirmBooking: (data: {
    teacherId: string;
    teacherName: string;
    teacherAvatar: string;
    skillTitle: string;
    date: string;
    timeSlot: string;
    duration: SessionDuration;
    type: SessionType;
    locationDetails?: string;
    note?: string;
  }) => boolean;
  startLiveSession: (bookingId: string) => void;
  leaveLiveSession: () => void;
  completeSession: (bookingId: string, rating: number, feedback: string) => void;
  addOfferedSkill: (skill: { title: string; category: string; level: string }) => void;
  addWantedSkill: (title: string) => void;
  removeOfferedSkill: (id: string) => void;
  removeWantedSkill: (title: string) => void;
  addWelcomeGrant: () => void;
  clearNotification: () => void;
}

const TimeBankContext = createContext<TimeBankContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'bank_of_hours_user_v1';
const STORAGE_KEY_BOOKINGS = 'bank_of_hours_bookings_v1';
const STORAGE_KEY_HOURS = 'bank_of_hours_platform_counter_v1';

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-sample-1',
    teacherId: 'teacher-1',
    teacherName: 'نور المنصور',
    teacherAvatar: INITIAL_TEACHERS[0].avatar,
    skillTitle: 'فن الخط العربي والتكوين البصري',
    date: 'اليوم',
    timeSlot: '٠٥:٠٠ م - ٠٦:٠٠ م',
    duration: 1,
    type: 'online',
    note: 'مراجعة أولية لقواعد خط الرقعة والديواني',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'book-sample-2',
    teacherId: 'teacher-2',
    teacherName: 'كريم الحسيني',
    teacherAvatar: INITIAL_TEACHERS[1].avatar,
    skillTitle: 'تطوير تطبيقات الويب بـ React و TypeScript',
    date: 'غداً',
    timeSlot: '٠٧:٣٠ م - ٠٨:٣٠ م',
    duration: 1,
    type: 'online',
    note: 'استشارة حول هيكلة كود تطبيق كبير والتحكم بالحالة',
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'book-sample-3',
    teacherId: 'teacher-4',
    teacherName: 'طارق زياد الكردي',
    teacherAvatar: INITIAL_TEACHERS[3].avatar,
    skillTitle: 'أساسيات التصوير الفوتوغرافي وإدارة الإضاءة',
    date: 'الأسبوع الماضي',
    timeSlot: '٠٤:٠٠ م - ٠٦:٠٠ م',
    duration: 2,
    type: 'in_person',
    locationDetails: 'مساحة العمل الإبداعية، حي الياسمين - الرياض',
    note: 'تدريب عملي على إضاءة البورتريه',
    status: 'completed',
    hoursTransferred: 2,
    ratingGiven: 5,
    feedbackGiven: 'جلسة عملية رائعة نقلتني لمستوى متقدم في فهم الضوء الطبيعي والاستوديو!',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  }
];

export const TimeBankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [teachers] = useState<Teacher[]>(INITIAL_TEACHERS);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [totalPlatformHours, setTotalPlatformHours] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HOURS);
      return saved ? parseFloat(saved) : 14842;
    } catch {
      return 14842;
    }
  });

  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState<Teacher | null>(null);
  const [activeLiveBookingId, setActiveLiveBookingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HOURS, totalPlatformHours.toString());
    } catch (e) {
      console.error(e);
    }
  }, [totalPlatformHours]);

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  const clearNotification = () => setNotification(null);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBooking = (teacher: Teacher) => {
    setSelectedTeacherForBooking(teacher);
  };

  const closeBooking = () => {
    setSelectedTeacherForBooking(null);
  };

  const confirmBooking = (data: {
    teacherId: string;
    teacherName: string;
    teacherAvatar: string;
    skillTitle: string;
    date: string;
    timeSlot: string;
    duration: SessionDuration;
    type: SessionType;
    locationDetails?: string;
    note?: string;
  }): boolean => {
    // Check if user has sufficient hours balance
    if (user.hoursBalance < data.duration) {
      showNotification(`رصيدك الحالي (${user.hoursBalance} ساعة) لا يكفي لحجز جلسة مدتها ${data.duration} ساعة. يمكنك إضافة مهارة لتعليم الآخرين وشحن رصيدك!`, 'warning');
      return false;
    }

    // Deduct hours immediately for the escrow reservation
    const newBalance = Math.round((user.hoursBalance - data.duration) * 10) / 10;
    setUser(prev => ({
      ...prev,
      hoursBalance: newBalance,
      totalHoursLearned: Math.round((prev.totalHoursLearned + data.duration) * 10) / 10,
    }));

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      teacherId: data.teacherId,
      teacherName: data.teacherName,
      teacherAvatar: data.teacherAvatar,
      skillTitle: data.skillTitle,
      date: data.date,
      timeSlot: data.timeSlot,
      duration: data.duration,
      type: data.type,
      locationDetails: data.locationDetails,
      note: data.note,
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => [newBooking, ...prev]);
    setSelectedTeacherForBooking(null);
    showNotification(`تم تأكيد حجز جلستك مع ${data.teacherName} بنجاح! تم خصم ${data.duration} ساعة من رصيدك.`, 'success');
    return true;
  };

  const startLiveSession = (bookingId: string) => {
    setActiveLiveBookingId(bookingId);
    setCurrentView('live-session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const leaveLiveSession = () => {
    setActiveLiveBookingId(null);
    setCurrentView('sessions');
  };

  const completeSession = (bookingId: string, rating: number, feedback: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Mark booking completed
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'completed',
          hoursTransferred: b.duration,
          ratingGiven: rating,
          feedbackGiven: feedback,
        };
      }
      return b;
    }));

    // Increment platform counter
    setTotalPlatformHours(prev => prev + booking.duration);

    // Update user stats or badges if applicable
    setUser(prev => {
      const updatedBadges = prev.badges.map(b => {
        if (b.id === 'b-2' && !b.unlocked) {
          const totalExchanged = prev.totalHoursTaught + prev.totalHoursLearned;
          if (totalExchanged >= 100) {
            return { ...b, unlocked: true, progress: '١٠٠ ساعة منجزة' };
          }
          return { ...b, progress: `${totalExchanged} / ١٠٠ ساعة` };
        }
        return b;
      });
      return {
        ...prev,
        badges: updatedBadges,
      };
    });

    showNotification(`تم إتمام الجلسة وتحويل ${booking.duration} ساعة بنجاح إلى المعلم مع تقييمك!`, 'success');
  };

  const addOfferedSkill = (skillData: { title: string; category: string; level: string }) => {
    const newSkill: TeacherSkill = {
      id: `off-${Date.now()}`,
      title: skillData.title,
      category: skillData.category,
      level: skillData.level,
      hoursCompleted: 0,
    };
    setUser(prev => ({
      ...prev,
      offeredSkills: [newSkill, ...prev.offeredSkills],
      // Reward user with 1 welcome credit for offering a skill to encourage participation
      hoursBalance: Math.round((prev.hoursBalance + 1) * 10) / 10,
    }));
    showNotification(`تمت إضافة مهارة "${skillData.title}" إلى ملفك الشخصي ومُنحت +1 ساعة ترحيبية!`, 'success');
  };

  const removeOfferedSkill = (id: string) => {
    setUser(prev => ({
      ...prev,
      offeredSkills: prev.offeredSkills.filter(s => s.id !== id),
    }));
    showNotification('تم حذف المهارة من قائمة المهارات المعروضة.', 'info');
  };

  const addWantedSkill = (title: string) => {
    if (!title.trim()) return;
    setUser(prev => ({
      ...prev,
      wantedSkills: [title.trim(), ...prev.wantedSkills],
    }));
    showNotification(`تمت إضافة "${title}" إلى المهارات التي تبحث عنها.`, 'success');
  };

  const removeWantedSkill = (title: string) => {
    setUser(prev => ({
      ...prev,
      wantedSkills: prev.wantedSkills.filter(t => t !== title),
    }));
    showNotification('تمت إزالة المهارة المطلوبة.', 'info');
  };

  const addWelcomeGrant = () => {
    setUser(prev => ({
      ...prev,
      hoursBalance: Math.round((prev.hoursBalance + 2) * 10) / 10,
    }));
    showNotification('تمت إضافة منحة مجتمعية (+2 ساعة) إلى رصيدك لتجربة حجز الجلسات بحرية!', 'success');
  };

  const activeLiveBooking = bookings.find(b => b.id === activeLiveBookingId) || null;

  return (
    <TimeBankContext.Provider
      value={{
        user,
        teachers,
        bookings,
        activeLiveBooking,
        totalPlatformHours,
        currentView,
        selectedTeacherForBooking,
        notification,
        navigateTo,
        openBooking,
        closeBooking,
        confirmBooking,
        startLiveSession,
        leaveLiveSession,
        completeSession,
        addOfferedSkill,
        addWantedSkill,
        removeOfferedSkill,
        removeWantedSkill,
        addWelcomeGrant,
        clearNotification,
      }}
    >
      {children}
    </TimeBankContext.Provider>
  );
};

export const useTimeBank = () => {
  const context = useContext(TimeBankContext);
  if (!context) {
    throw new Error('useTimeBank must be used within a TimeBankProvider');
  }
  return context;
};

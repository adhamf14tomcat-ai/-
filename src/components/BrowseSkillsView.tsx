import React, { useState, useMemo } from 'react';
import { useTimeBank } from '../context/TimeBankContext';
import { CATEGORIES, CITIES } from '../data/mockData';
import { Teacher } from '../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Video, 
  Users, 
  Star, 
  Clock, 
  Check, 
  Sparkles,
  X
} from 'lucide-react';

export const BrowseSkillsView: React.FC = () => {
  const { teachers, openBooking } = useTimeBank();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedCity, setSelectedCity] = useState('الكل');
  const [selectedType, setSelectedType] = useState<'all' | 'online' | 'in_person'>('all');
  const [minRating, setMinRating] = useState<number>(0);

  // Filtered teachers list
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      // Search matching
      const matchesSearch =
        searchQuery.trim() === '' ||
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.primarySkill.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.bio.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      const matchesCategory =
        selectedCategory === 'الكل' || teacher.category === selectedCategory;

      // City matching
      const matchesCity =
        selectedCity === 'الكل' || teacher.city === selectedCity;

      // Type matching
      const matchesType =
        selectedType === 'all' || teacher.type === selectedType;

      // Rating matching
      const matchesRating = teacher.rating >= minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCity &&
        matchesType &&
        matchesRating
      );
    });
  }, [teachers, searchQuery, selectedCategory, selectedCity, selectedType, minRating]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('الكل');
    setSelectedCity('الكل');
    setSelectedType('all');
    setMinRating(0);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'الكل' ||
    selectedCity !== 'الكل' ||
    selectedType !== 'all' ||
    minRating > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2 text-right">
        <h1 className="text-3xl font-extrabold text-[#243321]">تصفّح المهارات والمعلمين</h1>
        <p className="text-sm sm:text-base text-[#5C6B5E]">
          اختر المهارة التي ترغب بتعلّمها، وتواصل مباشرة مع معلمين متطوعين يشاركونك وقتهم بساعة مقابل ساعة.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#EDE6DC] shadow-sm space-y-5">
        
        {/* Search Input Row */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#788875]">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المهارة (مثال: بايثون، خط عربي، إنجليزية للأعمال) أو اسم المعلم..."
            className="w-full pr-11 pl-4 py-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-sm text-[#243321] placeholder-[#8F9E8D] focus:outline-none focus:ring-2 focus:ring-[#354C30] focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#8F9E8D] hover:text-[#243321]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Horizontal Tabs */}
        <div>
          <span className="text-xs font-bold text-[#5C6B5E] block mb-2">التصنيفات:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#354C30] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#5C6B5E] hover:bg-[#EAE4D9]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#F2ECE3]">
          
          {/* City selector */}
          <div>
            <label className="block text-xs font-bold text-[#5C6B5E] mb-1.5">
              المدينة أو النطاق الجغرافي:
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full py-2 px-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-lg text-xs font-medium text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city === 'الكل' ? 'جميع المدن' : city}
                </option>
              ))}
            </select>
          </div>

          {/* Type selector (Online vs In-person) */}
          <div>
            <label className="block text-xs font-bold text-[#5C6B5E] mb-1.5">
              طريقة تقديم الجلسة:
            </label>
            <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-lg border border-[#DDD5C7]">
              <button
                type="button"
                onClick={() => setSelectedType('all')}
                className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedType === 'all'
                    ? 'bg-white text-[#243321] shadow-xs font-bold'
                    : 'text-[#6B7C6D] hover:text-[#243321]'
                }`}
              >
                الكل
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('online')}
                className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedType === 'online'
                    ? 'bg-white text-[#243321] shadow-xs font-bold'
                    : 'text-[#6B7C6D] hover:text-[#243321]'
                }`}
              >
                أونلاين
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('in_person')}
                className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedType === 'in_person'
                    ? 'bg-white text-[#243321] shadow-xs font-bold'
                    : 'text-[#6B7C6D] hover:text-[#243321]'
                }`}
              >
                حضوري
              </button>
            </div>
          </div>

          {/* Rating filter */}
          <div>
            <label className="block text-xs font-bold text-[#5C6B5E] mb-1.5">
              الحد الأدنى للتقييم:
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full py-2 px-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-lg text-xs font-medium text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
            >
              <option value={0}>جميع التقييمات</option>
              <option value={4.5}>٤.٥ نجوم فما فوق</option>
              <option value={4.8}>٤.٨ نجوم فما فوق</option>
              <option value={5.0}>٥.٠ نجوم كاملة</option>
            </select>
          </div>

        </div>

        {/* Active filter counter and clear button */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 text-xs text-[#5C6B5E]">
            <span>
              عرض <strong className="text-[#243321]">{filteredTeachers.length}</strong> من أصل {teachers.length} معلم
            </span>
            <button
              onClick={resetFilters}
              className="text-[#D96827] hover:underline font-semibold cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}

      </div>

      {/* Teachers Grid */}
      {filteredTeachers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#EDE6DC] p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#788875] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#243321]">لم نجد معلمين يطابقون خيارات البحث</h3>
          <p className="text-xs sm:text-sm text-[#5C6B5E] max-w-md mx-auto">
            جرب تخفيف شروط التصفية أو البحث عن مهارة أخرى كـ "البرمجة" أو "الخط العربي".
          </p>
          <button
            onClick={resetFilters}
            className="py-2 px-5 rounded-xl bg-[#354C30] text-white text-xs font-semibold cursor-pointer"
          >
            عرض جميع المعلمين
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onBook={() => openBooking(teacher)}
            />
          ))}
        </div>
      )}

    </div>
  );
};

// Sub-component: Teacher Card
interface TeacherCardProps {
  teacher: Teacher;
  onBook: () => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onBook }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5.5 flex flex-col justify-between hover:border-[#354C30]/50 transition-all hover:shadow-md">
      
      {/* Top section: Avatar & Details */}
      <div>
        <div className="flex items-start gap-3.5 mb-4">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#FAF7F2] shadow-xs shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base text-[#243321] truncate">
              {teacher.name}
            </h3>
            <p className="text-xs text-[#6B7C6D] line-clamp-1 mb-1.5">
              {teacher.title}
            </p>

            {/* Unboxed metadata line with typographic separators */}
            <div className="flex items-center gap-1.5 text-xs text-[#5C6B5E]">
              <span className="flex items-center text-[#D96827] font-bold">
                <Star className="w-3.5 h-3.5 fill-current ml-0.5" />
                {teacher.rating.toFixed(1)}
              </span>
              <span className="text-[#8F9E8D]">({teacher.reviewsCount})</span>
              <span aria-hidden="true" className="text-[#BFCAC0]">·</span>
              <span className="flex items-center gap-1 text-[#5C6B5E]">
                <MapPin className="w-3 h-3 text-[#788875]" />
                {teacher.city}
              </span>
              <span aria-hidden="true" className="text-[#BFCAC0]">·</span>
              <span>{teacher.type === 'online' ? 'أونلاين' : 'حضوري'}</span>
            </div>
          </div>
        </div>

        {/* Primary Skill Box */}
        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#ECE5D8] mb-3.5">
          <span className="text-[11px] font-bold text-[#354C30] block mb-1">
            المهارة المعروضة:
          </span>
          <p className="text-sm font-semibold text-[#243321] leading-snug">
            {teacher.primarySkill}
          </p>
        </div>

        {/* Bio */}
        <p className="text-xs text-[#5C6B5E] leading-relaxed line-clamp-3 mb-4">
          {teacher.bio}
        </p>

        {/* Sample Learner Review Quote if available */}
        {teacher.reviews.length > 0 && (
          <div className="mb-4 pt-3 border-t border-[#F2ECE3] text-[11px] text-[#6B7C6D] italic">
            "{teacher.reviews[0].comment}"
            <span className="block not-italic text-[10px] text-[#8F9E8D] mt-0.5 font-medium">
              — {teacher.reviews[0].userName} ({teacher.reviews[0].date})
            </span>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 border-t border-[#F2ECE3] flex items-center justify-between">
        <div className="text-xs text-[#6B7C6D]">
          <span>أنجزت </span>
          <strong className="text-[#243321] font-bold tabular-nums">
            {teacher.hoursCompleted}
          </strong>
          <span> ساعة تبادل</span>
        </div>

        <button
          onClick={onBook}
          className="py-2.5 px-4 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white text-xs font-bold transition-all shadow-xs hover:shadow-sm cursor-pointer"
        >
          احجز جلسة
        </button>
      </div>

    </div>
  );
};

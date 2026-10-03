import React, { useState } from 'react';
import { useTimeBank } from '../context/TimeBankContext';
import { CATEGORIES } from '../data/mockData';
import { X, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface AddSkillModalProps {
  onClose: () => void;
}

export const AddSkillModal: React.FC<AddSkillModalProps> = ({ onClose }) => {
  const { addOfferedSkill } = useTimeBank();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]); // e.g. برمجة وتطوير
  const [level, setLevel] = useState('مبتدئ إلى متوسط');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addOfferedSkill({
      title: title.trim(),
      category,
      level,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#EDE6DC] shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#EDE6DC] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E5EDE3] text-[#354C30] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D96827]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#243321]">أضف مهارة جديدة لتعليمها</h2>
              <p className="text-xs text-[#5C6B5E]">شارك خبرتك مع المجتمع واكسب ساعات لمشوارك التعليمي</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#788875] hover:text-[#243321] rounded-full hover:bg-[#EAE4D9]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-[#243321] mb-1.5">
              عنوان المهارة أو التخصص:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: أساسيات التصميم ببرنامج Figma، أو تحدث الإسبانية للمبتدئين..."
              className="w-full py-2.5 px-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#243321] mb-1.5">
                التصنيف:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
              >
                {CATEGORIES.filter(c => c !== 'الكل').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243321] mb-1.5">
                المستوى المستهدف:
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
              >
                <option value="مبتدئ">مبتدئ تماماً</option>
                <option value="مبتدئ إلى متوسط">مبتدئ إلى متوسط</option>
                <option value="متوسط">متوسط</option>
                <option value="متقدم واحترافي">متقدم واحترافي</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#243321] mb-1.5">
              وصف مختصر لما سيتعلمه المستفيد خلال الجلسة:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مثال: سأساعدك على تثبيت الأدوات وفهم الأساسيات وتطبيق أول تمرين عملي خطوة بخطوة..."
              className="w-full p-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs text-[#243321] focus:outline-none focus:ring-1 focus:ring-[#354C30]"
            />
          </div>

          {/* Reward notice */}
          <div className="p-3 rounded-2xl bg-[#E5EDE3] border border-[#CBDEC8] flex items-center gap-2.5 text-xs text-[#243321]">
            <Clock className="w-4 h-4 text-[#354C30] shrink-0" />
            <span>
              إضافة مهارة جديدة تمنحك <strong className="text-[#354C30]">+1 ساعة ترحيبية فورية</strong> في محفظتك تشجيعاً للمشاركة!
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-[#DDD5C7] text-xs font-semibold text-[#5C6B5E] hover:bg-[#EAE4D9]"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-[#354C30] hover:bg-[#2B3E27] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>نشر المهارة وإضافتها للمحفظة</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

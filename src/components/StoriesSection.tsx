import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import { BookOpen, User, Calendar, ArrowRight, X, Sparkles, Quote, Plus } from 'lucide-react';
import { StoryItem } from '../types';

export const StoriesSection: React.FC = () => {
  const { stories, isDarkMode, setActiveTab, currentUser } = useFamily();
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Kisah Leluhur', 'Cerita Anak', 'Cerita Cucu', 'Kenangan'];

  const filteredStories = activeCategory === 'ALL'
    ? stories
    : stories.filter(s => s.category === activeCategory);

  return (
    <div className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#101f18] text-emerald-100' : 'bg-[#fcfbf7] text-[#1a2e26]'} transition-colors duration-300 border-t border-[#d4af37]/20`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#d4af37]/30 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] dark:text-[#ffe885] border border-[#2d6a4f]/20 font-semibold text-xs uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" /> Artikel & Catatan Sejarah
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Cerita & Kenangan <span className="text-[#2d6a4f] dark:text-[#d4af37]">Keluarga Besar</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-200/80 max-w-2xl font-serif-islamic italic">
              Kisah hikmah, rahasia kuliner warisan, hingga perjuangan anak-cucu merantau mengarungi kehidupan yang patut dicontoh.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 dark:bg-[#0e1c16] p-1.5 rounded-2xl border border-gray-200 dark:border-emerald-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#1b4332] text-[#ffe885] shadow font-bold' 
                    : 'text-gray-600 dark:text-emerald-300 hover:text-gray-900'
                }`}
              >
                {cat === 'ALL' ? '⚡ Semua Cerita' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div 
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className={`group rounded-3xl overflow-hidden border-2 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between ${
                isDarkMode ? 'bg-[#152a21] border-[#2d6a4f]/50 hover:border-[#d4af37]' : 'bg-white border-gray-200 hover:border-[#1b4332]'
              }`}
            >
              {/* Cover Image */}
              <div className="relative aspect-16/9 overflow-hidden bg-black/10">
                <img 
                  src={story.cover || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'} 
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {story.category && (
                  <span className="absolute top-4 left-4 bg-[#1b4332] text-[#ffe885] text-xs font-bold px-3 py-1 rounded-full border border-[#d4af37]/40 shadow">
                    {story.category}
                  </span>
                )}
              </div>

              {/* Story Summary content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400 dark:text-emerald-300/80">
                    <span className="flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-[#d4af37]" /> {story.author}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> {new Date(story.date || story.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1b4332] dark:text-white group-hover:text-[#2d6a4f] dark:group-hover:text-[#ffe885] transition-colors line-clamp-2 leading-tight">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/80 line-clamp-3 leading-relaxed font-serif-islamic">
                    {story.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-emerald-800/40 flex items-center justify-between text-xs font-bold text-[#2d6a4f] dark:text-[#d4af37] group-hover:translate-x-1 transition-transform">
                  <span>Baca Artikel Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}

          {filteredStories.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-500 italic bg-gray-50 dark:bg-[#152a21] rounded-3xl border border-dashed">
              Belum ada artikel atau cerita untuk kategori ini.
            </div>
          )}
        </div>

        {/* Add Story CTA */}
        {currentUser && (
          <div className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] p-6 sm:p-8 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#d4af37]/40 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-heading font-bold text-lg sm:text-xl text-[#ffe885]">Punya kenangan manis atau cerita inspiratif keluarga?</h4>
              <p className="text-xs sm:text-sm text-emerald-100">Tulislah kisah Anda agar menjadi pelajaran berharga dan kenangan abadi bagi anak cucu kita.</p>
            </div>
            <button
              onClick={() => setActiveTab('admin')}
              className="bg-[#d4af37] hover:bg-[#ffe885] text-[#1b4332] font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow shrink-0 transition-all"
            >
              <Plus className="w-4 h-4" /> Tulis Cerita Baru di Admin
            </button>
          </div>
        )}

      </div>

      {/* Story Detail Read Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md animate-fadeIn">
          <div className={`max-w-3xl w-full rounded-3xl border-2 border-[#d4af37] shadow-2xl overflow-hidden my-8 ${
            isDarkMode ? 'bg-[#122c21] text-white' : 'bg-white text-gray-800'
          }`}>
            
            {/* Modal Cover Header */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-black">
              <img 
                src={selectedStory.cover || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'} 
                alt={selectedStory.title}
                className="w-full h-full object-cover opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122c21] via-black/40 to-transparent"></div>
              
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 inset-x-6 space-y-2 text-white">
                {selectedStory.category && (
                  <span className="bg-[#d4af37] text-[#1b4332] text-xs font-bold px-3 py-1 rounded-full shadow">
                    {selectedStory.category}
                  </span>
                )}
                <h2 className="font-heading text-2xl sm:text-3xl font-bold leading-tight text-white drop-shadow">
                  {selectedStory.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-emerald-200 font-medium">
                  <span>Ditulis oleh: <strong>{selectedStory.author}</strong></span>
                  <span>•</span>
                  <span>{new Date(selectedStory.date || selectedStory.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Modal Body / Article Content */}
            <div className="p-6 sm:p-10 space-y-6 max-h-[60vh] overflow-y-auto font-serif-islamic text-sm sm:text-base leading-relaxed whitespace-pre-line text-gray-700 dark:text-emerald-100">
              <div className="flex items-start gap-3 bg-[#fcfbf7] dark:bg-[#0e1c16] p-4 rounded-2xl border border-[#d4af37]/30 text-xs italic font-sans text-gray-600 dark:text-emerald-200">
                <Quote className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  "Catatan sejarah ini adalah bagian dari arsip digital keluarga besar Abah Odang & Enin Ucah. Semoga memberikan rahmat dan inspirasi."
                </span>
              </div>

              {selectedStory.content}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-100 dark:bg-[#0e1c16] px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-emerald-800/40 text-xs text-gray-500 font-sans">
              <span>Arsip Cerita Keluarga • ID: <strong className="font-mono">{selectedStory.id}</strong></span>
              <button
                onClick={() => setSelectedStory(null)}
                className="bg-[#1b4332] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#2d6a4f] transition-colors"
              >
                Tutup Artikel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

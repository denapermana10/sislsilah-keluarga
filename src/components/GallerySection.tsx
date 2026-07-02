import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import { 
  Image as ImageIcon, 
  Video, 
  Calendar, 
  Filter, 
  Maximize2, 
  X, 
  Upload, 
  Sparkles,
  Play
} from 'lucide-react';
import { GalleryItem, GalleryCategory } from '../types';

export const GallerySection: React.FC = () => {
  const { gallery, isDarkMode, setActiveTab, currentUser } = useFamily();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['ALL', 'Foto Lama', 'Foto Baru', 'Pernikahan', 'Reuni', 'Liburan', 'Hari Raya', 'Video'];

  const filteredGallery = selectedCategory === 'ALL'
    ? gallery
    : gallery.filter(g => g.category === selectedCategory);

  return (
    <div className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#0e1c16] text-emerald-100' : 'bg-[#fcfbf7] text-[#1a2e26]'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#d4af37]/30 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] dark:text-[#ffe885] border border-[#2d6a4f]/20 font-semibold text-xs uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5" /> Kenangan & Dokumentasi
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Galeri Foto & <span className="text-[#2d6a4f] dark:text-[#d4af37]">Video Keluarga</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-200/80 max-w-2xl font-serif-islamic italic">
              Kumpulan potret sejarah dari era Abah Odang & Enin Ucah di Cigadung hingga reuni akbar 4 turunan saat ini.
            </p>
          </div>

          {/* Quick Action to Upload */}
          <button
            onClick={() => setActiveTab('admin')}
            className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#1b4332] text-[#ffe885] font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-[#d4af37]/40 shadow transition-all self-start lg:self-auto"
          >
            <Upload className="w-4 h-4 text-[#d4af37]" />
            <span>Unggah Foto / Video di Admin</span>
          </button>
        </div>

        {/* Categories Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#d4af37] text-[#1b4332] font-bold shadow-md scale-105' 
                  : 'bg-gray-100 dark:bg-[#152a21] text-gray-700 dark:text-emerald-200 hover:bg-gray-200'
              }`}
            >
              {cat === 'ALL' ? '⚡ Semua Galeri (' + gallery.length + ')' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div 
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className={`group relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1.5 ${
                isDarkMode ? 'bg-[#152a21] border-[#2d6a4f]/50 hover:border-[#d4af37]' : 'bg-white border-gray-200 hover:border-[#1b4332]'
              }`}
            >
              {/* Image Thumbnail */}
              <div className="relative aspect-4/3 overflow-hidden bg-black/10">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                
                {/* Category tag */}
                <span className="absolute top-3 left-3 bg-[#1b4332]/90 backdrop-blur-xs text-[#ffe885] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#d4af37]/40 shadow">
                  {item.category}
                </span>

                {item.category === 'Video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37] text-[#1b4332] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-[#1b4332] ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Info Caption */}
              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-emerald-300/70 font-mono">
                  <span>{item.date ? new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : item.created_at}</span>
                </div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-[#1b4332] dark:text-white line-clamp-1 group-hover:text-[#d4af37] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-emerald-200/80 line-clamp-2 leading-snug">
                  {item.description || 'Kenangan abadi keluarga Abah Odang & Enin Ucah.'}
                </p>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-[#1b4332] text-white text-[10px] py-1.5 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" /> Lihat Foto Penuh
              </div>
            </div>
          ))}

          {filteredGallery.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-500 italic bg-gray-50 dark:bg-[#152a21] rounded-3xl border border-dashed">
              Belum ada foto atau video dalam kategori ini. Silakan unggah di Dashboard Admin!
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Preview Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-5xl w-full bg-[#122c21] rounded-3xl overflow-hidden border-2 border-[#d4af37] shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Image View */}
            <div className="flex-1 bg-black flex items-center justify-center p-4 overflow-hidden min-h-[300px]">
              <img 
                src={lightboxItem.image} 
                alt={lightboxItem.title}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl" 
              />
            </div>

            {/* Info Panel */}
            <div className="w-full md:w-80 p-6 sm:p-8 text-white flex flex-col justify-between border-l border-[#2d6a4f]/50 bg-[#152a21] overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-[#d4af37] text-[#1b4332] text-xs font-bold px-3 py-1 rounded-full">
                    {lightboxItem.category}
                  </span>
                  <span className="text-xs text-emerald-300 font-mono">
                    {lightboxItem.date || lightboxItem.created_at}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-[#ffe885]">
                  {lightboxItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-serif-islamic italic">
                  "{lightboxItem.description || 'Tidak ada deskripsi tambahan.'}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2d6a4f] text-xs text-emerald-300 space-y-2">
                <div className="flex justify-between">
                  <span>ID Foto:</span>
                  <strong className="font-mono">{lightboxItem.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Penyimpanan:</span>
                  <strong>Supabase Storage</strong>
                </div>
                <button
                  onClick={() => {
                    setLightboxItem(null);
                    setActiveTab('admin');
                  }}
                  className="w-full mt-4 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold py-2 rounded-xl text-xs transition-colors border border-[#d4af37]/30"
                >
                  Kelola Foto di Admin
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

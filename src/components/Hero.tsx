import React from 'react';
import { useFamily } from '../context/FamilyContext';
import { Trees, UserPlus, Image as ImageIcon, Users, Heart, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, members, openAddMemberModal } = useFamily();

  // Stats calculation
  const totalMembers = members.length;
  const gen1Count = members.filter(m => m.generation === 1).length;
  const gen2Count = members.filter(m => m.generation === 2).length;
  const gen3Count = members.filter(m => m.generation === 3).length;
  const gen4Count = members.filter(m => m.generation === 4).length;

  return (
    <div className="relative bg-gradient-to-b from-[#1b4332] via-[#2d6a4f] to-[#fcfbf7] text-white pt-12 pb-24 overflow-hidden border-b border-[#d4af37]/30">
      {/* Decorative background Islamic geometry / patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Subtle glowing orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#122c21]/80 border border-[#d4af37]/60 text-[#ffe885] text-xs font-semibold shadow-inner animate-bounce">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Dokumentasi Digital Silsilah 4 Turunan</span>
            </div>

            {/* Main Title */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
              Silsilah Keluarga Besar <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#ffe885] to-[#f0a500]">
                Abah Odang & Enin Ucah
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100 font-serif-islamic italic max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              "Menjaga silaturahmi, mengenang leluhur, dan mewariskan sejarah keluarga kepada generasi berikutnya agar ikatan batin tidak pernah terputus oleh waktu maupun jarak."
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveTab('silsilah');
                  const el = document.getElementById('silsilah-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-[#d4af37] to-[#f0a500] hover:from-[#ffe885] hover:to-[#d4af37] text-[#1b4332] font-heading font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2.5 text-sm"
              >
                <Trees className="w-5 h-5 text-[#1b4332]" />
                <span>Lihat Pohon Silsilah</span>
              </button>

              <button
                onClick={() => openAddMemberModal()}
                className="bg-[#1b4332]/80 hover:bg-[#122c21] text-white font-heading font-semibold px-6 py-3.5 rounded-xl border-2 border-[#d4af37]/60 hover:border-[#ffe885] transition-all flex items-center gap-2.5 text-sm shadow-md group"
              >
                <UserPlus className="w-5 h-5 text-[#d4af37] group-hover:scale-110 transition-transform" />
                <span>Tambah Anggota & Foto Keluarga</span>
              </button>

              <button
                onClick={() => setActiveTab('galeri')}
                className="bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white font-medium px-5 py-3.5 rounded-xl transition-all flex items-center gap-2 text-sm backdrop-blur-sm border border-white/20"
              >
                <ImageIcon className="w-5 h-5 text-emerald-300" />
                <span>Galeri Keluarga</span>
              </button>
            </div>

            {/* Quick Family Reference Link */}
            <div className="pt-2">
              <a 
                href="https://drive.google.com/file/d/1WbFmRfG4p89aetw52ZseayGvrBDOfyHp/view?usp=sharing" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-[#ffe885] underline underline-offset-4 transition-colors"
              >
                <span>📎 Referensi Foto & Dokumen Silsilah Asli (Google Drive)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero Banner Showcase & Generational Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Gold Decorative Frame */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#d4af37] via-[#2d6a4f] to-[#f0a500] rounded-3xl blur-md opacity-70"></div>
              
              {/* Main Card */}
              <div className="relative bg-[#122c21] rounded-2xl border-2 border-[#d4af37] overflow-hidden shadow-2xl p-6 text-white space-y-6">
                
                {/* Hero Portrait Showcase of Abah Odang & Enin Ucah */}
                <div className="relative rounded-xl overflow-hidden border-2 border-[#d4af37]/80 bg-[#1b4332] shadow-xl group">
                  <div className="aspect-[16/9] w-full relative overflow-hidden">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1WbFmRfG4p89aetw52ZseayGvrBDOfyHp=w1000" 
                      alt="Abah Odang dan Enin Ucah"
                      onError={(e) => {
                        e.currentTarget.src = 'https://drive.google.com/thumbnail?id=1WbFmRfG4p89aetw52ZseayGvrBDOfyHp&sz=w1000';
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#122c21] via-black/20 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#122c21] via-[#122c21]/90 to-transparent flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-[#ffe885] uppercase block flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#d4af37]" /> Leluhur Utama (Gen 1)
                      </span>
                      <h4 className="font-heading font-bold text-base text-white drop-shadow">Abah Odang & Enin Ucah</h4>
                    </div>
                    <span className="text-[10px] bg-[#d4af37] text-[#1b4332] px-2.5 py-1 rounded-full font-bold shadow">1928 - 2016</span>
                  </div>
                </div>

                {/* Header inside card */}
                <div className="flex items-center justify-between border-b border-[#2d6a4f] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37] text-[#1b4332] font-bold text-xl flex items-center justify-center font-heading shadow-inner">
                      4G
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#ffe885]">
                        Silsilah 4 Turunan
                      </h3>
                      <p className="text-xs text-emerald-200">
                        Dari Abah Odang hingga Cicit
                      </p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2.5 py-1 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Terverifikasi
                  </span>
                </div>

                {/* Visual Representation of 4 Generations */}
                <div className="space-y-3">
                  {/* Gen 1 */}
                  <div className="bg-[#1b4332]/80 p-3 rounded-xl border border-[#d4af37]/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#d4af37] text-[#1b4332] text-xs font-bold flex items-center justify-center">1</span>
                      <div>
                        <div className="text-xs font-bold text-white">Leluhur Utama (Gen 1)</div>
                        <div className="text-[11px] text-[#ffe885] font-serif-islamic">Abah Odang & Enin Ucah</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold bg-[#2d6a4f] px-2.5 py-0.5 rounded-full text-emerald-100">{gen1Count} Orang</span>
                  </div>

                  {/* Gen 2 */}
                  <div className="bg-[#1b4332]/60 p-3 rounded-xl border border-emerald-700/40 flex items-center justify-between ml-3 border-l-4 border-l-[#d4af37]">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                      <div>
                        <div className="text-xs font-bold text-white">Anak (Gen 2)</div>
                        <div className="text-[10px] text-emerald-200">4 Putra-Putri & Pasangan</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold bg-[#2d6a4f] px-2.5 py-0.5 rounded-full text-emerald-100">{gen2Count} Orang</span>
                  </div>

                  {/* Gen 3 */}
                  <div className="bg-[#1b4332]/40 p-3 rounded-xl border border-emerald-800/40 flex items-center justify-between ml-6 border-l-4 border-l-[#f0a500]">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">3</span>
                      <div>
                        <div className="text-xs font-bold text-white">Cucu (Gen 3)</div>
                        <div className="text-[10px] text-emerald-200">Generasi Penerus & Profesional</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold bg-[#2d6a4f] px-2.5 py-0.5 rounded-full text-emerald-100">{gen3Count} Orang</span>
                  </div>

                  {/* Gen 4 */}
                  <div className="bg-[#1b4332]/30 p-3 rounded-xl border border-emerald-900/40 flex items-center justify-between ml-9 border-l-4 border-l-[#ffe885]">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold flex items-center justify-center">4</span>
                      <div>
                        <div className="text-xs font-bold text-white">Cicit (Gen 4)</div>
                        <div className="text-[10px] text-emerald-200">Generasi Muda Harapan Masa Depan</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold bg-[#2d6a4f] px-2.5 py-0.5 rounded-full text-emerald-100">{gen4Count} Orang</span>
                  </div>
                </div>

                {/* Footer stats summary */}
                <div className="bg-[#1b4332] rounded-xl p-3 flex items-center justify-between text-xs border border-[#d4af37]/30">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#d4af37]" />
                    <span className="font-semibold text-emerald-100">Total Anggota Terdata:</span>
                  </div>
                  <span className="text-base font-bold text-[#ffe885] font-heading">{totalMembers} Anggota</span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Floating Quick Stats Cards Bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 bg-white/95 text-[#1a2e26] rounded-2xl p-6 shadow-xl border border-[#d4af37]/40 backdrop-blur-md transform translate-y-12">
          
          <div className="text-center sm:text-left border-r border-gray-200 pr-4 last:border-r-0">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f] flex items-center justify-center sm:justify-start gap-1">
              <Trees className="w-4 h-4 text-[#d4af37]" /> Generasi
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-[#1b4332] mt-1">4 Turunan</div>
            <div className="text-[11px] text-gray-500">Leluhur hingga Cicit</div>
          </div>

          <div className="text-center sm:text-left border-r border-gray-200 pr-4 last:border-r-0">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f] flex items-center justify-center sm:justify-start gap-1">
              <Users className="w-4 h-4 text-[#d4af37]" /> Total Anggota
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-[#1b4332] mt-1">{totalMembers} Orang</div>
            <div className="text-[11px] text-gray-500">Aktif & Almarhum</div>
          </div>

          <div className="text-center sm:text-left border-r border-gray-200 pr-4 last:border-r-0">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f] flex items-center justify-center sm:justify-start gap-1">
              <Heart className="w-4 h-4 text-[#d4af37]" /> Cabang Keluarga
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-[#1b4332] mt-1">4 Cabang</div>
            <div className="text-[11px] text-gray-500">Kang Asep, Ceu Siti, Mang Dedi, Teh Rini</div>
          </div>

          <div className="text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f] flex items-center justify-center sm:justify-start gap-1">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> Status Data
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-[#2d6a4f] mt-1">Terverifikasi</div>
            <div className="text-[11px] text-gray-500">Supabase Ready</div>
          </div>

        </div>

      </div>
    </div>
  );
};

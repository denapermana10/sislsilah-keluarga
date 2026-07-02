import React from 'react';
import { useFamily } from '../context/FamilyContext';
import { Heart, MapPin, Phone, Mail, Share2, Shield, Trees, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, isDarkMode } = useFamily();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`${isDarkMode ? 'bg-[#0b1711] text-emerald-100' : 'bg-[#1b4332] text-white'} border-t-4 border-[#d4af37] transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Tentang Keluarga */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#ffe885] flex items-center justify-center text-[#1b4332] font-heading font-bold text-base shadow">
                AO
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">
                  ABAH ODANG & ENIN UCAH
                </h3>
                <p className="text-[11px] text-[#d4af37] uppercase tracking-wider font-semibold">
                  Silsilah Keluarga 4 Turunan
                </p>
              </div>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed font-serif-islamic italic">
              "Menjaga silaturahmi, mengenang leluhur, dan mewariskan sejarah keluarga kepada generasi berikutnya agar tali persaudaraan tidak pernah putus."
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] bg-[#2d6a4f] text-[#ffe885] px-2.5 py-1 rounded-full border border-[#d4af37]/30 flex items-center gap-1 font-medium">
                <Trees className="w-3 h-3" /> 4 Generasi Terdata
              </span>
            </div>
          </div>

          {/* Col 2: Menu Cepat */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#d4af37] uppercase tracking-wider mb-4 border-b border-[#2d6a4f] pb-2">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActiveTab('beranda'); scrollToTop(); }} className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#d4af37]">›</span> Beranda
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('tentang'); scrollToTop(); }} className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#d4af37]">›</span> Tentang Keluarga & Filosofi
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('silsilah'); scrollToTop(); }} className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#d4af37]">›</span> Pohon Silsilah (4 Turunan)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('data_anggota'); scrollToTop(); }} className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#d4af37]">›</span> Data Anggota Lengkap
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('galeri'); scrollToTop(); }} className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#d4af37]">›</span> Galeri & Video Kenangan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak & Alamat Leluhur */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#d4af37] uppercase tracking-wider mb-4 border-b border-[#2d6a4f] pb-2">
              Alamat Leluhur & Kontak
            </h4>
            <ul className="space-y-3 text-xs text-emerald-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  <strong>Rumah Leluhur (Cigadung):</strong><br />
                  Jl. Raya Cigadung No. 45, Bandung, Jawa Barat
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Admin Keluarga: <strong>+62 812-3456-7800</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Email: <strong>admin@abahodang.fam</strong></span>
              </li>
            </ul>
          </div>

          {/* Col 4: Aksi & Akses Admin */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#d4af37] uppercase tracking-wider mb-4 border-b border-[#2d6a4f] pb-2">
              Akses & Kontributor
            </h4>
            <p className="text-xs text-emerald-100/80 mb-4 leading-relaxed">
              Apakah Anda anggota keluarga yang belum terdaftar atau ingin memperbarui data?
            </p>
            <div className="space-y-2">
              <button 
                onClick={() => { setActiveTab('buku_tamu'); scrollToTop(); }}
                className="w-full bg-[#d4af37] hover:bg-[#ffe885] text-[#1b4332] font-bold py-2 px-4 rounded-lg text-xs transition-all shadow flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" /> Usulkan Anggota Baru
              </button>
              <button 
                onClick={() => { setActiveTab('admin'); scrollToTop(); }}
                className="w-full bg-[#2d6a4f] hover:bg-[#3d8a67] text-white font-medium py-2 px-4 rounded-lg text-xs transition-all border border-[#d4af37]/40 flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-[#d4af37]" /> Masuk Dashboard Admin
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2d6a4f] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-4">
          <div className="flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} Keluarga Besar Abah Odang & Enin Ucah.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-emerald-200">
              Dibuat dengan <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" /> untuk menjaga silaturahmi.
            </span>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1 bg-[#2d6a4f] hover:bg-[#3d8a67] text-white px-3 py-1.5 rounded-full text-xs transition-all border border-[#d4af37]/30"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

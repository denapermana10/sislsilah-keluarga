import React from 'react';
import { useFamily } from '../context/FamilyContext';
import { BookOpen, Heart, Award, Shield, Sparkles, MapPin, Calendar, Quote } from 'lucide-react';

export const AboutFamily: React.FC = () => {
  const { isDarkMode } = useFamily();

  return (
    <div className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#101f18] text-emerald-100' : 'bg-[#fcfbf7] text-[#1a2e26]'} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] dark:text-[#ffe885] border border-[#2d6a4f]/20 font-semibold text-xs uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Tentang Keluarga Besar
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Sejarah, Riwayat & <span className="text-[#2d6a4f] dark:text-[#d4af37]">Filosofi Leluhur</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-emerald-200/80 leading-relaxed font-serif-islamic italic">
            "Satu akar yang tertanam kuat di Tanah Sunda, tumbuh merindang menjadi tempat berteduh bagi empat generasi anak, cucu, dan cicit."
          </p>
        </div>

        {/* Riwayat Abah Odang & Enin Ucah (2 Column Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Abah Odang Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border-2 transition-all shadow-lg hover:shadow-xl ${
            isDarkMode ? 'bg-[#152a21] border-[#d4af37]/40' : 'bg-white border-[#d4af37]/60'
          }`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80" 
                  alt="Abah Odang" 
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-[#d4af37] shadow-md"
                />
                <span className="absolute -bottom-2 -right-2 bg-[#1b4332] text-[#ffe885] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#d4af37]">
                  Gen 1
                </span>
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="text-xs font-bold text-[#2d6a4f] dark:text-[#ffe885] uppercase tracking-wider">
                  Sosok Pengayom & Pendidik
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold">
                  Abah Odang <br />
                  <span className="text-sm font-normal text-gray-500 dark:text-emerald-300">(H. Odang Wiratmadja)</span>
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-gray-500 dark:text-emerald-200/70 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Tasikmalaya
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> 1928 - 2010
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-emerald-800/40 space-y-3 text-xs sm:text-sm text-gray-700 dark:text-emerald-100/90 leading-relaxed">
              <p>
                Lahir di lingkungan pesantren di Tasikmalaya pada tahun 1928, Abah Odang tumbuh menjadi seorang pendidik dan tokoh masyarakat yang sangat dihormati di Bandung.
              </p>
              <p>
                Beliau mengajarkan bahwa pendidikan tinggi dan akhlak mulia adalah bekal utama bagi setiap anak. Keteguhan pendirian dan kelembutan tutur katanya selalu menjadi inspirasi bagi seluruh keturunannya.
              </p>
            </div>
            
            <div className="mt-6 bg-[#fcfbf7] dark:bg-[#101f18] p-4 rounded-xl border border-[#d4af37]/30 flex items-start gap-3">
              <Quote className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="text-xs italic text-gray-600 dark:text-emerald-200 font-serif-islamic">
                "Ulah lali ka purwadaksi, dimana wae urang berada, tetep ingat dari mana kita berasal dan tetap jaga silaturahmi dengan saudara."
              </p>
            </div>
          </div>

          {/* Enin Ucah Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border-2 transition-all shadow-lg hover:shadow-xl ${
            isDarkMode ? 'bg-[#152a21] border-[#d4af37]/40' : 'bg-white border-[#d4af37]/60'
          }`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80" 
                  alt="Enin Ucah" 
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-[#d4af37] shadow-md"
                />
                <span className="absolute -bottom-2 -right-2 bg-[#1b4332] text-[#ffe885] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#d4af37]">
                  Gen 1
                </span>
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="text-xs font-bold text-[#2d6a4f] dark:text-[#ffe885] uppercase tracking-wider">
                  Sosok Kelembutan & Wirausaha
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold">
                  Enin Ucah <br />
                  <span className="text-sm font-normal text-gray-500 dark:text-emerald-300">(Hj. Sukaesih Ucah)</span>
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-gray-500 dark:text-emerald-200/70 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Garut
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> 1932 - 2016
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-emerald-800/40 space-y-3 text-xs sm:text-sm text-gray-700 dark:text-emerald-100/90 leading-relaxed">
              <p>
                Berasal dari keluarga pengrajin batik dan kuliner di Garut, Enin Ucah adalah jantung dari keramaian rumah Cigadung. Keahlian memasak masakan khas Sunda membuat setiap anggota keluarga rindu pulang.
              </p>
              <p>
                Dengan kesabaran luar biasa dan ketekunan berdagang kain, beliau mendampingi Abah Odang membesarkan 4 putra-putri hingga sukses meraih gelar sarjana dan pascasarjana.
              </p>
            </div>
            
            <div className="mt-6 bg-[#fcfbf7] dark:bg-[#101f18] p-4 rounded-xl border border-[#d4af37]/30 flex items-start gap-3">
              <Quote className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="text-xs italic text-gray-600 dark:text-emerald-200 font-serif-islamic">
                "Rumah adalah tempat berkumpulnya cinta. Sebanyak apapun urusan di luar, meja makan keluarga selalu terbuka untuk anak-cucu."
              </p>
            </div>
          </div>

        </div>

        {/* Filosofi & Nilai-Nilai Keluarga Section */}
        <div className={`p-8 sm:p-12 rounded-3xl border-2 ${
          isDarkMode ? 'bg-[#122c21] border-[#2d6a4f]' : 'bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white'
        } shadow-2xl relative overflow-hidden`}>
          
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-[#d4af37]" />
              Filosofi & Nilai-Nilai Keluarga
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-serif-islamic italic">
              Pedoman hidup yang diwariskan oleh Abah Odang & Enin Ucah untuk generasi anak, cucu, hingga cicit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Nilai 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 space-y-3 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37] text-[#1b4332] flex items-center justify-center font-bold text-xl shadow">
                1
              </div>
              <h4 className="font-heading font-bold text-lg text-[#ffe885]">
                Silih Asih (Saling Mengasihi)
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Antar saudara dan keluarga harus dibangun di atas dasar kasih sayang yang tulus. Tidak saling iri, melainkan selalu berempati dan siap membentangkan tangan saat saudara membutuhkan.
              </p>
            </div>

            {/* Nilai 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 space-y-3 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37] text-[#1b4332] flex items-center justify-center font-bold text-xl shadow">
                2
              </div>
              <h4 className="font-heading font-bold text-lg text-[#ffe885]">
                Silih Asah (Saling Mencerahkan)
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Keluarga adalah tempat untuk terus belajar dan mengasah ilmu, baik ilmu dunia maupun akhirat. Generasi yang lebih tua membimbing yang muda, sementara yang muda menghormati yang tua.
              </p>
            </div>

            {/* Nilai 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 space-y-3 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37] text-[#1b4332] flex items-center justify-center font-bold text-xl shadow">
                3
              </div>
              <h4 className="font-heading font-bold text-lg text-[#ffe885]">
                Silih Asuh (Saling Menjaga)
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Menjaga nama baik keluarga dan saling melindungi. Jika ada satu anggota keluarga yang sukses, ia harus menjadi pengayom dan pembukakan jalan bagi saudara-saudaranya yang lain.
              </p>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-8 text-center text-xs text-emerald-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>Pendidikan & Ilmu Pengetahuan</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#d4af37]" />
              <span>Silaturahmi Tanpa Batas</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span>Ketegwaan & Akhlak Islami</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

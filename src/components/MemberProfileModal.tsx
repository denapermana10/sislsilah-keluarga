import React from 'react';
import { useFamily } from '../context/FamilyContext';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Heart, 
  Users, 
  Share2, 
  QrCode, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Trees
} from 'lucide-react';
import { FamilyMember } from '../types';

export const MemberProfileModal: React.FC = () => {
  const { selectedMemberForModal, setSelectedMemberForModal, members, isDarkMode, setActiveTab } = useFamily();

  if (!selectedMemberForModal) return null;

  const member = selectedMemberForModal;
  const isDeceased = !!member.tanggal_wafat;

  // Find spouse
  const spouse = members.find(m => m.spouse_id === member.id || member.spouse_id === m.id);

  // Find parents
  const parent = member.parent_id ? members.find(m => m.id === member.parent_id) : null;
  const parentSpouse = parent ? members.find(m => m.spouse_id === parent.id || parent.spouse_id === m.id) : null;

  // Find children
  const children = members.filter(m => m.parent_id === member.id);

  // Helper formatting dates
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === '-') return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  // WhatsApp helper
  const getWaLink = (phone: string) => {
    const clean = phone.replace(/[^0-9]/g, '');
    let formatted = clean;
    if (formatted.startsWith('0')) formatted = '62' + formatted.substring(1);
    return `https://wa.me/${formatted}?text=Halo%20${encodeURIComponent(member.nama_panggilan)},%20salam%20silaturahmi%20dari%20website%20Silsilah%20Abah%20Odang%20&%20Enin%20Ucah!`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-sm animate-fadeIn">
      <div className={`max-w-3xl w-full rounded-3xl border-2 border-[#d4af37] shadow-2xl overflow-hidden my-8 ${
        isDarkMode ? 'bg-[#122c21] text-white' : 'bg-white text-gray-800'
      }`}>
        
        {/* Modal Header Banner */}
        <div className="relative bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#122c21] p-6 text-white border-b border-[#d4af37]/40">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#d4af37] text-[#1b4332] font-bold text-base flex items-center justify-center font-heading shadow">
                G{member.generation}
              </span>
              <div>
                <span className="text-[10px] text-[#ffe885] font-semibold uppercase tracking-widest block">
                  Generasi ke-{member.generation} • {member.branch || 'Keluarga Besar'}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold leading-tight text-white">
                  {member.nama}
                </h3>
                <p className="text-xs text-emerald-200">
                  Nama Panggilan: <strong className="text-[#ffe885]">{member.nama_panggilan}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedMemberForModal(null)}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Top Section: Photo & Quick Contact Actions */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-200 dark:border-emerald-800/40 pb-8">
            <div className="relative shrink-0">
              <img 
                src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
                alt={member.nama}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border-4 border-[#d4af37] shadow-xl"
              />
              <span className={`absolute -bottom-3 inset-x-4 py-1 text-center text-xs font-bold rounded-full shadow ${
                isDeceased ? 'bg-gray-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {isDeceased ? 'Almarhum / Almh.' : 'Aktif'}
              </span>
            </div>

            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="text-xs font-semibold bg-[#2d6a4f]/10 text-[#2d6a4f] dark:text-[#ffe885] px-2.5 py-1 rounded-full border border-[#2d6a4f]/20">
                    {member.jenis_kelamin === 'L' ? 'Laki-Laki (L)' : 'Perempuan (P)'}
                  </span>
                  <span className="text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {member.pekerjaan !== '-' ? member.pekerjaan : 'Anggota Keluarga'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/90 leading-relaxed italic bg-gray-50 dark:bg-black/20 p-3 rounded-xl border border-gray-200 dark:border-emerald-800/40">
                  "{member.bio || 'Belum ada biografi singkat. Silakan tambahkan melalui dashboard admin.'}"
                </p>
              </div>

              {/* Action Buttons (WhatsApp, Email, QR Code) */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                {member.whatsapp && member.whatsapp !== '-' && !isDeceased && (
                  <a
                    href={getWaLink(member.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat WhatsApp</span>
                  </a>
                )}

                {member.email && member.email !== '-' && (
                  <a
                    href={`mailto:${member.email}`}
                    className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Mail className="w-4 h-4 text-[#d4af37]" />
                    <span>Email</span>
                  </a>
                )}

                <button
                  onClick={() => alert(`⚡ QR Code Profil untuk [${member.nama}] berhasil disalin/disiapkan! Anggota keluarga lain dapat memindai QR ini saat reuni.`)}
                  className="bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#2d6a4f] dark:text-[#ffe885] px-3.5 py-2 rounded-xl text-xs font-bold border border-[#d4af37] flex items-center gap-1.5 transition-all"
                >
                  <QrCode className="w-4 h-4 text-[#d4af37]" />
                  <span>QR Code Profil</span>
                </button>
              </div>
            </div>
          </div>

          {/* Middle Section: Detailed Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#152a21] border border-gray-200 dark:border-emerald-800/50 space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#2d6a4f] dark:text-[#ffe885] flex items-center gap-1.5 border-b border-gray-200 dark:border-emerald-800 pb-2">
                <Calendar className="w-4 h-4 text-[#d4af37]" /> Kelahiran & Wafat
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-emerald-200/70">Tempat Lahir:</span>
                  <strong className="text-right">{member.tempat_lahir || '-'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-emerald-200/70">Tanggal Lahir:</span>
                  <strong className="text-right">{formatDate(member.tanggal_lahir)}</strong>
                </div>
                {member.tanggal_wafat && (
                  <div className="flex justify-between text-rose-600 dark:text-rose-300 font-bold">
                    <span>Tanggal Wafat:</span>
                    <span className="text-right">{formatDate(member.tanggal_wafat)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#152a21] border border-gray-200 dark:border-emerald-800/50 space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#2d6a4f] dark:text-[#ffe885] flex items-center gap-1.5 border-b border-gray-200 dark:border-emerald-800 pb-2">
                <GraduationCap className="w-4 h-4 text-[#d4af37]" /> Pendidikan & Pekerjaan
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-emerald-200/70">Pendidikan Terakhir:</span>
                  <strong className="text-right">{member.pendidikan || '-'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-emerald-200/70">Profesi / Pekerjaan:</span>
                  <strong className="text-right">{member.pekerjaan || '-'}</strong>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 p-4 rounded-2xl bg-gray-50 dark:bg-[#152a21] border border-gray-200 dark:border-emerald-800/50 space-y-2">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#2d6a4f] dark:text-[#ffe885] flex items-center gap-1.5 border-b border-gray-200 dark:border-emerald-800 pb-2">
                <MapPin className="w-4 h-4 text-[#d4af37]" /> Alamat Domisili
              </h4>
              <p className="text-xs font-semibold">{member.alamat || 'Alamat belum dilengkapi'}</p>
            </div>

          </div>

          {/* Family Relations Section: Parents, Spouse, Children */}
          <div className="space-y-4 pt-2">
            <h4 className="font-heading font-bold text-sm text-[#1b4332] dark:text-[#ffe885] uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <Trees className="w-4 h-4 text-[#d4af37]" /> Hubungan & Keturunan Keluarga
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Parents */}
              <div className="p-3 rounded-xl border border-gray-200 dark:border-emerald-800 bg-white dark:bg-black/20">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Orang Tua Kandung</div>
                {parent ? (
                  <button 
                    onClick={() => setSelectedMemberForModal(parent)}
                    className="w-full text-left flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-white/5 p-1 rounded-lg transition-colors"
                  >
                    <img src={parent.photo_url} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 border" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate text-[#1b4332] dark:text-[#ffe885]">{parent.nama_panggilan}</div>
                      <div className="text-[10px] text-gray-500 truncate">{parent.nama}</div>
                    </div>
                  </button>
                ) : (
                  <div className="text-xs text-gray-500 italic">
                    {member.generation === 1 ? 'Leluhur Utama (Generasi Pertama)' : 'Data orang tua belum terhubung'}
                  </div>
                )}
              </div>

              {/* Spouse */}
              <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/20">
                <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">Pasangan / Suami-Istri</div>
                {spouse ? (
                  <button 
                    onClick={() => setSelectedMemberForModal(spouse)}
                    className="w-full text-left flex items-center gap-2 hover:bg-amber-100/50 dark:hover:bg-amber-900/20 p-1 rounded-lg transition-colors"
                  >
                    <img src={spouse.photo_url} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 border border-amber-400" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate text-amber-900 dark:text-amber-200">{spouse.nama_panggilan}</div>
                      <div className="text-[10px] text-gray-500 dark:text-emerald-200/70 truncate">{spouse.nama}</div>
                    </div>
                  </button>
                ) : (
                  <div className="text-xs text-gray-500 italic">Belum ada / tidak tercatat</div>
                )}
              </div>

              {/* Children */}
              <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-2">
                  Anak ({children.length})
                </div>
                {children.length > 0 ? (
                  <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                    {children.map(ch => (
                      <button 
                        key={ch.id}
                        onClick={() => setSelectedMemberForModal(ch)}
                        className="w-full text-left flex items-center gap-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 p-1 rounded-lg transition-colors"
                      >
                        <img src={ch.photo_url} alt="" className="w-6 h-6 rounded-full object-cover shrink-0 border" />
                        <span className="text-xs font-semibold truncate text-[#1b4332] dark:text-[#ffe885]">{ch.nama_panggilan}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 italic">Belum ada anak tercatat</div>
                )}
              </div>

            </div>
          </div>

          {/* QR Code Sharing Banner */}
          <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] p-4 rounded-2xl text-white flex items-center justify-between gap-4 border border-[#d4af37]/40 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center text-black">
                <QrCode className="w-10 h-10 text-[#1b4332]" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-sm text-[#ffe885]">Kartu Identitas Digital Anggota</h5>
                <p className="text-[11px] text-emerald-100">Gunakan saat check-in kehadiran Reuni Keluarga atau silaturahmi.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedMemberForModal(null);
                setActiveTab('admin');
              }}
              className="bg-[#d4af37] hover:bg-[#ffe885] text-[#1b4332] font-bold text-xs px-4 py-2 rounded-xl shrink-0 transition-all shadow"
            >
              Edit di Admin
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-100 dark:bg-[#0e1c16] px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-emerald-800/40 text-xs text-gray-500">
          <span>ID Anggota: <strong className="font-mono">{member.id}</strong></span>
          <button
            onClick={() => setSelectedMemberForModal(null)}
            className="bg-[#1b4332] text-white px-5 py-2 rounded-xl font-semibold hover:bg-[#2d6a4f] transition-colors"
          >
            Tutup Profil
          </button>
        </div>

      </div>
    </div>
  );
};

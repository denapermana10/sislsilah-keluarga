import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import { 
  MessageSquare, 
  UserPlus, 
  Send, 
  CheckCircle, 
  Heart, 
  Sparkles, 
  User, 
  Calendar, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const GuestbookSection: React.FC = () => {
  const { guestbook, addGuestbookEntry, addProposal, isDarkMode, currentUser, setActiveTab, openAddMemberModal } = useFamily();

  const [activeTabSub, setActiveTabSub] = useState<'guestbook' | 'proposal'>('guestbook');

  // Form guestbook
  const [gbName, setGbName] = useState('');
  const [gbRelation, setGbRelation] = useState('');
  const [gbMessage, setGbMessage] = useState('');
  const [gbSuccess, setGbSuccess] = useState(false);

  // Form proposal
  const [propSubmitter, setPropSubmitter] = useState('');
  const [propContact, setPropContact] = useState('');
  const [propName, setPropName] = useState('');
  const [propNickname, setPropNickname] = useState('');
  const [propGen, setPropGen] = useState<number>(4);
  const [propGender, setPropGender] = useState<'L' | 'P'>('L');
  const [propRelationNote, setPropRelationNote] = useState('');
  const [propSuccess, setPropSuccess] = useState(false);

  const handleSubGb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gbName || !gbMessage) {
      alert('Mohon lengkapi nama dan ucapan Anda.');
      return;
    }
    addGuestbookEntry({
      name: gbName,
      relation: gbRelation || 'Kerabat Keluarga',
      message: gbMessage
    });
    setGbName('');
    setGbRelation('');
    setGbMessage('');
    setGbSuccess(true);
    setTimeout(() => setGbSuccess(false), 4000);
  };

  const handleSubProp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propName || !propSubmitter) {
      alert('Mohon isi nama anggota yang diusulkan dan kontak pengusul.');
      return;
    }
    addProposal({
      submitter_name: propSubmitter,
      submitter_contact: propContact || '-',
      proposed_member: {
        nama: propName,
        nama_panggilan: propNickname || propName.split(' ')[0],
        generation: propGen as any,
        jenis_kelamin: propGender,
        tempat_lahir: 'Bandung',
        tanggal_lahir: '2000-01-01',
        pekerjaan: '-',
        pendidikan: '-',
        alamat: '-'
      },
      relation_note: propRelationNote || 'Diantrekan untuk peninjauan admin'
    });
    setPropSubmitter('');
    setPropContact('');
    setPropName('');
    setPropNickname('');
    setPropRelationNote('');
    setPropSuccess(true);
    setTimeout(() => setPropSuccess(false), 5000);
  };

  return (
    <div className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#101f18] text-emerald-100' : 'bg-[#fcfbf7] text-[#1a2e26]'} transition-colors duration-300 border-t border-[#d4af37]/20`}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] dark:text-[#ffe885] border border-[#2d6a4f]/20 font-semibold text-xs uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" /> Silaturahmi & Usulan Data
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Buku Tamu & <span className="text-[#2d6a4f] dark:text-[#d4af37]">Usulan Anggota Baru</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-200/80 leading-relaxed font-serif-islamic italic">
            "Tinggalkan jejak sapaan silaturahmi Anda di buku tamu digital, atau ajukan usulan penambahan anak/cucu baru yang belum terdata."
          </p>
        </div>

        {/* Tab Toggle & Quick Add */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-gray-100 dark:bg-[#0e1c16] p-1.5 rounded-2xl border border-gray-200 dark:border-emerald-800 inline-flex gap-2">
            <button
              onClick={() => setActiveTabSub('guestbook')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTabSub === 'guestbook' 
                  ? 'bg-[#1b4332] text-[#ffe885] shadow-md' 
                  : 'text-gray-600 dark:text-emerald-300 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Buku Tamu Digital ({guestbook.length})
            </button>
            <button
              onClick={() => setActiveTabSub('proposal')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTabSub === 'proposal' 
                  ? 'bg-[#d4af37] text-[#1b4332] shadow-md' 
                  : 'text-gray-600 dark:text-emerald-300 hover:text-gray-900'
              }`}
            >
              <UserPlus className="w-4 h-4" /> Usulkan Anggota Baru
            </button>
          </div>

          <button
            onClick={() => openAddMemberModal()}
            className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#1b4332] text-[#ffe885] font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg border border-[#d4af37]/60 transition-all hover:scale-105"
          >
            <UserPlus className="w-4 h-4 text-[#d4af37]" /> Tambah Langsung ke Pohon Silsilah & Upload Foto
          </button>
        </div>

        {/* Tab 1: Guestbook */}
        {activeTabSub === 'guestbook' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Column */}
            <div className="lg:col-span-5">
              <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl ${
                isDarkMode ? 'bg-[#152a21] border-[#2d6a4f]/50' : 'bg-white border-[#d4af37]/60'
              }`}>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1b4332] dark:text-[#ffe885] mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  Tulis Pesan Silaturahmi
                </h3>
                <p className="text-xs text-gray-500 dark:text-emerald-200/80 mb-6">
                  Pesan Anda akan langsung tampil di daftar buku tamu keluarga besar.
                </p>

                {gbSuccess && (
                  <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs mb-6 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Alhamdulillah! Pesan silaturahmi Anda berhasil diterbitkan.</span>
                  </div>
                )}

                <form onSubmit={handleSubGb} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-emerald-200">Nama Anda *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Kang Asep / Cucu Nadia"
                      value={gbName}
                      onChange={(e) => setGbName(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] text-gray-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-gray-300 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-emerald-200">Hubungan Keluarga / Asal</label>
                    <input
                      type="text"
                      placeholder="e.g., Anak ke-1 / Cucu dr Cabang Mang Dedi / Sahabat Keluarga"
                      value={gbRelation}
                      onChange={(e) => setGbRelation(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] text-gray-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-gray-300 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-emerald-200">Ucapan / Doa Silaturahmi *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tuliskan doa, kesan, atau kabar hangat Anda untuk keluarga besar..."
                      value={gbMessage}
                      onChange={(e) => setGbMessage(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] text-gray-900 dark:text-white rounded-xl p-3.5 border border-gray-300 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#1b4332] text-[#ffe885] font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" /> Kirim Ucapan Silaturahmi
                  </button>
                </form>
              </div>
            </div>

            {/* List Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base uppercase tracking-wider text-[#2d6a4f] dark:text-[#d4af37]">
                  Daftar Ucapan & Doa Keluarga ({guestbook.length})
                </h4>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {guestbook.map((entry) => (
                  <div 
                    key={entry.id}
                    className={`p-5 rounded-2xl border transition-all shadow-sm ${
                      isDarkMode ? 'bg-[#152a21]/80 border-emerald-800/40' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#1b4332] dark:text-[#ffe885] font-bold text-xs">
                          {entry.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-heading font-bold text-sm text-[#1b4332] dark:text-white">{entry.name}</h5>
                          <p className="text-[10px] text-[#2d6a4f] dark:text-[#d4af37] font-semibold">{entry.relation}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {entry.created_at}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 dark:text-emerald-100/90 leading-relaxed font-serif-islamic pl-10">
                      "{entry.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Proposal Form */}
        {activeTabSub === 'proposal' && (
          <div className="max-w-3xl mx-auto">
            <div className={`p-6 sm:p-10 rounded-3xl border-2 shadow-2xl ${
              isDarkMode ? 'bg-[#152a21] border-[#d4af37]' : 'bg-white border-[#d4af37]'
            }`}>
              <div className="text-center space-y-2 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 text-[#d4af37] mx-auto flex items-center justify-center">
                  <UserPlus className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1b4332] dark:text-[#ffe885]">
                  Formulir Usulan Anggota Baru
                </h3>
                <p className="text-xs text-gray-500 dark:text-emerald-200/80 max-w-lg mx-auto">
                  Sesuai PRD Bagian 27: Usulan yang Anda kirim akan masuk antrean (pending) untuk ditinjau dan disetujui oleh Admin Keluarga di Dashboard Admin.
                </p>
              </div>

              {propSuccess && (
                <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl text-xs mb-8 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 shrink-0 text-emerald-400" />
                  <div>
                    <strong className="block text-sm">Usulan Berhasil Dikirim ke Antrean Admin!</strong>
                    <span>Admin akan memverifikasi dan menyetujui data agar muncul di Pohon Silsilah 4 Turunan.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubProp} className="space-y-6 text-xs">
                
                {/* Data Pengusul */}
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0e1c16] border border-gray-200 dark:border-emerald-800/50 space-y-4">
                  <h4 className="font-heading font-bold text-sm text-[#2d6a4f] dark:text-[#d4af37] border-b pb-2">
                    1. Data Pengusul (Anda)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Nama Pengusul *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama lengkap Anda"
                        value={propSubmitter}
                        onChange={(e) => setPropSubmitter(e.target.value)}
                        className="w-full bg-white dark:bg-[#152a21] text-gray-900 dark:text-white rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">WhatsApp / Email Pengusul *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nomor WA / Email aktif"
                        value={propContact}
                        onChange={(e) => setPropContact(e.target.value)}
                        className="w-full bg-white dark:bg-[#152a21] text-gray-900 dark:text-white rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Data Anggota yang Diusulkan */}
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0e1c16] border border-gray-200 dark:border-emerald-800/50 space-y-4">
                  <h4 className="font-heading font-bold text-sm text-[#2d6a4f] dark:text-[#d4af37] border-b pb-2">
                    2. Identitas Anggota Keluarga yang Diusulkan
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Nama Lengkap Anggota *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Bintang Alamsyah"
                        value={propName}
                        onChange={(e) => setPropName(e.target.value)}
                        className="w-full bg-white dark:bg-[#152a21] text-gray-900 dark:text-white rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Nama Panggilan *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Bintang"
                        value={propNickname}
                        onChange={(e) => setPropNickname(e.target.value)}
                        className="w-full bg-white dark:bg-[#152a21] text-gray-900 dark:text-white rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Generasi Ke-berapa?</label>
                      <select
                        value={propGen}
                        onChange={(e) => setPropGen(Number(e.target.value))}
                        className="w-full bg-white dark:bg-[#152a21] text-gray-900 dark:text-white rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-700"
                      >
                        <option value={2}>Gen 2 (Anak Abah Odang)</option>
                        <option value={3}>Gen 3 (Cucu)</option>
                        <option value={4}>Gen 4 (Cicit - Generasi Muda)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Jenis Kelamin</label>
                      <select
                        value={propGender}
                        onChange={(e) => setPropGender(e.target.value as 'L' | 'P')}
                        className="w-full bg-white dark:bg-[#152a21] text-gray-900 dark:text-white rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-700"
                      >
                        <option value="L">Laki-Laki (L)</option>
                        <option value="P">Perempuan (P)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Catatan Hubungan Keluarga *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Anak ke-2 dari pasangan Farhan & Syifa (Cabang Ceu Siti)"
                      value={propRelationNote}
                      onChange={(e) => setPropRelationNote(e.target.value)}
                      className="w-full bg-white dark:bg-[#152a21] text-gray-900 dark:text-white rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-700"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentUser && (currentUser.role === 'Super Admin' || currentUser.role === 'Admin Keluarga')) {
                        setActiveTab('admin');
                      } else {
                        alert('Anda harus masuk sebagai Admin Keluarga untuk meninjau usulan ini.');
                      }
                    }}
                    className="text-xs text-[#2d6a4f] dark:text-[#d4af37] underline hover:font-bold"
                  >
                    👉 Admin? Klik ke Dashboard Tinjauan
                  </button>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#d4af37] to-[#f0a500] hover:from-[#ffe885] hover:to-[#d4af37] text-[#1b4332] font-heading font-bold px-8 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" /> Kirim Usulan Anggota
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

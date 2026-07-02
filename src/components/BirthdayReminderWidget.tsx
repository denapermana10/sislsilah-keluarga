import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import { FamilyMember } from '../types';
import { 
  Gift, 
  Calendar, 
  Bell, 
  BellRing, 
  MessageCircle, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  PartyPopper,
  ChevronRight,
  User
} from 'lucide-react';

interface UpcomingBirthday {
  member: FamilyMember;
  daysUntil: number;
  turningAge: number;
  birthdayDate: string;
}

export const BirthdayReminderWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { members, isDarkMode, setSelectedMemberForModal } = useFamily();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [showAllMonth, setShowAllMonth] = useState<boolean>(false);
  const [sentGreetings, setSentGreetings] = useState<{ [key: string]: boolean }>({});
  const [notificationEmail, setNotificationEmail] = useState<string>('');
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed
  const currentDay = now.getDate();

  // Calculate upcoming birthdays in next 7 days and in current month
  const upcoming7Days: UpcomingBirthday[] = [];
  const thisMonthBirthdays: UpcomingBirthday[] = [];

  members.forEach(member => {
    if (!member.tanggal_lahir) return;
    const parts = member.tanggal_lahir.split('-');
    if (parts.length !== 3) return;

    const birthYear = parseInt(parts[0], 10);
    const birthMonth = parseInt(parts[1], 10) - 1; // 0-indexed
    const birthDay = parseInt(parts[2], 10);

    // Calculate birthday for current year
    let bdayThisYear = new Date(currentYear, birthMonth, birthDay);
    
    // If birthday already passed this year, check next year for 7-day calculation
    let bdayForDiff = bdayThisYear;
    if (bdayThisYear < new Date(currentYear, currentMonth, currentDay)) {
      bdayForDiff = new Date(currentYear + 1, birthMonth, birthDay);
    }

    const diffTime = bdayForDiff.getTime() - new Date(currentYear, currentMonth, currentDay).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const turningAge = (bdayForDiff.getFullYear()) - birthYear;

    const formattedDate = new Date(currentYear, birthMonth, birthDay).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long'
    });

    const bdayObj: UpcomingBirthday = {
      member,
      daysUntil: diffDays,
      turningAge,
      birthdayDate: formattedDate
    };

    if (diffDays >= 0 && diffDays <= 7) {
      upcoming7Days.push(bdayObj);
    }

    if (birthMonth === currentMonth) {
      thisMonthBirthdays.push(bdayObj);
    }
  });

  // Sort by closest days
  upcoming7Days.sort((a, b) => a.daysUntil - b.daysUntil);
  thisMonthBirthdays.sort((a, b) => {
    const dayA = parseInt(a.member.tanggal_lahir?.split('-')[2] || '0', 10);
    const dayB = parseInt(b.member.tanggal_lahir?.split('-')[2] || '0', 10);
    return dayA - dayB;
  });

  const handleSendGreeting = (member: FamilyMember, platform: 'wa' | 'email') => {
    const greetingText = `Assalamu'alaikum ${member.nama_panggilan || member.nama}. Selamat ulang tahun! Semoga panjang umur, sehat selalu, berkah rezekinya, dan senantiasa dalam lindungan Allah SWT. Aamiin 🤲🎉 - Dari Keluarga Besar Abah Odang & Enin Ucah`;
    
    if (platform === 'wa') {
      const waNumber = member.whatsapp?.replace(/[^0-9]/g, '') || '';
      if (waNumber && waNumber !== '-' && waNumber.length > 8) {
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(greetingText)}`, '_blank');
      } else {
        alert(`Nomor WhatsApp untuk ${member.nama} belum terdaftar. Menampilkan teks ucapan untuk disalin:\n\n"${greetingText}"`);
      }
    } else {
      const emailAddr = member.email || '';
      if (emailAddr && emailAddr !== '-') {
        window.open(`mailto:${emailAddr}?subject=${encodeURIComponent(`Selamat Ulang Tahun ${member.nama_panggilan}!`)}&body=${encodeURIComponent(greetingText)}`, '_blank');
      } else {
        alert(`Alamat email untuk ${member.nama} belum terdaftar. Menampilkan teks ucapan untuk disalin:\n\n"${greetingText}"`);
      }
    }

    setSentGreetings(prev => ({ ...prev, [member.id]: true }));
  };

  const handleSubscribeReminders = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationEmail) {
      alert('Silakan masukkan nomor WhatsApp atau alamat email Anda.');
      return;
    }
    setIsSubscribed(true);
    setShowEmailModal(false);
    alert(`🎉 Berhasil! Sistem pengingat ulang tahun keluarga aktif dikirim ke ${notificationEmail}. Anda akan menerima notifikasi H-3 dan H-1 sebelum anggota keluarga berulang tahun.`);
  };

  if (compact && upcoming7Days.length === 0) {
    return null; // Don't show compact banner if no birthdays in 7 days
  }

  return (
    <div className={`rounded-3xl border transition-all shadow-lg overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#1b4332] via-[#10291e] to-[#0d1f17] border-[#d4af37]/40 text-emerald-100' 
        : 'bg-gradient-to-br from-[#fcfbf7] via-[#fffdf5] to-[#fff8e7] border-[#d4af37]/50 text-[#1a2e26]'
    }`}>
      
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] p-5 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#d4af37]/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#ffe885] flex items-center justify-center text-[#ffe885] shadow-inner shrink-0">
            <PartyPopper className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffe885] text-[#1b4332] text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" /> Pengingat Otomatis 4 Turunan
            </div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
              Sistem Pengingat Ulang Tahun & Perayaan Keluarga
            </h3>
          </div>
        </div>

        {/* Subscribe Notification Button */}
        <button
          onClick={() => isSubscribed ? setIsSubscribed(false) : setShowEmailModal(true)}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow transition-all shrink-0 ${
            isSubscribed 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
              : 'bg-[#d4af37] text-[#1b4332] hover:bg-[#ffe885]'
          }`}
        >
          {isSubscribed ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Pengingat Aktif (WA/Email)
            </>
          ) : (
            <>
              <BellRing className="w-4 h-4 animate-pulse" /> Aktifkan Pengingat Saya
            </>
          )}
        </button>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        
        {/* Section 1: Upcoming in 7 Days */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-bold text-base sm:text-lg flex items-center gap-2 text-[#1b4332] dark:text-[#ffe885]">
              <Gift className="w-5 h-5 text-rose-500" /> Ulang Tahun Dalam 7 Hari Ke Depan ({upcoming7Days.length})
            </h4>
            {thisMonthBirthdays.length > 0 && (
              <button
                onClick={() => setShowAllMonth(!showAllMonth)}
                className="text-xs font-bold text-[#2d6a4f] dark:text-emerald-300 hover:underline flex items-center gap-1"
              >
                {showAllMonth ? 'Tutup Daftar Bulan Ini' : `Lihat Semua Bulan Ini (${thisMonthBirthdays.length})`}
                <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${showAllMonth ? 'rotate-90' : ''}`} />
              </button>
            )}
          </div>

          {upcoming7Days.length === 0 ? (
            <div className={`p-6 rounded-2xl border text-center ${
              isDarkMode ? 'bg-[#152a21]/50 border-emerald-800/40 text-emerald-300/80' : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
              <p className="text-xs sm:text-sm italic">
                Tidak ada anggota keluarga yang berulang tahun dalam 7 hari ke depan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcoming7Days.map(({ member, daysUntil, turningAge, birthdayDate }) => (
                <div 
                  key={member.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                    daysUntil === 0
                      ? 'bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-rose-500 shadow-md animate-pulse'
                      : isDarkMode 
                        ? 'bg-[#152a21] border-[#2d6a4f]/50 hover:border-[#ffe885]' 
                        : 'bg-white border-amber-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <img 
                      src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
                      alt={member.nama} 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#d4af37] shadow shrink-0 cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedMemberForModal(member)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          daysUntil === 0 
                            ? 'bg-rose-500 text-white animate-bounce' 
                            : daysUntil <= 3 
                              ? 'bg-amber-500 text-white' 
                              : 'bg-[#2d6a4f] text-[#ffe885]'
                        }`}>
                          {daysUntil === 0 ? '🎉 HARI INI!' : `⏳ Dalam ${daysUntil} Hari`}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 dark:text-emerald-300">
                          {birthdayDate}
                        </span>
                      </div>
                      
                      <h5 
                        onClick={() => setSelectedMemberForModal(member)}
                        className="font-heading font-bold text-base text-[#1b4332] dark:text-white truncate cursor-pointer hover:underline mt-1"
                      >
                        {member.nama}
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-emerald-200/80 truncate">
                        Generasi ke-{member.generation} • Usia ke-<span className="font-bold text-rose-600 dark:text-[#ffe885]">{turningAge} tahun</span>
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-emerald-800/50">
                    <button
                      onClick={() => handleSendGreeting(member, 'wa')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                        sentGreetings[member.id]
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900/50 dark:text-emerald-200'
                          : 'bg-[#25D366] hover:bg-[#1ebd59] text-white'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      {sentGreetings[member.id] ? 'Telah Diucapkan' : 'Ucapan WA'}
                    </button>

                    <button
                      onClick={() => handleSendGreeting(member, 'email')}
                      className="py-2 px-3 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-[#0e1c16] dark:hover:bg-emerald-900 text-[#1b4332] dark:text-emerald-200 border border-gray-200 dark:border-emerald-800 flex items-center justify-center gap-1.5 transition-all"
                      title="Kirim ucapan via email"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email
                    </button>

                    <button
                      onClick={() => setSelectedMemberForModal(member)}
                      className="py-2 px-2 rounded-xl text-xs bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#2d6a4f] dark:text-[#ffe885] border border-[#d4af37]/30 flex items-center justify-center transition-all"
                      title="Lihat Profil Lengkap"
                    >
                      <User className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: All Birthdays This Month (Expandable) */}
        {showAllMonth && (
          <div className="pt-4 border-t border-[#d4af37]/30 space-y-3 animate-fadeIn">
            <h4 className="font-heading font-bold text-sm sm:text-base text-[#1b4332] dark:text-[#ffe885] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#d4af37]" /> Semua yang Berulang Tahun di Bulan {new Date().toLocaleDateString('id-ID', { month: 'long' })} ({thisMonthBirthdays.length} Orang)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {thisMonthBirthdays.map(({ member, daysUntil, turningAge, birthdayDate }) => (
                <div 
                  key={member.id}
                  onClick={() => setSelectedMemberForModal(member)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.02] ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800/60 hover:border-[#ffe885]' : 'bg-white border-gray-200 hover:border-[#2d6a4f]'
                  }`}
                >
                  <img 
                    src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
                    alt={member.nama}
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-[#d4af37]" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs text-[#1b4332] dark:text-white truncate">{member.nama}</p>
                    <p className="text-[11px] text-gray-500 dark:text-emerald-300">
                      {birthdayDate} • <span className="font-bold text-rose-500 dark:text-[#ffe885]">{turningAge} thn</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Subscription Modal simulation */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 ${
            isDarkMode ? 'bg-[#10291e] border-[#d4af37] text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg">Pengingat Ulang Tahun Otomatis</h4>
                <p className="text-xs text-gray-500 dark:text-emerald-300">Dapatkan notifikasi H-3 dan H-1 via WA & Email.</p>
              </div>
            </div>

            <form onSubmit={handleSubscribeReminders} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">Nomor WhatsApp atau Email Anda</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: 081234567890 / email@domain.com"
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-emerald-900 text-gray-700 dark:text-emerald-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1b4332] text-[#ffe885] hover:bg-[#2d6a4f] shadow"
                >
                  Aktifkan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

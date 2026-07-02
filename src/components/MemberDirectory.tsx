import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Grid, 
  List, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Cake, 
  Sparkles, 
  Eye, 
  FileSpreadsheet, 
  FileText,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { FamilyMember, GenerationNumber } from '../types';
import { BirthdayReminderWidget } from './BirthdayReminderWidget';

export const MemberDirectory: React.FC = () => {
  const { members, setSelectedMemberForModal, isDarkMode, setActiveTab, openAddMemberModal } = useFamily();

  const [search, setSearch] = useState<string>('');
  const [genFilter, setGenFilter] = useState<string>('ALL');
  const [genderFilter, setGenderFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter members
  const filteredMembers = members.filter(m => {
    const matchesSearch = !search || 
      m.nama.toLowerCase().includes(search.toLowerCase()) ||
      m.nama_panggilan.toLowerCase().includes(search.toLowerCase()) ||
      m.alamat.toLowerCase().includes(search.toLowerCase()) ||
      m.pekerjaan.toLowerCase().includes(search.toLowerCase()) ||
      m.tanggal_lahir.includes(search);

    const matchesGen = genFilter === 'ALL' || m.generation.toString() === genFilter;
    const matchesGender = genderFilter === 'ALL' || m.jenis_kelamin === genderFilter;

    return matchesSearch && matchesGen && matchesGender;
  });

  // Stats
  const total = members.length;
  const maleCount = members.filter(m => m.jenis_kelamin === 'L').length;
  const femaleCount = members.filter(m => m.jenis_kelamin === 'P').length;
  const gen1 = members.filter(m => m.generation === 1).length;
  const gen2 = members.filter(m => m.generation === 2).length;
  const gen3 = members.filter(m => m.generation === 3).length;
  const gen4 = members.filter(m => m.generation === 4).length;

  const handleExport = (format: string) => {
    alert(`⚡ Simulasi Ekspor Data Anggota ke format [${format}] berhasil disiapkan! (${filteredMembers.length} baris data diekspor).`);
  };

  return (
    <div className={`py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#0e1c16] text-emerald-100' : 'bg-[#fcfbf7] text-[#1a2e26]'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#d4af37]/30 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] dark:text-[#ffe885] border border-[#2d6a4f]/20 font-semibold text-xs uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" /> Direktori & Statistik
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Data Anggota <span className="text-[#2d6a4f] dark:text-[#d4af37]">Keluarga Besar</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-200/80 max-w-2xl font-serif-islamic italic">
              Pencarian cepat, filter generasi, alamat kontak, profesi, serta daftar ulang tahun anggota keluarga terdekat bulan ini.
            </p>
          </div>

          {/* Export & Admin CTA */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => openAddMemberModal()}
              className="bg-[#1b4332] hover:bg-[#2d6a4f] text-[#ffe885] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg border border-[#d4af37]/60 hover:scale-105 transition-all"
            >
              <UserPlus className="w-4 h-4 text-[#d4af37]" /> Tambah Anggota / Foto
            </button>
            <button
              onClick={() => handleExport('Excel / CSV')}
              className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#ffe885]" /> Ekspor Excel/CSV
            </button>
            <button
              onClick={() => handleExport('PDF')}
              className="bg-gray-100 dark:bg-[#152a21] hover:bg-gray-200 text-gray-800 dark:text-emerald-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border border-gray-300 dark:border-emerald-800"
            >
              <FileText className="w-4 h-4 text-rose-500" /> Unduh PDF
            </button>
          </div>
        </div>

        {/* Statistics & Birthday Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Stats Summary Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-[#1b4332] text-white p-5 rounded-2xl border border-[#d4af37]/40 shadow flex flex-col justify-between">
              <div className="flex items-center justify-between text-emerald-200 text-xs font-semibold">
                <span>Total Anggota</span>
                <Users className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div className="text-3xl font-heading font-bold text-[#ffe885] mt-2">{total}</div>
              <div className="text-[10px] text-emerald-200/80 mt-1">4 Turunan Terdata</div>
            </div>

            <div className="bg-white dark:bg-[#152a21] p-5 rounded-2xl border border-gray-200 dark:border-emerald-800 shadow flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-500 dark:text-emerald-300 text-xs font-semibold">
                <span>Laki-Laki</span>
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-600 flex items-center justify-center font-bold text-[10px]">L</span>
              </div>
              <div className="text-3xl font-heading font-bold text-gray-800 dark:text-white mt-2">{maleCount}</div>
              <div className="text-[10px] text-gray-400">Putra & Cucu Laki-Laki</div>
            </div>

            <div className="bg-white dark:bg-[#152a21] p-5 rounded-2xl border border-gray-200 dark:border-emerald-800 shadow flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-500 dark:text-emerald-300 text-xs font-semibold">
                <span>Perempuan</span>
                <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-600 flex items-center justify-center font-bold text-[10px]">P</span>
              </div>
              <div className="text-3xl font-heading font-bold text-gray-800 dark:text-white mt-2">{femaleCount}</div>
              <div className="text-[10px] text-gray-400">Putri & Cucu Perempuan</div>
            </div>

            <div className="bg-gradient-to-br from-[#d4af37] to-[#f0a500] text-[#1b4332] p-5 rounded-2xl shadow flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span>Per Generasi</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold space-y-0.5 mt-2">
                <div className="flex justify-between"><span>Gen 1:</span> <strong>{gen1} org</strong></div>
                <div className="flex justify-between"><span>Gen 2:</span> <strong>{gen2} org</strong></div>
                <div className="flex justify-between"><span>Gen 3:</span> <strong>{gen3} org</strong></div>
                <div className="flex justify-between"><span>Gen 4:</span> <strong>{gen4} org</strong></div>
              </div>
            </div>

          </div>

          {/* Upcoming Birthdays Widget */}
          <div className="lg:col-span-4">
            <BirthdayReminderWidget />
          </div>

        </div>

        {/* Toolbar Controls */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-[#152a21] border-[#2d6a4f]/50' : 'bg-white border-gray-200 shadow-sm'
        } flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4`}>
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-emerald-300" />
            <input
              type="text"
              placeholder="Cari nama, panggilan, kota, tahun lahir..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#0e1c16] text-gray-800 dark:text-white text-xs rounded-xl pl-10 pr-4 py-2.5 border border-gray-300 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            
            <select
              value={genFilter}
              onChange={(e) => setGenFilter(e.target.value)}
              className="bg-gray-100 dark:bg-[#0e1c16] text-gray-800 dark:text-white text-xs rounded-xl px-3 py-2 border border-gray-200 dark:border-emerald-800 focus:outline-none"
            >
              <option value="ALL">🌿 Semua Generasi</option>
              <option value="1">Gen 1: Leluhur</option>
              <option value="2">Gen 2: Anak</option>
              <option value="3">Gen 3: Cucu</option>
              <option value="4">Gen 4: Cicit</option>
            </select>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-gray-100 dark:bg-[#0e1c16] text-gray-800 dark:text-white text-xs rounded-xl px-3 py-2 border border-gray-200 dark:border-emerald-800 focus:outline-none"
            >
              <option value="ALL">⚧ Semua Kelamin</option>
              <option value="L">Laki-Laki (L)</option>
              <option value="P">Perempuan (P)</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#0e1c16] p-1 rounded-xl border border-gray-200 dark:border-emerald-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#1b4332] text-white shadow' : 'text-gray-500 hover:text-gray-900 dark:text-emerald-300'}`}
                title="Tampilan Grid Kartu"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-[#1b4332] text-white shadow' : 'text-gray-500 hover:text-gray-900 dark:text-emerald-300'}`}
                title="Tampilan Tabel Lengkap"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Directory Content: Grid Mode vs Table Mode */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member) => {
              const isDeceased = !!member.tanggal_wafat;
              return (
                <div 
                  key={member.id}
                  onClick={() => setSelectedMemberForModal(member)}
                  className={`group rounded-2xl p-5 border-2 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 relative flex flex-col justify-between ${
                    isDarkMode ? 'bg-[#152a21] border-[#2d6a4f]/50 hover:border-[#d4af37]' : 'bg-white border-gray-200 hover:border-[#1b4332]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-[#1b4332] text-[#ffe885] px-2.5 py-0.5 rounded-full border border-[#d4af37]">
                        Gen {member.generation}
                      </span>
                      {isDeceased ? (
                        <span className="text-[10px] bg-gray-500 text-white px-2 py-0.5 rounded font-mono">Alm.</span>
                      ) : (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Aktif
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <img 
                        src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
                        alt={member.nama}
                        className="w-14 h-14 rounded-xl object-cover border-2 border-[#d4af37] shadow shrink-0" 
                      />
                      <div className="min-w-0">
                        <h4 className="font-heading font-bold text-sm text-[#1b4332] dark:text-white truncate group-hover:text-[#d4af37] transition-colors">
                          {member.nama_panggilan}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-emerald-200/70 truncate">
                          {member.nama}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-gray-600 dark:text-emerald-100/80 pt-2 border-t border-gray-100 dark:border-emerald-800/40">
                      <div className="flex items-center gap-1.5 truncate">
                        <Briefcase className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                        <span className="truncate">{member.pekerjaan !== '-' ? member.pekerjaan : 'Anggota Keluarga'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                        <span className="truncate">{member.alamat || '-'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-emerald-800/40 flex items-center justify-between text-[11px] font-semibold text-[#2d6a4f] dark:text-[#ffe885] group-hover:translate-x-1 transition-transform">
                    <span>Lihat Detail Profil</span>
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-emerald-800/50 shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1b4332] text-white font-heading uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Gen</th>
                  <th className="py-3.5 px-4">Foto</th>
                  <th className="py-3.5 px-4">Nama Lengkap & Panggilan</th>
                  <th className="py-3.5 px-4">L/P</th>
                  <th className="py-3.5 px-4">Tempat, Tanggal Lahir</th>
                  <th className="py-3.5 px-4">Pekerjaan / Pendidikan</th>
                  <th className="py-3.5 px-4">Domisili</th>
                  <th className="py-3.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-emerald-800/40 bg-white dark:bg-[#152a21]">
                {filteredMembers.map((member) => (
                  <tr 
                    key={member.id}
                    onClick={() => setSelectedMemberForModal(member)}
                    className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-[#1b4332] dark:text-[#ffe885]">Gen {member.generation}</td>
                    <td className="py-3 px-4">
                      <img src={member.photo_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-[#d4af37]" />
                    </td>
                    <td className="py-3 px-4 font-medium">
                      <div className="font-bold text-gray-900 dark:text-white">{member.nama}</div>
                      <div className="text-[11px] text-[#2d6a4f] dark:text-[#d4af37]">"{member.nama_panggilan}"</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold">{member.jenis_kelamin}</td>
                    <td className="py-3 px-4">
                      <div>{member.tempat_lahir || '-'}</div>
                      <div className="text-[10px] text-gray-400">{member.tanggal_lahir}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold">{member.pekerjaan || '-'}</div>
                      <div className="text-[10px] text-gray-400">{member.pendidikan || '-'}</div>
                    </td>
                    <td className="py-3 px-4">{member.alamat || '-'}</td>
                    <td className="py-3 px-4 text-center">
                      <button className="bg-[#2d6a4f] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-[#1b4332]">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredMembers.length === 0 && (
          <div className="text-center py-16 text-gray-500 italic bg-gray-50 dark:bg-[#152a21] rounded-3xl border border-dashed">
            Anggota keluarga yang dicari tidak ditemukan. Coba ubah kata kunci atau filter generasi.
          </div>
        )}

      </div>
    </div>
  );
};

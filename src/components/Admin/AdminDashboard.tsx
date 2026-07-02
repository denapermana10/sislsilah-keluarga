import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { 
  ShieldCheck, 
  Users, 
  Upload, 
  FileText, 
  Database, 
  History, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Check, 
  X, 
  Camera, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  Download, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { FamilyMember, GenerationNumber } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    members, 
    deletedMembers, 
    proposals, 
    auditLogs, 
    isSupabaseConnected, 
    toggleSupabaseConnection, 
    currentUser, 
    addMember, 
    updateMember, 
    deleteMember, 
    restoreMember, 
    approveProposal, 
    rejectProposal, 
    resetToDefaultData,
    isDarkMode,
    openAddMemberModal
  } = useFamily();

  const [adminTab, setAdminTab] = useState<'anggota' | 'upload' | 'proposals' | 'audit' | 'supabase'>('anggota');
  const [search, setSearch] = useState('');
  
  // Member Edit/Add modal state
  const [editingMember, setEditingMember] = useState<Partial<FamilyMember> | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Upload simulation state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>('');
  const [uploadType, setUploadType] = useState<'photo' | 'doc'>('photo');
  const [compressStatus, setCompressStatus] = useState<string>('');
  const [docTitle, setDocTitle] = useState('');

  // Permission Check
  const canEdit = currentUser?.role === 'Super Admin' || currentUser?.role === 'Admin Keluarga' || currentUser?.role === 'Editor';
  const canDelete = currentUser?.role === 'Super Admin' || currentUser?.role === 'Admin Keluarga';

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.nama) {
      alert('Nama anggota tidak boleh kosong.');
      return;
    }
    if (editingMember.id) {
      // Update
      updateMember(editingMember.id, editingMember);
      alert('✓ Data anggota berhasil diperbarui!');
    } else {
      // Add new
      addMember({
        generation: (editingMember.generation || 3) as GenerationNumber,
        nama: editingMember.nama || '',
        nama_panggilan: editingMember.nama_panggilan || editingMember.nama.split(' ')[0],
        jenis_kelamin: (editingMember.jenis_kelamin || 'L') as 'L' | 'P',
        tempat_lahir: editingMember.tempat_lahir || 'Bandung',
        tanggal_lahir: editingMember.tanggal_lahir || '1990-01-01',
        tanggal_wafat: editingMember.tanggal_wafat || undefined,
        pekerjaan: editingMember.pekerjaan || '-',
        pendidikan: editingMember.pendidikan || '-',
        alamat: editingMember.alamat || '-',
        whatsapp: editingMember.whatsapp || '-',
        email: editingMember.email || '-',
        bio: editingMember.bio || 'Anggota keluarga Abah Odang & Enin Ucah.',
        photo_url: editingMember.photo_url || uploadPreview || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        parent_id: editingMember.parent_id || null,
        spouse_id: editingMember.spouse_id || null,
        branch: editingMember.branch || 'Cabang Keluarga'
      });
      alert('✓ Anggota baru berhasil ditambahkan ke pohon silsilah!');
    }
    setEditingMember(null);
    setIsAddModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 20 * 1024 * 1024) {
        alert('⚠️ Ukuran file melebihi batas maksimal 20 MB (sesuai PRD Bagian 16). Silakan pilih file yang lebih kecil.');
        return;
      }
      setUploadFile(file);
      setCompressStatus('⚡ Memproses: Kompresi & konversi otomatis ke resolusi optimal Supabase Storage...');
      setTimeout(() => {
        const fakeUrl = URL.createObjectURL(file);
        setUploadPreview(fakeUrl);
        setCompressStatus('✓ Selesai! Ukuran dikompresi sebesar 68% (Siap diunggah ke cloud storage).');
      }, 1200);
    }
  };

  const handleSimulateCamera = () => {
    setCompressStatus('📸 Mengaktifkan kamera HP... Menjepret potret keluarga...');
    setTimeout(() => {
      const randomAvatars = [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
      ];
      const picked = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
      setUploadPreview(picked);
      setCompressStatus('✓ Hasil jepretan kamera HP berhasil diambil dan dikompresi!');
    }, 1000);
  };

  const filteredMembers = members.filter(m => 
    m.nama.toLowerCase().includes(search.toLowerCase()) || 
    m.nama_panggilan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#0e1c16] text-emerald-100' : 'bg-[#f8f7f2] text-[#1a2e26]'} min-h-screen transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Header Bar */}
        <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl ${
          isDarkMode ? 'bg-[#152a21] border-[#d4af37]' : 'bg-[#1b4332] text-white border-[#d4af37]'
        } flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#ffe885] border border-[#d4af37]/40 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> Dashboard Administrasi
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-bold text-white">
              Sistem Manajemen Silsilah 4 Turunan
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-serif-islamic italic">
              Kelola data anggota, persetujuan usulan, unggah foto/dokumen (Supabase Storage), serta riwayat pemulihan data.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="bg-black/30 p-3 rounded-2xl border border-[#d4af37]/30 text-xs text-center sm:text-right">
              <div className="text-gray-400">Login Aktif (RBAC):</div>
              <div className="font-heading font-bold text-[#ffe885] text-sm">{currentUser?.role || 'Tamu'}</div>
              <div className="text-[10px] text-emerald-300">{currentUser?.email}</div>
            </div>

            <button
              onClick={() => {
                if (canEdit) {
                  openAddMemberModal();
                } else {
                  alert('Akses Viewer tidak diizinkan menambah data.');
                }
              }}
              className="bg-gradient-to-r from-[#d4af37] to-[#f0a500] hover:from-[#ffe885] hover:to-[#d4af37] text-[#1b4332] font-heading font-bold px-5 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all text-xs"
            >
              <Plus className="w-4 h-4" /> Tambah Anggota & Upload Foto
            </button>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 dark:border-emerald-800 pb-4">
          <button
            onClick={() => setAdminTab('anggota')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              adminTab === 'anggota' ? 'bg-[#1b4332] text-[#ffe885] shadow-md' : 'bg-white dark:bg-[#152a21] text-gray-700 dark:text-emerald-300 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4 text-[#d4af37]" /> Manajemen Anggota ({members.length})
          </button>

          <button
            onClick={() => setAdminTab('proposals')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 relative ${
              adminTab === 'proposals' ? 'bg-[#1b4332] text-[#ffe885] shadow-md' : 'bg-white dark:bg-[#152a21] text-gray-700 dark:text-emerald-300 hover:bg-gray-100'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Usulan Anggota Baru
            {proposals.filter(p => p.status === 'pending').length > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                {proposals.filter(p => p.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('upload')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              adminTab === 'upload' ? 'bg-[#1b4332] text-[#ffe885] shadow-md' : 'bg-white dark:bg-[#152a21] text-gray-700 dark:text-emerald-300 hover:bg-gray-100'
            }`}
          >
            <Upload className="w-4 h-4 text-sky-400" /> Upload Foto & Dokumen (Storage)
          </button>

          <button
            onClick={() => setAdminTab('audit')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              adminTab === 'audit' ? 'bg-[#1b4332] text-[#ffe885] shadow-md' : 'bg-white dark:bg-[#152a21] text-gray-700 dark:text-emerald-300 hover:bg-gray-100'
            }`}
          >
            <History className="w-4 h-4 text-amber-400" /> Audit Log & Pemulihan ({deletedMembers.length} Almh/Terhapus)
          </button>

          <button
            onClick={() => setAdminTab('supabase')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              adminTab === 'supabase' ? 'bg-[#1b4332] text-[#ffe885] shadow-md' : 'bg-white dark:bg-[#152a21] text-gray-700 dark:text-emerald-300 hover:bg-gray-100'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" /> Database Supabase & SQL Schema
          </button>
        </div>

        {/* TAB 1: MANAJEMEN ANGGOTA */}
        {adminTab === 'anggota' && (
          <div className="space-y-6">
            
            {/* Search & Bulk tools */}
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#152a21] border-emerald-800' : 'bg-white border-gray-200 shadow-sm'} flex flex-wrap items-center justify-between gap-4`}>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama atau panggilan untuk edit..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#0e1c16] text-gray-800 dark:text-white text-xs rounded-xl pl-10 pr-4 py-2.5 border border-gray-300 dark:border-emerald-800 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('⚡ Simulasi Impor File Excel / CSV berhasil! Data 4 generasi siap dikombinasikan dengan tabel existing.')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <FileSpreadsheet className="w-4 h-4" /> Impor Excel / CSV
                </button>
                <button
                  onClick={resetToDefaultData}
                  className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-rose-500/30"
                >
                  <RotateCcw className="w-4 h-4" /> Reset ke Default
                </button>
              </div>
            </div>

            {/* Members Table */}
            <div className="overflow-x-auto rounded-3xl border border-gray-200 dark:border-emerald-800/60 shadow-lg bg-white dark:bg-[#152a21]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1b4332] text-white font-heading uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Gen & ID</th>
                    <th className="py-3.5 px-4">Foto</th>
                    <th className="py-3.5 px-4">Nama Lengkap & Panggilan</th>
                    <th className="py-3.5 px-4">L/P</th>
                    <th className="py-3.5 px-4">Cabang Keluarga</th>
                    <th className="py-3.5 px-4">Profesi / Domisili</th>
                    <th className="py-3.5 px-4 text-center">Aksi (Edit / Pindah / Hapus)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-emerald-800/40">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold">
                        <span className="bg-[#1b4332] text-[#ffe885] px-2 py-0.5 rounded-full text-[10px]">
                          Gen {member.generation}
                        </span>
                        <div className="text-[10px] text-gray-400 font-mono mt-1">{member.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <img src={member.photo_url} alt="" className="w-10 h-10 rounded-xl object-cover border border-[#d4af37]" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900 dark:text-white">{member.nama}</div>
                        <div className="text-[11px] text-[#2d6a4f] dark:text-[#d4af37]">"{member.nama_panggilan}"</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold">{member.jenis_kelamin}</td>
                      <td className="py-3 px-4 text-xs font-medium text-gray-600 dark:text-emerald-200">{member.branch || '-'}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold">{member.pekerjaan || '-'}</div>
                        <div className="text-[10px] text-gray-400">{member.alamat || '-'}</div>
                      </td>
                      <td className="py-3 px-4 text-center space-x-1.5">
                        <button
                          onClick={() => {
                            if (canEdit) {
                              setEditingMember(member);
                              setIsAddModalOpen(true);
                            } else {
                              alert('Akses Viewer tidak diizinkan mengubah data.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border border-blue-500/20"
                          title="Edit Anggota / Pindah Posisi"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                          onClick={() => {
                            if (canDelete) {
                              if (window.confirm(`Hapus ${member.nama}? Data yang terhapus akan dipindahkan ke Riwayat Pemulihan (Version History).`)) {
                                deleteMember(member.id);
                              }
                            } else {
                              alert('Hanya Super Admin & Admin Keluarga yang berhak menghapus data.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border border-rose-500/20"
                          title="Hapus Anggota"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: USULAN ANGGOTA BARU */}
        {adminTab === 'proposals' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#152a21] border-[#2d6a4f]' : 'bg-white border-[#d4af37]/60'} shadow-md`}>
              <h3 className="font-heading font-bold text-lg text-[#1b4332] dark:text-[#ffe885] mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                Daftar Usulan Penambahan Anggota Baru ({proposals.length})
              </h3>
              <p className="text-xs text-gray-600 dark:text-emerald-200/80 mb-6 font-serif-islamic italic">
                Sesuai PRD Bagian 15 & 27: Admin memverifikasi dan menyetujui usulan dari publik agar anggota langsung terhubung dalam pohon silsilah.
              </p>

              <div className="space-y-4">
                {proposals.map((prop) => (
                  <div key={prop.id} className="p-5 rounded-2xl border border-gray-200 dark:border-emerald-800/60 bg-gray-50 dark:bg-black/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          prop.status === 'approved' ? 'bg-emerald-500 text-white' :
                          prop.status === 'rejected' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                        }`}>
                          {prop.status}
                        </span>
                        <span className="text-xs font-bold text-gray-800 dark:text-white">
                          Usulan dari: {prop.submitter_name} ({prop.submitter_contact})
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">• {prop.created_at}</span>
                      </div>

                      <div className="bg-white dark:bg-[#152a21] p-3 rounded-xl border border-gray-200 dark:border-emerald-800/40">
                        <h4 className="font-heading font-bold text-sm text-[#1b4332] dark:text-[#ffe885]">
                          Anggota Diusulkan: {prop.proposed_member.nama} ("{prop.proposed_member.nama_panggilan}") - Gen {prop.proposed_member.generation}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-emerald-200 mt-1">
                          <strong>Catatan Relasi:</strong> "{prop.relation_note}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {prop.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => {
                              if (canEdit) approveProposal(prop.id);
                              else alert('Anda tidak memiliki izin memverifikasi.');
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow"
                          >
                            <Check className="w-4 h-4" /> Setujui & Tambahkan
                          </button>
                          <button
                            onClick={() => {
                              if (canEdit) rejectProposal(prop.id);
                              else alert('Anda tidak memiliki izin menolak.');
                            }}
                            className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 px-3 py-2 rounded-xl text-xs font-semibold border border-rose-500/30"
                          >
                            <X className="w-4 h-4" /> Tolak
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-bold text-gray-400 italic">Telah Diproses</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: UPLOAD FOTO & DOKUMEN (PRD Sections 16 & 17) */}
        {adminTab === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-7 space-y-6">
              <div className={`p-6 sm:p-8 rounded-3xl border-2 ${
                isDarkMode ? 'bg-[#152a21] border-[#d4af37]/60' : 'bg-white border-[#d4af37]/60 shadow-lg'
              }`}>
                <h3 className="font-heading font-bold text-lg text-[#1b4332] dark:text-[#ffe885] mb-2 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-sky-500" />
                  Unggah Foto & Dokumen (Supabase Storage)
                </h3>
                <p className="text-xs text-gray-600 dark:text-emerald-200/80 mb-6">
                  Sesuai PRD Bagian 16 & 17: Mendukung Drag & drop, Kamera HP langsung, Galeri HP. Format JPG, PNG, WEBP, HEIC (Maks 20 MB) dengan kompresi otomatis!
                </p>

                {/* Upload Mode Switcher */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setUploadType('photo')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      uploadType === 'photo' ? 'bg-[#1b4332] text-white border-[#d4af37]' : 'border-gray-300 dark:border-emerald-800'
                    }`}
                  >
                    📸 Unggah Foto Keluarga / Profil
                  </button>
                  <button
                    onClick={() => setUploadType('doc')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      uploadType === 'doc' ? 'bg-[#1b4332] text-white border-[#d4af37]' : 'border-gray-300 dark:border-emerald-800'
                    }`}
                  >
                    📄 Unggah Dokumen (Surat Nikah/Akta/KK)
                  </button>
                </div>

                {/* Drag and Drop / Browse Area */}
                <div className="border-2 border-dashed border-[#d4af37] rounded-3xl p-8 text-center bg-gray-50 dark:bg-[#0e1c16] hover:bg-emerald-50/30 transition-colors relative cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 text-[#d4af37] mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FolderOpen className="w-8 h-8" />
                    </div>
                    <div className="text-sm font-heading font-bold text-gray-800 dark:text-white">
                      Drag & Drop file di sini atau <span className="text-[#2d6a4f] dark:text-[#d4af37] underline">Browse File</span>
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Format: JPG, PNG, WEBP, HEIC, PDF • Ukuran Maksimal: <strong>20 MB</strong>
                    </div>
                  </div>
                </div>

                {/* Mobile Camera Simulation Button */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1b4332]/10 dark:bg-black/20 p-4 rounded-2xl border border-[#2d6a4f]/20">
                  <div className="flex items-center gap-2.5 text-xs text-[#1b4332] dark:text-[#ffe885] font-semibold">
                    <Camera className="w-5 h-5 text-[#d4af37]" />
                    <span>Pengguna Handphone (Android / iPhone)?</span>
                  </div>
                  <button
                    onClick={handleSimulateCamera}
                    className="w-full sm:w-auto bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                  >
                    <Camera className="w-4 h-4" /> Buka Kamera HP & Jepret
                  </button>
                </div>

                {/* Status indicator */}
                {compressStatus && (
                  <div className="mt-6 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 animate-spin" />
                    <span>{compressStatus}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Preview & Processing Column */}
            <div className="lg:col-span-5">
              <div className={`p-6 sm:p-8 rounded-3xl border-2 ${
                isDarkMode ? 'bg-[#152a21] border-[#2d6a4f]' : 'bg-white border-gray-200 shadow-md'
              }`}>
                <h4 className="font-heading font-bold text-base text-[#1b4332] dark:text-[#ffe885] mb-4 flex items-center justify-between">
                  <span>Preview & Pemrosesan Foto</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Supabase Storage Ready</span>
                </h4>

                {uploadPreview ? (
                  <div className="space-y-4">
                    <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-lg bg-black">
                      <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded font-mono">
                        680x680 • Compressed WEBP
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button 
                        onClick={() => alert('⚡ Simulasi Fitur Crop & Rotate berhasil dilakukan!')}
                        className="py-2 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold text-gray-700 dark:text-emerald-200"
                      >
                        ✂️ Crop / Rotate
                      </button>
                      <button 
                        onClick={() => setUploadPreview('')}
                        className="py-2 rounded-xl border border-rose-300 text-rose-500 hover:bg-rose-50 font-semibold"
                      >
                        🗑️ Hapus Foto
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        alert('✓ Foto berhasil diunggah ke Supabase Storage (bucket: family-photo-assets) dan tersimpan di database!');
                        setUploadPreview('');
                        setCompressStatus('');
                      }}
                      className="w-full bg-gradient-to-r from-[#d4af37] to-[#f0a500] hover:from-[#ffe885] hover:to-[#d4af37] text-[#1b4332] font-heading font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" /> Konfirmasi & Simpan ke Galeri / Profil
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400 dark:text-emerald-300/40 border-2 border-dashed rounded-2xl">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p className="text-xs">Belum ada file dipilih. Silakan pilih dari desktop atau kamera HP Anda.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: AUDIT LOG & VERSION HISTORY (PRD Section 23 & 27) */}
        {adminTab === 'audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Version History / Deleted Recovery */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`p-6 rounded-3xl border-2 ${isDarkMode ? 'bg-[#152a21] border-amber-500/60' : 'bg-white border-amber-400 shadow-lg'}`}>
                <h3 className="font-heading font-bold text-base text-amber-600 dark:text-amber-300 mb-2 flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Riwayat Pemulihan Data ({deletedMembers.length} Terhapus)
                </h3>
                <p className="text-xs text-gray-500 dark:text-emerald-200/80 mb-4">
                  Sesuai PRD Bagian 27: Data yang terhapus atau diubah dapat dipulihkan kapan saja sehingga aman dari kesalahan manusia.
                </p>

                {deletedMembers.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {deletedMembers.map(m => (
                      <div key={m.id} className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-amber-900 dark:text-amber-200 truncate">{m.nama}</div>
                          <div className="text-[10px] text-gray-500">Gen {m.generation} • ID: {m.id}</div>
                        </div>
                        <button
                          onClick={() => restoreMember(m.id)}
                          className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-colors flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" /> Pulihkan
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 text-xs italic bg-gray-50 dark:bg-black/20 rounded-2xl border border-dashed">
                    Tidak ada data anggota yang terhapus saat ini.
                  </div>
                )}
              </div>
            </div>

            {/* Audit Logs Feed */}
            <div className="lg:col-span-7">
              <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#152a21] border-emerald-800' : 'bg-white border-gray-200 shadow-md'}`}>
                <h3 className="font-heading font-bold text-base text-[#1b4332] dark:text-[#ffe885] mb-2 flex items-center gap-2">
                  <History className="w-5 h-5 text-[#d4af37]" />
                  Audit Log Perubahan Data (Security & RBAC)
                </h3>
                <p className="text-xs text-gray-500 dark:text-emerald-200/80 mb-6">
                  Mencatat setiap aksi penambahan, edit, hapus, dan pemulihan oleh admin.
                </p>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 font-mono text-xs">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#0e1c16] border border-gray-200 dark:border-emerald-800/50 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className={`font-bold px-2 py-0.5 rounded ${
                          log.action === 'CREATE' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300' :
                          log.action === 'UPDATE' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300' :
                          log.action === 'DELETE' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300' : 'bg-amber-500/20 text-amber-600 dark:text-amber-300'
                        }`}>
                          {log.action} • {log.entity}
                        </span>
                        <span className="text-gray-400">{log.timestamp}</span>
                      </div>
                      <div className="font-sans font-semibold text-gray-800 dark:text-white pt-1">{log.description}</div>
                      <div className="text-[10px] text-gray-500 dark:text-emerald-300/70">Oleh: <strong>{log.performed_by}</strong></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: DATABASE SUPABASE & SQL SCHEMA (PRD Section 20) */}
        {adminTab === 'supabase' && (
          <div className="space-y-8">
            <div className={`p-8 rounded-3xl border-2 ${isDarkMode ? 'bg-[#122c21] border-[#2d6a4f]' : 'bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white'} shadow-2xl space-y-6`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#d4af37]/40 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#d4af37] text-[#1b4332] flex items-center justify-center font-bold text-2xl shadow">
                    <Database className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                      Arsitektur Database PostgreSQL (Supabase)
                    </h3>
                    <p className="text-xs text-emerald-200">
                      Row Level Security (RLS) & Sinkronisasi Otomatis Vercel + Supabase
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleSupabaseConnection}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                      isSupabaseConnected ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-amber-500 text-white border-amber-400'
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 ${isSupabaseConnected ? 'animate-spin' : ''}`} />
                    <span>Status: {isSupabaseConnected ? 'Terhubung (Online)' : 'Mode Lokal (Offline)'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 p-5 rounded-2xl border border-white/20 space-y-2">
                  <h4 className="font-heading font-bold text-sm text-[#ffe885]">Row Level Security (RLS)</h4>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Akses tabel diamankan menggunakan kebijakan RLS. Hanya Super Admin & Admin Keluarga yang berhak mengeksekusi operasi DML (Insert, Update, Delete).
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl border border-white/20 space-y-2">
                  <h4 className="font-heading font-bold text-sm text-[#ffe885]">Supabase Storage Buckets</h4>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Foto profil dan galeri disimpan dalam bucket `family_assets` dengan kompresi WEBP maksimal 20 MB untuk penghematan bandwidth.
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl border border-white/20 space-y-2">
                  <h4 className="font-heading font-bold text-sm text-[#ffe885]">Realtime WebSocket Sync</h4>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Setiap penambahan cicit atau foto baru akan langsung disiarkan ke seluruh anggota keluarga yang membuka website tanpa reload.
                  </p>
                </div>
              </div>

              {/* SQL Schema Definition Preview from Section 20 */}
              <div className="space-y-3 pt-4">
                <h4 className="font-heading font-bold text-sm text-[#ffe885] uppercase tracking-wider">
                  📜 Skema Tabel PostgreSQL (Sesuai Spesifikasi PRD Bagian 20)
                </h4>
                <div className="bg-black/80 text-emerald-300 p-6 rounded-2xl font-mono text-xs overflow-x-auto border border-emerald-500/40 shadow-inner">
                  <pre>{`-- 1. Tabel Anggota Keluarga (4 Turunan)
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  spouse_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  generation INTEGER NOT NULL CHECK (generation BETWEEN 1 AND 4),
  nama VARCHAR(255) NOT NULL,
  nama_panggilan VARCHAR(100) NOT NULL,
  jenis_kelamin VARCHAR(1) CHECK (jenis_kelamin IN ('L', 'P')),
  tempat_lahir VARCHAR(100),
  tanggal_lahir DATE,
  tanggal_wafat DATE,
  pekerjaan VARCHAR(100),
  pendidikan VARCHAR(100),
  alamat TEXT,
  whatsapp VARCHAR(20),
  email VARCHAR(100),
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Galeri Foto & Video
CREATE TABLE family_gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Cerita & Kenangan
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  cover TEXT,
  author VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel Timeline Acara / Peristiwa
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Member Add/Edit Modal */}
        {isAddModalOpen && editingMember && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm animate-fadeIn">
            <div className={`max-w-2xl w-full rounded-3xl p-6 sm:p-8 border-2 border-[#d4af37] shadow-2xl my-8 ${isDarkMode ? 'bg-[#122c21] text-white' : 'bg-white text-gray-800'}`}>
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h3 className="font-heading font-bold text-lg flex items-center gap-2 text-[#1b4332] dark:text-[#ffe885]">
                  <Edit3 className="w-5 h-5 text-[#d4af37]" />
                  {editingMember.id ? `Edit Anggota: ${editingMember.nama}` : 'Tambah Anggota Baru ke Pohon Silsilah'}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>

              <form onSubmit={handleSaveMember} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Almeer Zayd Wiratmadja"
                      value={editingMember.nama || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, nama: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Nama Panggilan *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Almeer"
                      value={editingMember.nama_panggilan || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, nama_panggilan: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Generasi Ke-berapa? *</label>
                    <select
                      value={editingMember.generation || 3}
                      onChange={(e) => setEditingMember({ ...editingMember, generation: Number(e.target.value) as GenerationNumber })}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800 font-semibold"
                    >
                      <option value={1}>Gen 1 (Leluhur Utama)</option>
                      <option value={2}>Gen 2 (Anak)</option>
                      <option value={3}>Gen 3 (Cucu)</option>
                      <option value={4}>Gen 4 (Cicit)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Jenis Kelamin</label>
                    <select
                      value={editingMember.jenis_kelamin || 'L'}
                      onChange={(e) => setEditingMember({ ...editingMember, jenis_kelamin: e.target.value as 'L' | 'P' })}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800"
                    >
                      <option value="L">Laki-Laki (L)</option>
                      <option value="P">Perempuan (P)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Tempat Lahir</label>
                    <input
                      type="text"
                      placeholder="e.g., Bandung / Jakarta"
                      value={editingMember.tempat_lahir || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, tempat_lahir: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Tanggal Lahir</label>
                    <input
                      type="date"
                      value={editingMember.tanggal_lahir || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, tanggal_lahir: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Pekerjaan / Profesi</label>
                    <input
                      type="text"
                      placeholder="e.g., Dokter / Mahasiswa / Pelajar"
                      value={editingMember.pekerjaan || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, pekerjaan: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Nomor WhatsApp</label>
                    <input
                      type="text"
                      placeholder="e.g., 081234567890"
                      value={editingMember.whatsapp || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, whatsapp: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Cabang Keluarga</label>
                  <select
                    value={editingMember.branch || 'Cabang 1: H. Asep Saepudin'}
                    onChange={(e) => setEditingMember({ ...editingMember, branch: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800"
                  >
                    <option value="Leluhur Utama">Leluhur Utama</option>
                    <option value="Cabang 1: H. Asep Saepudin">Cabang 1: H. Asep Saepudin</option>
                    <option value="Cabang 2: Hj. Siti Nurhaliza">Cabang 2: Hj. Siti Nurhaliza</option>
                    <option value="Cabang 3: Drs. H. Dedi Mulyadi">Cabang 3: Drs. H. Dedi Mulyadi</option>
                    <option value="Cabang 4: Ir. Rini Wulandari">Cabang 4: Ir. Rini Wulandari</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Alamat Domisili</label>
                  <input
                    type="text"
                    placeholder="e.g., Jl. Buah Batu No. 112, Bandung"
                    value={editingMember.alamat || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, alamat: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl px-3.5 py-2 border border-gray-300 dark:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Biografi Singkat</label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan catatan singkat tentang pencapaian, sifat, atau kenangan anggota ini..."
                    value={editingMember.bio || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#0e1c16] rounded-xl p-3 border border-gray-300 dark:border-emerald-800"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#d4af37] to-[#f0a500] hover:from-[#ffe885] hover:to-[#d4af37] text-[#1b4332] font-bold px-6 py-2.5 rounded-xl shadow flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Simpan Data Anggota
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

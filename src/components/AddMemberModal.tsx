import React, { useState, useEffect, useRef } from 'react';
import { useFamily } from '../context/FamilyContext';
import { FamilyMember, GenerationNumber } from '../types';
import { 
  UserPlus, 
  X, 
  Camera, 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Trees, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Smartphone,
  Laptop
} from 'lucide-react';

export const AddMemberModal: React.FC = () => {
  const { 
    showAddMemberModal, 
    closeAddMemberModal, 
    addMemberModalProps, 
    members, 
    addMember, 
    setActiveTab,
    isDarkMode 
  } = useFamily();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [nama, setNama] = useState('');
  const [namaPanggilan, setNamaPanggilan] = useState('');
  const [generation, setGeneration] = useState<GenerationNumber>(2);
  const [jenisKelamin, setJenisKelamin] = useState<'L' | 'P'>('L');
  const [parentId, setParentId] = useState<string>('');
  const [spouseId, setSpouseId] = useState<string>('');
  const [branch, setBranch] = useState<string>('Cabang 1: H. Asep Wiratmadja');
  const [tempatLahir, setTempatLahir] = useState('Bandung');
  const [tanggalLahir, setTanggalLahir] = useState('1990-01-01');
  const [pekerjaan, setPekerjaan] = useState('');
  const [pendidikan, setPendidikan] = useState('S1');
  const [alamat, setAlamat] = useState('Bandung, Jawa Barat');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  // Photo Upload States
  const [photoSourceType, setPhotoSourceType] = useState<'file' | 'url'>('file');
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80');
  const [photoInputUrl, setPhotoInputUrl] = useState<string>('');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string>('');

  // Set defaults when modal opens or props change
  useEffect(() => {
    if (showAddMemberModal) {
      if (addMemberModalProps?.defaultGeneration) {
        setGeneration(addMemberModalProps.defaultGeneration);
      } else {
        setGeneration(2);
      }
      if (addMemberModalProps?.defaultParentId) {
        setParentId(addMemberModalProps.defaultParentId);
        // auto derive branch from parent
        const parent = members.find(m => m.id === addMemberModalProps.defaultParentId);
        if (parent && parent.branch) {
          setBranch(parent.branch);
        }
      } else {
        setParentId('');
      }
      if (addMemberModalProps?.defaultBranch) {
        setBranch(addMemberModalProps.defaultBranch);
      }
      // reset fields
      setNama('');
      setNamaPanggilan('');
      setBio('');
      setPekerjaan('');
      setWhatsapp('');
      setEmail('');
      setUploadSuccessMsg('');
    }
  }, [showAddMemberModal, addMemberModalProps, members]);

  if (!showAddMemberModal) return null;

  // Handle image upload with canvas resizing/compression
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file berformat gambar (JPG, PNG, WEBP, dll).');
      return;
    }

    setIsCompressing(true);
    setUploadSuccessMsg('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Max 650x650 for optimal local web storage & fast loading
        const MAX_WIDTH = 650;
        const MAX_HEIGHT = 650;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setPhotoUrl(compressedDataUrl);
          setIsCompressing(false);
          setUploadSuccessMsg(`⚡ Foto berhasil diunggah & dioptimalkan (${Math.round(compressedDataUrl.length / 1024)} KB)!`);
        } else {
          setIsCompressing(false);
        }
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (!photoInputUrl.trim()) {
      alert('Masukkan link URL foto terlebih dahulu.');
      return;
    }
    setPhotoUrl(photoInputUrl.trim());
    setUploadSuccessMsg('⚡ Foto dari link URL berhasil diterapkan!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !namaPanggilan.trim()) {
      alert('Nama lengkap dan nama panggilan wajib diisi.');
      return;
    }

    const newMemberData: Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'> = {
      generation: Number(generation) as GenerationNumber,
      nama: nama.trim(),
      nama_panggilan: namaPanggilan.trim(),
      jenis_kelamin: jenisKelamin,
      tempat_lahir: tempatLahir.trim() || 'Bandung',
      tanggal_lahir: tanggalLahir || '1990-01-01',
      pekerjaan: pekerjaan.trim() || 'Swasta',
      pendidikan: pendidikan.trim() || 'S1',
      alamat: alamat.trim() || 'Bandung, Jawa Barat',
      whatsapp: whatsapp.trim() || '-',
      email: email.trim() || '-',
      bio: bio.trim() || `Anggota keluarga generasi ke-${generation} keluarga besar Abah Odang & Enin Ucah.`,
      photo_url: photoUrl,
      branch: branch || 'Leluhur Utama',
      parent_id: parentId || undefined,
      spouse_id: spouseId || undefined
    };

    addMember(newMemberData);

    alert(`🎉 Selamat! "${namaPanggilan}" beserta foto potretnya berhasil ditambahkan dan terintegrasi langsung ke dalam Pohon Silsilah dan Data Anggota!`);
    closeAddMemberModal();
    setActiveTab('silsilah');
  };

  const branches = [
    'Leluhur Utama',
    'Cabang 1: H. Asep Wiratmadja',
    'Cabang 2: Hj. Siti Nurhaliza',
    'Cabang 3: H. Dedi Mulyadi',
    'Cabang 4: Hj. Rini Wulandari'
  ];

  // Candidates for parent selector based on previous generation
  const parentCandidates = members.filter(m => m.generation === generation - 1 || m.generation === 1);
  // Candidates for spouse selector
  const spouseCandidates = members.filter(m => m.generation === generation && m.jenis_kelamin !== jenisKelamin);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-3xl rounded-3xl border-2 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
        isDarkMode 
          ? 'bg-[#10291e] border-[#d4af37] text-white' 
          : 'bg-white border-[#1b4332] text-[#1a2e26]'
      }`}>
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] p-5 text-white flex items-center justify-between border-b border-[#d4af37]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#d4af37] text-[#1b4332] flex items-center justify-center font-bold shadow-md">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#ffe885]">
                Tambah Anggota & Foto Keluarga
              </h3>
              <p className="text-xs text-emerald-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Terintegrasi Langsung dengan Pohon Silsilah Abah Odang
              </p>
            </div>
          </div>
          <button 
            onClick={closeAddMemberModal}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* SECTION 1: PHOTO UPLOAD BOX (DESKTOP & HANDPHONE) */}
          <div className={`p-5 rounded-2xl border-2 border-dashed transition-all ${
            isDarkMode 
              ? 'bg-[#0e1c16] border-[#2d6a4f]/70 hover:border-[#d4af37]' 
              : 'bg-emerald-50/70 border-emerald-300 hover:border-[#2d6a4f]'
          }`}>
            <h4 className="font-heading font-bold text-sm sm:text-base text-[#1b4332] dark:text-[#ffe885] flex items-center gap-2 mb-3">
              <Camera className="w-5 h-5 text-[#d4af37]" /> 
              Foto Potret Anggota (Upload dari Desktop & Handphone)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Preview Circle */}
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-xl bg-gray-200 dark:bg-emerald-950">
                  <img 
                    src={photoUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                    }}
                  />
                  {isCompressing && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold animate-pulse">
                      Mengoptimalkan...
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-300 mt-2 block">
                  Preview Foto di Website
                </span>
                {uploadSuccessMsg && (
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-[#ffe885] bg-emerald-500/10 px-2 py-1 rounded-lg mt-1 block">
                    {uploadSuccessMsg}
                  </span>
                )}
              </div>

              {/* Right Upload Controls */}
              <div className="md:col-span-8 space-y-4">
                
                {/* Method Tabs */}
                <div className="flex rounded-xl bg-gray-200/80 dark:bg-[#152a21] p-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPhotoSourceType('file')}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      photoSourceType === 'file' 
                        ? 'bg-[#1b4332] text-[#ffe885] shadow' 
                        : 'text-gray-600 dark:text-emerald-300 hover:text-gray-900'
                    }`}
                  >
                    <Upload className="w-4 h-4" /> Upload Galeri / Kamera HP
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoSourceType('url')}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      photoSourceType === 'url' 
                        ? 'bg-[#1b4332] text-[#ffe885] shadow' 
                        : 'text-gray-600 dark:text-emerald-300 hover:text-gray-900'
                    }`}
                  >
                    <LinkIcon className="w-4 h-4" /> Link URL Foto
                  </button>
                </div>

                {photoSourceType === 'file' ? (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-600 dark:text-emerald-200/80">
                      Anda dapat memilih file foto dari folder komputer (Desktop) atau memotret langsung / memilih dari galeri handphone.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Standard File/Gallery Picker */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#1b4332] hover:bg-[#2d6a4f] text-[#ffe885] font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all border border-[#d4af37]/40"
                      >
                        <Laptop className="w-4 h-4 text-[#d4af37]" />
                        <span>Pilih Foto dari Galeri / PC</span>
                      </button>

                      {/* Direct Mobile Camera Trigger */}
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="bg-[#d4af37] hover:bg-[#ffe885] text-[#1b4332] font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Buka Kamera Handphone 📸</span>
                      </button>
                    </div>

                    {/* Hidden Inputs */}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                    <input 
                      ref={cameraInputRef}
                      type="file" 
                      accept="image/*" 
                      capture="environment" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-600 dark:text-emerald-200/80">
                      Tempelkan tautan (URL) gambar dari Google Drive, Unsplash, atau penyimpanan online lainnya.
                    </p>
                    <div className="flex gap-2">
                      <input 
                        type="url"
                        placeholder="https://..."
                        value={photoInputUrl}
                        onChange={(e) => setPhotoInputUrl(e.target.value)}
                        className={`flex-1 px-3 py-2 rounded-xl border text-xs ${
                          isDarkMode ? 'bg-[#152a21] border-emerald-800 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleApplyUrl}
                        className="bg-[#2d6a4f] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1b4332]"
                      >
                        Terapkan
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

          {/* SECTION 2: IDENTITAS & SILSILAH KELUARGA */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm sm:text-base text-[#1b4332] dark:text-[#ffe885] flex items-center gap-2 border-b border-gray-200 dark:border-emerald-800 pb-2">
              <Trees className="w-4 h-4 text-[#d4af37]" /> Identitas & Posisi dalam Pohon Silsilah
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Nama Lengkap *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Contoh: dr. Rizky Wiratmadja, Sp.A" 
                  value={nama} 
                  onChange={(e) => setNama(e.target.value)} 
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Nama Panggilan *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Contoh: Kang Rizky" 
                  value={namaPanggilan} 
                  onChange={(e) => setNamaPanggilan(e.target.value)} 
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Generasi Silsilah *</label>
                <select 
                  value={generation} 
                  onChange={(e) => {
                    const newGen = parseInt(e.target.value, 10) as GenerationNumber;
                    setGeneration(newGen);
                    setParentId('');
                    setSpouseId('');
                  }} 
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-[#ffe885]' : 'bg-gray-50 border-gray-300 text-[#1b4332]'
                  }`}
                >
                  <option value={1}>Gen 1 (Leluhur Utama)</option>
                  <option value={2}>Gen 2 (Anak Abah Odang)</option>
                  <option value={3}>Gen 3 (Cucu Abah Odang)</option>
                  <option value={4}>Gen 4 (Cicit Abah Odang)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Jenis Kelamin *</label>
                <select 
                  value={jenisKelamin} 
                  onChange={(e) => setJenisKelamin(e.target.value as 'L' | 'P')} 
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="L">👨 Laki-laki</option>
                  <option value="P">👩 Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Cabang Keluarga</label>
                <select 
                  value={branch} 
                  onChange={(e) => setBranch(e.target.value)} 
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  {branches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tree Relations Selector */}
            {generation > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div>
                  <label className="block text-xs font-bold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-1">
                    🌳 Pilih Orang Tua (Dari Gen {generation - 1})
                  </label>
                  <select 
                    value={parentId} 
                    onChange={(e) => {
                      setParentId(e.target.value);
                      const parent = members.find(m => m.id === e.target.value);
                      if (parent && parent.branch) setBranch(parent.branch);
                    }} 
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-medium ${
                      isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">-- Tidak Diketahui / Lewati --</option>
                    {parentCandidates.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nama_panggilan} ({p.nama}) - Gen {p.generation}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-1">
                    💍 Pilih Pasangan (Suami/Istri di Gen {generation})
                  </label>
                  <select 
                    value={spouseId} 
                    onChange={(e) => setSpouseId(e.target.value)} 
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-medium ${
                      isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">-- Belum Menikah / Lewati --</option>
                    {spouseCandidates.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.nama_panggilan} ({s.nama})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

          </div>

          {/* SECTION 3: DETAIL LAINNYA */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm sm:text-base text-[#1b4332] dark:text-[#ffe885] flex items-center gap-2 border-b border-gray-200 dark:border-emerald-800 pb-2">
              <User className="w-4 h-4 text-[#d4af37]" /> Informasi & Biodata Tambahan
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Tempat Lahir</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Bandung" 
                  value={tempatLahir} 
                  onChange={(e) => setTempatLahir(e.target.value)} 
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Tanggal Lahir</label>
                <input 
                  type="date" 
                  value={tanggalLahir} 
                  onChange={(e) => setTanggalLahir(e.target.value)} 
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Pekerjaan / Profesi</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Pengusaha / Dokter / Mahasiswa" 
                  value={pekerjaan} 
                  onChange={(e) => setPekerjaan(e.target.value)} 
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Kota Domisili / Alamat</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Bandung, Jawa Barat" 
                  value={alamat} 
                  onChange={(e) => setAlamat(e.target.value)} 
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">WhatsApp (Opsional)</label>
                <input 
                  type="text" 
                  placeholder="081234..." 
                  value={whatsapp} 
                  onChange={(e) => setWhatsapp(e.target.value)} 
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Email (Opsional)</label>
                <input 
                  type="email" 
                  placeholder="nama@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Bio & Cerita Singkat</label>
              <textarea 
                rows={2} 
                placeholder="Tuliskan sedikit tentang kegiatan, kepribadian, atau hobi anggota ini..." 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                className={`w-full px-3.5 py-2 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-gray-200 dark:border-emerald-800 flex items-center justify-end gap-3 sticky bottom-0 bg-white dark:bg-[#10291e] py-3">
            <button
              type="button"
              onClick={closeAddMemberModal}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gray-200 dark:bg-emerald-900 text-gray-700 dark:text-emerald-200 hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#1b4332] text-[#ffe885] shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-[#ffe885]" /> Simpan ke Pohon Silsilah
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

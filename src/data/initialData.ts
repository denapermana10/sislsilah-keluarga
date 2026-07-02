import { FamilyMember, GalleryItem, StoryItem, EventItem, GuestbookEntry, MemberProposal, User, AuditLog } from '../types';

export const INITIAL_MEMBERS: FamilyMember[] = [
  // ================= GENERATION 1: ABANG ODANG & ENIN UCAH =================
  {
    id: 'gen1-1',
    generation: 1,
    nama: 'Abah Odang (H. Odang Wiratmadja)',
    nama_panggilan: 'Abah Odang',
    jenis_kelamin: 'L',
    tempat_lahir: 'Tasikmalaya',
    tanggal_lahir: '1928-05-12',
    tanggal_wafat: '2010-11-18',
    pekerjaan: 'Tokoh Masyarakat & Guru',
    pendidikan: 'Kolej Guru Normal',
    alamat: 'Jl. Raya Cigadung No. 45, Bandung',
    whatsapp: '081234567800',
    email: 'leluhur@abahodang.fam',
    bio: 'Abah Odang adalah sosok panutan, pendidik, dan kepala keluarga yang selalu mengajarkan filosofi "Silih Asih, Silih Asah, Silih Asuh". Beliau merintis pendidikan di kampung halaman dan mewariskan semangat kebersamaan.',
    photo_url: 'https://lh3.googleusercontent.com/d/1WbFmRfG4p89aetw52ZseayGvrBDOfyHp=w1000',
    branch: 'Leluhur Utama',
    created_at: '2023-01-01',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen1-2',
    generation: 1,
    nama: 'Enin Ucah (Hj. Sukaesih Ucah)',
    nama_panggilan: 'Enin Ucah',
    jenis_kelamin: 'P',
    tempat_lahir: 'Garut',
    tanggal_lahir: '1932-08-20',
    tanggal_wafat: '2016-04-10',
    pekerjaan: 'Ibu Rumah Tangga & Pengusaha Kain Batik',
    pendidikan: 'Sekolah Rakyat',
    alamat: 'Jl. Raya Cigadung No. 45, Bandung',
    whatsapp: '081234567801',
    email: 'enin@abahodang.fam',
    bio: 'Enin Ucah dikenal dengan kelembutan hatinya, masakan Sunda legendarisnya (terutama nasi liwet dan pepes), serta kesabarannya dalam membesarkan 4 putra-putri hingga sukses.',
    photo_url: 'https://lh3.googleusercontent.com/d/1WbFmRfG4p89aetw52ZseayGvrBDOfyHp=w1000',
    branch: 'Leluhur Utama',
    spouse_id: 'gen1-1',
    created_at: '2023-01-01',
    updated_at: '2024-06-15'
  },

  // ================= GENERATION 2: ANAK (4 Putra-Putri) =================
  // ANAK 1: H. Asep Saepudin
  {
    id: 'gen2-1',
    parent_id: 'gen1-1', // Anak dari Abah Odang
    generation: 2,
    nama: 'H. Asep Saepudin Wiratmadja, M.M.',
    nama_panggilan: 'Kang Asep (Anak ke-1)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1954-03-14',
    pekerjaan: 'Pensiunan Pejabat Pemda & Pengusaha Properti',
    pendidikan: 'S2 Manajemen Universitas Padjadjaran',
    alamat: 'Jl. Buah Batu No. 112, Bandung',
    whatsapp: '6281223344550',
    email: 'asep.saepudin@gmail.com',
    bio: 'Anak sulung Abah Odang & Enin Ucah. Menjadi penopang keluarga setelah kepergian Abah. Aktif dalam berbagai kegiatan sosial dan masjid perumahan.',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 1: H. Asep Saepudin',
    created_at: '2023-01-05',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen2-1-sp',
    generation: 2,
    nama: 'Hj. Neni Kartini',
    nama_panggilan: 'Teh Neni (Pasangan Kang Asep)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Cianjur',
    tanggal_lahir: '1958-09-11',
    pekerjaan: 'Pensiunan Guru SMA',
    pendidikan: 'S1 Pendidikan IKIP Bandung',
    alamat: 'Jl. Buah Batu No. 112, Bandung',
    whatsapp: '6281223344551',
    email: 'neni.kartini@gmail.com',
    bio: 'Istri dari Kang Asep. Penuh kasih sayang dan sering menjadi tuan rumah arisan keluarga besar.',
    photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 1: H. Asep Saepudin',
    spouse_id: 'gen2-1',
    created_at: '2023-01-05',
    updated_at: '2024-06-15'
  },

  // ANAK 2: Hj. Siti Nurhaliza
  {
    id: 'gen2-2',
    parent_id: 'gen1-1',
    generation: 2,
    nama: 'Hj. Siti Nurhaliza Wiratmadja, S.H.',
    nama_panggilan: 'Ceu Siti (Anak ke-2)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1958-07-25',
    pekerjaan: 'Notaris & Pejabat Pembuat Akta Tanah (PPAT)',
    pendidikan: 'S1 Hukum Universitas Indonesia',
    alamat: 'Jl. Tebet Barat Dalam No. 8, Jakarta Selatan',
    whatsapp: '628118899770',
    email: 'siti.notaris@gmail.com',
    bio: 'Putri pertama dalam keluarga. Karakter tegas namun sangat menyayangi adik-adik dan keponakannya. Merantau dan sukses di Jakarta.',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 2: Hj. Siti Nurhaliza',
    created_at: '2023-01-06',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen2-2-sp',
    generation: 2,
    nama: 'Ir. H. Hendra Setiawan',
    nama_panggilan: 'Pak Hendra (Pasangan Ceu Siti)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Surabaya',
    tanggal_lahir: '1955-12-03',
    tanggal_wafat: '2021-08-15',
    pekerjaan: 'Mantan Direktur BUMN Konstruksi',
    pendidikan: 'S1 Teknik Sipil ITB',
    alamat: 'Jl. Tebet Barat Dalam No. 8, Jakarta Selatan',
    whatsapp: '08118899771',
    email: 'hendra.setiawan@gmail.com',
    bio: 'Suami Ceu Siti yang sosoknya tenang dan bijak. Telah berpulang pada tahun 2021 dengan meninggalkan amal jariyah dan karya bangunan megah di Tanah Air.',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 2: Hj. Siti Nurhaliza',
    spouse_id: 'gen2-2',
    created_at: '2023-01-06',
    updated_at: '2024-06-15'
  },

  // ANAK 3: Drs. H. Dedi Mulyadi
  {
    id: 'gen2-3',
    parent_id: 'gen1-1',
    generation: 2,
    nama: 'Drs. H. Dedi Mulyadi Wiratmadja',
    nama_panggilan: 'Mang Dedi (Anak ke-3)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1963-10-10',
    pekerjaan: 'Pengusaha Eksportir Kopi & Teh Jawa Barat',
    pendidikan: 'S1 Ekonomi UGM Yogyakarta',
    alamat: 'Jl. Dago Atas No. 200, Bandung',
    whatsapp: '6281312345678',
    email: 'dedi.kopi@wiratmadja.com',
    bio: 'Anak ketiga yang melanjutkan semangat wirausaha Enin Ucah. Membawa kopi lokal Jawa Barat menembus pasar Eropa dan Timur Tengah.',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 3: Drs. H. Dedi Mulyadi',
    created_at: '2023-01-07',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen2-3-sp',
    generation: 2,
    nama: 'Hj. Rina Melati, S.E.',
    nama_panggilan: 'Bi Rina (Pasangan Mang Dedi)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Solo',
    tanggal_lahir: '1966-04-18',
    pekerjaan: 'Pengelola Yayasan Pendidikan & Sosial',
    pendidikan: 'S1 Ekonomi UNS',
    alamat: 'Jl. Dago Atas No. 200, Bandung',
    whatsapp: '6281312345679',
    email: 'rina.melati@gmail.com',
    bio: 'Istri Mang Dedi yang sangat ramah dan aktif mengelola sekolah gratis untuk anak yatim di daerah Bandung Selatan.',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 3: Drs. H. Dedi Mulyadi',
    spouse_id: 'gen2-3',
    created_at: '2023-01-07',
    updated_at: '2024-06-15'
  },

  // ANAK 4: Ir. Rini Wulandari
  {
    id: 'gen2-4',
    parent_id: 'gen1-1',
    generation: 2,
    nama: 'Ir. Rini Wulandari Wiratmadja, M.T.',
    nama_panggilan: 'Teh Rini (Anak ke-4 / Bungsu)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1969-12-01',
    pekerjaan: 'Dosen Arsitektur & Konsultan Tata Kota',
    pendidikan: 'S2 Arsitektur ITB',
    alamat: 'Jl. Ciumbuleuit No. 55, Bandung',
    whatsapp: '6281566778899',
    email: 'rini.wulandari@itb.ac.id',
    bio: 'Anak bungsu kesayangan Abah & Enin. Sangat kritis, artistik, dan menjadi pengarsip utama dokumen dan foto-foto sejarah keluarga.',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 4: Ir. Rini Wulandari',
    created_at: '2023-01-08',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen2-4-sp',
    generation: 2,
    nama: 'Dr. dr. Bambang Pamungkas, Sp.J(K)',
    nama_panggilan: 'Dokter Bambang (Pasangan Teh Rini)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Semarang',
    tanggal_lahir: '1967-02-14',
    pekerjaan: 'Dokter Spesialis Jantung Rumah Sakit Hasan Sadikin',
    pendidikan: 'Spesialis Jantung Universitas Padjadjaran',
    alamat: 'Jl. Ciumbuleuit No. 55, Bandung',
    whatsapp: '6281566778800',
    email: 'dr.bambang@gmail.com',
    bio: 'Suami Teh Rini. Menjadi konsultan kesehatan resmi bagi seluruh anggota keluarga besar Abah Odang.',
    photo_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 4: Ir. Rini Wulandari',
    spouse_id: 'gen2-4',
    created_at: '2023-01-08',
    updated_at: '2024-06-15'
  },

  // ================= GENERATION 3: CUCU (6 Cucu) =================
  // Cucu dari Kang Asep (gen2-1)
  {
    id: 'gen3-1',
    parent_id: 'gen2-1',
    generation: 3,
    nama: 'Rizky Pratama Wiratmadja, S.Kom., M.TI.',
    nama_panggilan: 'Rizky (Cucu dr Kang Asep)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1984-05-19',
    pekerjaan: 'Tech Lead / Software Architect di Perusahaan Unicorn',
    pendidikan: 'S2 Informatika ITB',
    alamat: 'Jl. Setiabudi Regency No. 12, Bandung',
    whatsapp: '6281299887766',
    email: 'rizky.pratama@tech.id',
    bio: 'Cucu tertua di keluarga besar. Penggemar teknologi yang berinisiatif membangun sistem digitalisasi silsilah keluarga ini agar tidak punah.',
    photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 1: H. Asep Saepudin',
    created_at: '2023-01-10',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen3-1-sp',
    generation: 3,
    nama: 'drg. Annisa Larasati',
    nama_panggilan: 'Annisa (Istri Rizky)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Jakarta',
    tanggal_lahir: '1986-07-06',
    pekerjaan: 'Dokter Gigi Anak & Pemilik Klinik Gigi',
    pendidikan: 'S1 Kedokteran Gigi UI',
    alamat: 'Jl. Setiabudi Regency No. 12, Bandung',
    whatsapp: '6281299887767',
    email: 'annisa.larasati@gmail.com',
    bio: 'Istri Rizky yang hangat dan telaten merawat anak-anak serta klinik giginya.',
    photo_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 1: H. Asep Saepudin',
    spouse_id: 'gen3-1',
    created_at: '2023-01-10',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen3-2',
    parent_id: 'gen2-1',
    generation: 3,
    nama: 'Nadia Putri Wiratmadja, M.B.A.',
    nama_panggilan: 'Nadia (Cucu dr Kang Asep)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1989-07-04',
    pekerjaan: 'Brand Manager Perusahaan FMCG Multinational',
    pendidikan: 'MBA Melbourne Business School',
    alamat: 'Apartemen SCBD Tower 2, Jakarta Selatan',
    whatsapp: '6281388776655',
    email: 'nadia.wiratmadja@gmail.com',
    bio: 'Adik Rizky yang energik, menyukai traveling, dan selalu menjadi MC atraktif setiap kali reuni keluarga besar diadakan.',
    photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 1: H. Asep Saepudin',
    created_at: '2023-01-11',
    updated_at: '2024-06-15'
  },

  // Cucu dari Ceu Siti (gen2-2)
  {
    id: 'gen3-3',
    parent_id: 'gen2-2',
    generation: 3,
    nama: 'Farhan Setiawan, S.H., LL.M.',
    nama_panggilan: 'Farhan (Cucu dr Ceu Siti)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Jakarta',
    tanggal_lahir: '1988-01-15',
    pekerjaan: 'Corporate Lawyer / Konsultan Hukum Pasar Modal',
    pendidikan: 'S2 Hukum King\'s College London',
    alamat: 'Jl. Kemang Timur No. 40, Jakarta Selatan',
    whatsapp: '6281122334455',
    email: 'farhan.setiawan@lawfirm.co.id',
    bio: 'Mengikuti jejak sang ibu di bidang hukum. Sangat disiplin dan senang bermain tenis di waktu luang.',
    photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 2: Hj. Siti Nurhaliza',
    created_at: '2023-01-12',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen3-3-sp',
    generation: 3,
    nama: 'Syifa Fauziah, S.Ds.',
    nama_panggilan: 'Syifa (Istri Farhan)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1990-10-05',
    pekerjaan: 'Desainer Interior & Pemilik Studio Desain',
    pendidikan: 'S1 Desain Interior FSRD ITB',
    alamat: 'Jl. Kemang Timur No. 40, Jakarta Selatan',
    whatsapp: '6281122334456',
    email: 'syifa.fauziah@designstudio.com',
    bio: 'Istri Farhan yang berselera tinggi dalam penataan ruangan dan seni dekorasi khas Nusantara.',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 2: Hj. Siti Nurhaliza',
    spouse_id: 'gen3-3',
    created_at: '2023-01-12',
    updated_at: '2024-06-15'
  },

  // Cucu dari Mang Dedi (gen2-3)
  {
    id: 'gen3-4',
    parent_id: 'gen2-3',
    generation: 3,
    nama: 'Ilham Mulyadi Wiratmadja, S.P.',
    nama_panggilan: 'Ilham (Cucu dr Mang Dedi)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1993-04-22',
    pekerjaan: 'Q-Grader Kopi Internasional & Pengelola Kebun Kopi',
    pendidikan: 'S1 Pertanian Institut Pertanian Bogor (IPB)',
    alamat: 'Pangalengan, Kabupaten Bandung',
    whatsapp: '6281355443322',
    email: 'ilham.mulyadi@kopi.co.id',
    bio: 'Generasi muda yang terjun langsung ke kebun kopi di Pangalengan. Memberdayakan petani lokal dengan metode pemrosesan modern yang ramah lingkungan.',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 3: Drs. H. Dedi Mulyadi',
    created_at: '2023-01-14',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen3-5',
    parent_id: 'gen2-3',
    generation: 3,
    nama: 'Aura Kasih Melati Wiratmadja, S.E.',
    nama_panggilan: 'Aura (Cucu dr Mang Dedi)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1996-12-12',
    pekerjaan: 'Pengusaha Kafe & Bakery',
    pendidikan: 'S1 Manajemen Universitas Parahyangan',
    alamat: 'Jl. Diponegoro No. 15, Bandung',
    whatsapp: '6281355443323',
    email: 'aura.melati@gmail.com',
    bio: 'Membuka jaringan coffee shop hits di Bandung yang menggunakan biji kopi hasil panen sang kakak.',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 3: Drs. H. Dedi Mulyadi',
    created_at: '2023-01-15',
    updated_at: '2024-06-15'
  },

  // Cucu dari Teh Rini (gen2-4)
  {
    id: 'gen3-6',
    parent_id: 'gen2-4',
    generation: 3,
    nama: 'dr. Rayhan Pamungkas',
    nama_panggilan: 'Rayhan (Cucu dr Teh Rini)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1998-02-28',
    pekerjaan: 'Dokter Residen Spesialis Bedah',
    pendidikan: 'S1 Kedokteran FK Unpad',
    alamat: 'Jl. Ciumbuleuit No. 55, Bandung',
    whatsapp: '6281577889900',
    email: 'rayhan.pamungkas@unpad.ac.id',
    bio: 'Mengikuti jejak sang ayah di dunia medis. Aktif dalam misi kemanusiaan dan bakti sosial kesehatan ke pelosok Jawa Barat.',
    photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 4: Ir. Rini Wulandari',
    created_at: '2023-01-16',
    updated_at: '2024-06-15'
  },

  // ================= GENERATION 4: CICIT (4 Cicit) =================
  // Cicit dari Rizky (gen3-1) & Annisa
  {
    id: 'gen4-1',
    parent_id: 'gen3-1',
    generation: 4,
    nama: 'Almeer Zayd Wiratmadja',
    nama_panggilan: 'Almeer (Cicit gen-4)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '2013-09-10',
    pekerjaan: 'Pelajar SMP & Atlet Renang Junior',
    pendidikan: 'SMP Taruna Bakti Bandung',
    alamat: 'Jl. Setiabudi Regency No. 12, Bandung',
    whatsapp: '6281299880011',
    email: 'almeer.zayd@gmail.com',
    bio: 'Cicit tertua Abah Odang & Enin Ucah. Sangat pintar matematika dan telah memenangkan beberapa kejuaraan renang antarsekolah se-Jawa Barat.',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 1: H. Asep Saepudin',
    created_at: '2023-01-20',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen4-2',
    parent_id: 'gen3-1',
    generation: 4,
    nama: 'Kira Shanum Wiratmadja',
    nama_panggilan: 'Kira (Cicit gen-4)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '2016-04-15',
    pekerjaan: 'Pelajar SD & Penari Tradisional Sunda',
    pendidikan: 'SD Taruna Bakti Bandung',
    alamat: 'Jl. Setiabudi Regency No. 12, Bandung',
    whatsapp: '6281299880012',
    email: 'kira.shanum@gmail.com',
    bio: 'Cicit yang ceria, pandai menari Jaipong, dan selalu menjadi hiburan manis bagi para kakek dan neneknya saat kumpul keluarga.',
    photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 1: H. Asep Saepudin',
    created_at: '2023-01-21',
    updated_at: '2024-06-15'
  },

  // Cicit dari Farhan (gen3-3) & Syifa
  {
    id: 'gen4-3',
    parent_id: 'gen3-3',
    generation: 4,
    nama: 'Rafaelsyah Setiawan',
    nama_panggilan: 'Rafael (Cicit gen-4)',
    jenis_kelamin: 'L',
    tempat_lahir: 'Jakarta',
    tanggal_lahir: '2018-11-02',
    pekerjaan: 'Pelajar TK B & Penggemar Robotika Cilik',
    pendidikan: 'TK Al-Azhar Kemang',
    alamat: 'Jl. Kemang Timur No. 40, Jakarta Selatan',
    whatsapp: '6281122330013',
    email: 'rafael.setiawan@gmail.com',
    bio: 'Cicit laki-laki yang sangat aktif, suka menyusun Lego rumit, dan selalu ingin tahu cara kerja mesin-mesin di sekitarnya.',
    photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 2: Hj. Siti Nurhaliza',
    created_at: '2023-01-22',
    updated_at: '2024-06-15'
  },
  {
    id: 'gen4-4',
    parent_id: 'gen3-3',
    generation: 4,
    nama: 'Alesha Inara Setiawan',
    nama_panggilan: 'Alesha (Cicit gen-4)',
    jenis_kelamin: 'P',
    tempat_lahir: 'Jakarta',
    tanggal_lahir: '2021-07-03',
    pekerjaan: 'Balita Ceria & Penggemar Musik',
    pendidikan: 'Playgroup',
    alamat: 'Jl. Kemang Timur No. 40, Jakarta Selatan',
    whatsapp: '6281122330014',
    email: 'alesha.inara@gmail.com',
    bio: 'Cicit bungsu saat ini di keluarga besar Abah Odang & Enin Ucah. Senyumnya yang manis selalu mencairkan suasana dalam setiap pertemuan keluarga.',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    branch: 'Cabang 2: Hj. Siti Nurhaliza',
    created_at: '2023-01-23',
    updated_at: '2024-06-15'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Potret Kenangan Abah Odang & Enin Ucah (1965)',
    image: 'https://lh3.googleusercontent.com/d/1WbFmRfG4p89aetw52ZseayGvrBDOfyHp=w1000',
    category: 'Foto Lama',
    description: 'Foto kenangan di halaman rumah Cigadung, Bandung. Abah dan Enin dalam busana adat Sunda saat perayaan Lebaran tahun 1965.',
    date: '1965-04-10',
    created_at: '2023-05-01'
  },
  {
    id: 'gal-2',
    title: 'Reuni Akbar Keluarga Besar 4 Turunan di Lembang (2023)',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
    category: 'Reuni',
    description: 'Dihadiri oleh lebih dari 40 anggota keluarga dari Bandung, Jakarta, dan sekitarnya. Penuh canda tawa dan silaturahmi.',
    date: '2023-12-24',
    created_at: '2023-12-25'
  },
  {
    id: 'gal-3',
    title: 'Pernikahan Rizky & drg. Annisa (2011)',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    category: 'Pernikahan',
    description: 'Pernikahan cucu pertama dalam keluarga besar. Momen sakral dengan adat Sunda Siger yang sangat berkesan.',
    date: '2011-09-17',
    created_at: '2023-05-02'
  },
  {
    id: 'gal-4',
    title: 'Liburan Keluarga Cabang Mang Dedi di Pangalengan',
    image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&auto=format&fit=crop&q=80',
    category: 'Liburan',
    description: 'Menikmati udara sejuk kebun teh dan panen kopi bersama anak-cucu di dataran tinggi Pangalengan.',
    date: '2024-05-01',
    created_at: '2024-05-02'
  },
  {
    id: 'gal-5',
    title: 'Sholat Idul Fitri & Sungkeman Bersama (1445 H)',
    image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800&auto=format&fit=crop&q=80',
    category: 'Hari Raya',
    description: 'Tradisi sungkeman dan mencicipi ketupat opor resep warisan Enin Ucah yang selalu dinantikan setiap tahun.',
    date: '2024-04-10',
    created_at: '2024-04-11'
  },
  {
    id: 'gal-6',
    title: 'Wisuda S2 dr. Rayhan di Aula Grha Sanusi Unpad',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    category: 'Foto Baru',
    description: 'Kebanggaan keluarga melihat lahirnya generasi penerus dokter yang mengabdi untuk masyarakat Jawa Barat.',
    date: '2023-10-15',
    created_at: '2023-10-16'
  }
];

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'story-1',
    title: 'Filosofi Warisan Abah Odang: Silih Asih, Silih Asah, Silih Asuh',
    slug: 'filosofi-warisan-abah-odang',
    content: `Abah Odang senantiasa menekankan pentingnya kerukunan antar saudara. Bagi beliau, harta terbesar bukanlah tanah atau materi, melainkan keharmonisan keluarga yang saling mendukung dalam kebaikan.

Dalam setiap kesempatan makan malam bersama di rumah Cigadung, Abah selalu mengingatkan: *"Lamun dulur meunang kasusah, kudu dibantuan ku sararea. Ulang nepi ka aya anu ngarasa sorangan."* (Jika saudara mendapat kesulitan, harus dibantu oleh semuanya. Jangan sampai ada yang merasa sendirian).

Nilai-nilai inilah yang kini terus dijaga oleh generasi ke-2, ke-3, hingga cicit ke-4 dalam setiap pertemuan dan arisan rutin bulanan.`,
    cover: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
    author: 'Ir. Rini Wulandari (Teh Rini - Anak Bungsu)',
    category: 'Kisah Leluhur',
    date: '2023-08-17',
    created_at: '2023-08-17'
  },
  {
    id: 'story-2',
    title: 'Rahasia Nasi Liwet & Pepes Ikan Legendaris Enin Ucah',
    slug: 'rahasia-nasi-liwet-enin-ucah',
    content: `Siapa pun yang pernah berkunjung ke rumah Enin Ucah pasti tidak akan melupakan aroma wangi daun salam, serai, dan asin jambal roti dari periuk nasi liwet beliau.

Enin Ucah percaya bahwa masakan yang dibuat dengan ketulusan dan doa akan mengikat hati anggota keluarga untuk selalu rindu pulang ke rumah. Saat ini, resep legendaris tersebut telah dibukukan secara digital oleh anak-cucu agar cita rasa hangat rumah Cigadung tetap abadi.`,
    cover: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&auto=format&fit=crop&q=80',
    author: 'Hj. Siti Nurhaliza (Ceu Siti)',
    category: 'Kenangan',
    date: '2023-10-10',
    created_at: '2023-10-10'
  },
  {
    id: 'story-3',
    title: 'Perjalanan Merantau ke Ibu Kota: Semangat Generasi ke-3',
    slug: 'perjalanan-merantau-generasi-3',
    content: `Meskipun berakar kuat di Tanah Sunda (Bandung & Tasikmalaya), generasi ketiga (cucu) mulai melebarkan sayap ke Jakarta, Melbourne, hingga Eropa. 

Namun, berkat adanya grup WhatsApp keluarga dan website silsilah digital ini, jarak ratusan bahkan ribuan kilometer tidak lagi menjadi halangan untuk mengetahui kabar kelahiran cicit baru, hari ulang tahun, maupun jadwal reuni tahunan.`,
    cover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    author: 'Rizky Pratama Wiratmadja (Cucu)',
    category: 'Cerita Cucu',
    date: '2024-01-15',
    created_at: '2024-01-15'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Pernikahan Suci Abah Odang & Enin Ucah',
    description: 'Momen bersejarah dimulainya ikatan keluarga besar ini di Tasikmalaya.',
    event_date: '1952-10-12',
    category: 'Pernikahan',
    created_at: '2023-01-01'
  },
  {
    id: 'ev-2',
    title: 'Kelahiran Putra Sulung (H. Asep Saepudin)',
    description: 'Lahirnya generasi ke-2 (Anak Pertama) yang membawa kegembiraan luar biasa di rumah Cigadung.',
    event_date: '1954-03-14',
    category: 'Kelahiran',
    created_at: '2023-01-01'
  },
  {
    id: 'ev-3',
    title: 'Ibadah Haji Bersama Abah Odang & Enin Ucah',
    description: 'Abah dan Enin menunaikan rukun Islam ke-5 ke Tanah Suci Makkah dan Madinah.',
    event_date: '1985-07-20',
    category: 'Haji/Umrah',
    created_at: '2023-01-01'
  },
  {
    id: 'ev-4',
    title: 'Kelahiran Cucu Pertama (Rizky Pratama)',
    description: 'Lahirnya generasi ke-3 (Cucu Pertama) yang melengkapi kebahagiaan Abah dan Enin sebagai kakek-nenek.',
    event_date: '1984-05-19',
    category: 'Kelahiran',
    created_at: '2023-01-01'
  },
  {
    id: 'ev-5',
    title: 'Wafatnya Abah Odang Tercinta',
    description: 'Abah Odang berpulang ke Rahmatullah pada usia 82 tahun, meninggalkan warisan ilmu dan keteladanan yang tak ternilai.',
    event_date: '2010-11-18',
    category: 'Wafat',
    created_at: '2023-01-01'
  },
  {
    id: 'ev-6',
    title: 'Kelahiran Cicit Pertama (Almeer Zayd)',
    description: 'Lahirnya generasi ke-4 (Cicit Pertama) dari pasangan Rizky & Annisa di Bandung.',
    event_date: '2013-09-10',
    category: 'Kelahiran',
    created_at: '2023-01-01'
  },
  {
    id: 'ev-7',
    title: 'Wafatnya Enin Ucah Tercinta',
    description: 'Enin Ucah menyusul Abah Odang ke Rahmatullah, menyatukan cinta mereka di keabadian surga.',
    event_date: '2016-04-10',
    category: 'Wafat',
    created_at: '2023-01-01'
  },
  {
    id: 'ev-8',
    title: 'Reuni Akbar 4 Turunan di Lembang',
    description: 'Acara silaturahmi besar-besaran 4 generasi dengan tema "Ngaput Balung Pisah, Mempererat Silaturahmi".',
    event_date: '2023-12-24',
    category: 'Reuni',
    created_at: '2023-12-25'
  },
  {
    id: 'ev-9',
    title: 'Reuni & Arisan Tahunan Keluarga Besar 2026',
    description: 'Silaturahmi tengah tahun untuk seluruh anak, cucu, dan cicit Abah Odang & Enin Ucah dengan agenda makan prasmanan Sunda dan pembagian doorprize.',
    event_date: '2026-07-15',
    time: '10:00 - 15:00 WIB',
    location: 'Villa Cigadung Raya No. 12, Bandung',
    location_url: 'https://maps.google.com',
    category: 'Reuni',
    is_upcoming: true,
    rsvps: [
      { id: 'rsvp-1', name: 'Kang Asep Saepudin', status: 'hadir', guests: 2, note: 'Siap hadir bersama istri tercinta.', created_at: '2026-06-28' },
      { id: 'rsvp-2', name: 'Rizky Pratama', status: 'hadir', guests: 4, note: 'Bawa anak-anak juga.', created_at: '2026-06-29' },
      { id: 'rsvp-3', name: 'Nadia Putri', status: 'hadir', guests: 1, note: 'Siap jadi MC acara!', created_at: '2026-06-30' },
      { id: 'rsvp-4', name: 'Ilham Mulyadi', status: 'ragu', guests: 1, note: 'Masih cek jadwal panen kopi di Pangalengan.', created_at: '2026-07-01' }
    ],
    created_at: '2026-06-01'
  },
  {
    id: 'ev-10',
    title: 'Syukuran & Doa Bersama Ulang Tahun Keluarga (Juli)',
    description: 'Acara doa bersama dan pemotongan tumpeng untuk mendoakan anggota keluarga yang berulang tahun di awal bulan Juli.',
    event_date: '2026-07-05',
    time: '15:30 - 18:00 WIB',
    location: 'Rumah Ceu Siti, Jl. Kemang Timur No. 40, Jakarta',
    location_url: 'https://maps.google.com',
    category: 'Ulang Tahun',
    is_upcoming: true,
    rsvps: [
      { id: 'rsvp-5', name: 'Farhan Setiawan', status: 'hadir', guests: 3, created_at: '2026-06-28' },
      { id: 'rsvp-6', name: 'Ceu Siti Nurhaliza', status: 'hadir', guests: 2, note: 'Tuan rumah siap menyambut.', created_at: '2026-06-28' }
    ],
    created_at: '2026-06-15'
  },
  {
    id: 'ev-11',
    title: 'Pengajian Rutin Triwulan Cabang Mang Dedi',
    description: 'Pengajian rutin keluarga dan musyawarah yayasan sosial yang dihadiri seluruh cabang keluarga.',
    event_date: '2026-08-02',
    time: '09:00 - 11:30 WIB',
    location: 'Masjid Al-Ikhlas Dago Atas, Bandung',
    category: 'Arisan / Pertemuan',
    is_upcoming: true,
    rsvps: [],
    created_at: '2026-06-20'
  }
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'Kang Asep Saepudin',
    relation: 'Anak ke-1',
    message: 'Alhamdulillah website silsilah keluarga kita sudah online. Semoga anak cucu dan cicit selalu ingat asal-usul dan terus menjaga silaturahmi.',
    created_at: '2024-01-02'
  },
  {
    id: 'gb-2',
    name: 'Nadia Putri Wiratmadja',
    relation: 'Cucu (Gen 3)',
    message: 'Keren banget ada interactive family tree-nya! Bangga jadi bagian dari keluarga besar Abah Odang & Enin Ucah ❤️',
    created_at: '2024-02-14'
  },
  {
    id: 'gb-3',
    name: 'Drs. H. Dedi Mulyadi',
    relation: 'Anak ke-3',
    message: 'Hatur nuhun buat Rizky dan tim yang sudah merancang website ini. Jangan lupa nanti bulan depan arisan keluarga di rumah Dago ya!',
    created_at: '2024-05-10'
  }
];

export const INITIAL_PROPOSALS: MemberProposal[] = [
  {
    id: 'prop-1',
    submitter_name: 'Boby Setiawan',
    submitter_contact: '081299887766',
    proposed_member: {
      nama: 'Bintang Alamsyah Setiawan',
      nama_panggilan: 'Bintang',
      jenis_kelamin: 'L',
      generation: 4,
      tempat_lahir: 'Jakarta',
      tanggal_lahir: '2024-03-01',
      pekerjaan: 'Bayi',
      pendidikan: '-',
      alamat: 'Jakarta Selatan'
    },
    relation_note: 'Anak kedua dari Farhan Setiawan & Syifa Fauziah (Cicit gen-4 baru lahir)',
    status: 'pending',
    created_at: '2024-06-01'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u-1',
    nama: 'Super Admin (Rizky Pratama)',
    email: 'admin@abahodang.fam',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'u-2',
    nama: 'Admin Keluarga (Teh Rini)',
    email: 'rini.wulandari@itb.ac.id',
    role: 'Admin Keluarga',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'u-3',
    nama: 'Editor (Nadia Putri)',
    email: 'editor@abahodang.fam',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'u-4',
    nama: 'Viewer Keluarga',
    email: 'viewer@abahodang.fam',
    role: 'Viewer'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    action: 'CREATE',
    entity: 'family_members',
    entity_id: 'gen4-4',
    description: 'Menambahkan cicit baru: Alesha Inara Setiawan (Gen 4)',
    performed_by: 'Super Admin (Rizky Pratama)',
    timestamp: '2024-01-23 14:30:00'
  },
  {
    id: 'log-2',
    action: 'UPDATE',
    entity: 'family_members',
    entity_id: 'gen3-6',
    description: 'Memperbarui gelar pendidikan dan pekerjaan dr. Rayhan Pamungkas',
    performed_by: 'Admin Keluarga (Teh Rini)',
    timestamp: '2024-03-15 09:15:00'
  },
  {
    id: 'log-3',
    action: 'CREATE',
    entity: 'gallery',
    entity_id: 'gal-6',
    description: 'Mengunggah foto baru: Wisuda S2 dr. Rayhan di Unpad',
    performed_by: 'Admin Keluarga (Teh Rini)',
    timestamp: '2024-05-12 16:45:00'
  }
];

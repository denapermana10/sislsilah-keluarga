export type GenerationNumber = 1 | 2 | 3 | 4;

export type Gender = 'L' | 'P';

export interface FamilyMember {
  id: string;
  parent_id?: string | null; // ID ayah/ibu kandung
  spouse_id?: string | null; // ID pasangan
  generation: GenerationNumber;
  nama: string;
  nama_panggilan: string;
  jenis_kelamin: Gender;
  tempat_lahir: string;
  tanggal_lahir: string;
  tanggal_wafat?: string; // kosong jika masih hidup
  pekerjaan: string;
  pendidikan: string;
  alamat: string;
  whatsapp: string;
  email: string;
  bio: string;
  photo_url: string;
  branch?: string; // e.g., 'Keluarga Abah Odang', 'Cabang H. Asep', etc.
  created_at?: string;
  updated_at?: string;
}

export type GalleryCategory = 'Foto Lama' | 'Foto Baru' | 'Pernikahan' | 'Reuni' | 'Liburan' | 'Hari Raya' | 'Video' | 'Dokumen';

export interface GalleryItem {
  id: string;
  member_id?: string;
  title: string;
  image: string;
  category: GalleryCategory;
  description?: string;
  date?: string;
  created_at: string;
}

export interface StoryItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover: string;
  author: string;
  category?: 'Kisah Leluhur' | 'Cerita Anak' | 'Cerita Cucu' | 'Kenangan';
  date: string;
  created_at: string;
}

export interface EventRSVP {
  id: string;
  name: string;
  member_id?: string;
  status: 'hadir' | 'berhalangan' | 'ragu';
  guests: number;
  note?: string;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  time?: string;
  location?: string;
  location_url?: string;
  image?: string;
  category: 'Pernikahan' | 'Kelahiran' | 'Wisuda' | 'Reuni' | 'Haji/Umrah' | 'Wafat' | 'Prestasi' | 'Arisan / Pertemuan' | 'Ulang Tahun' | 'Lainnya';
  is_upcoming?: boolean;
  rsvps?: EventRSVP[];
  created_at: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  relation: string;
  message: string;
  created_at: string;
}

export interface MemberProposal {
  id: string;
  submitter_name: string;
  submitter_contact: string;
  proposed_member: Partial<FamilyMember>;
  relation_note: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export type UserRole = 'Super Admin' | 'Admin Keluarga' | 'Editor' | 'Viewer';

export interface User {
  id: string;
  nama: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuditLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTORE' | 'APPROVE_PROPOSAL' | 'RSVP';
  entity: 'family_members' | 'gallery' | 'stories' | 'events' | 'proposals';
  entity_id: string;
  description: string;
  performed_by: string;
  timestamp: string;
  previous_data?: any;
  new_data?: any;
}

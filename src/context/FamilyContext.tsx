import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  FamilyMember, 
  GalleryItem, 
  StoryItem, 
  EventItem, 
  EventRSVP,
  GuestbookEntry, 
  MemberProposal, 
  User, 
  AuditLog,
  GenerationNumber
} from '../types';
import { 
  INITIAL_MEMBERS, 
  INITIAL_GALLERY, 
  INITIAL_STORIES, 
  INITIAL_EVENTS, 
  INITIAL_GUESTBOOK, 
  INITIAL_PROPOSALS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS
} from '../data/initialData';

interface FamilyContextType {
  members: FamilyMember[];
  deletedMembers: FamilyMember[];
  gallery: GalleryItem[];
  stories: StoryItem[];
  events: EventItem[];
  guestbook: GuestbookEntry[];
  proposals: MemberProposal[];
  users: User[];
  currentUser: User | null;
  auditLogs: AuditLog[];
  isSupabaseConnected: boolean;
  activeTab: string;
  selectedMemberForModal: FamilyMember | null;
  searchQuery: string;
  selectedGenerationFilter: GenerationNumber | 'ALL';
  selectedBranchFilter: string | 'ALL';
  isDarkMode: boolean;
  showAddMemberModal: boolean;
  addMemberModalProps: { defaultParentId?: string; defaultGeneration?: GenerationNumber; defaultBranch?: string } | null;
  
  // Actions
  setActiveTab: (tab: string) => void;
  setSelectedMemberForModal: (member: FamilyMember | null) => void;
  openAddMemberModal: (props?: { defaultParentId?: string; defaultGeneration?: GenerationNumber; defaultBranch?: string }) => void;
  closeAddMemberModal: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedGenerationFilter: (gen: GenerationNumber | 'ALL') => void;
  setSelectedBranchFilter: (branch: string | 'ALL') => void;
  setCurrentUser: (user: User | null) => void;
  toggleSupabaseConnection: () => void;
  toggleDarkMode: () => void;
  
  // CRUD Members
  addMember: (member: Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>) => void;
  updateMember: (id: string, updated: Partial<FamilyMember>) => void;
  deleteMember: (id: string) => void;
  restoreMember: (id: string) => void;
  
  // CRUD Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'created_at'>) => void;
  deleteGalleryItem: (id: string) => void;
  
  // CRUD Stories
  addStoryItem: (item: Omit<StoryItem, 'id' | 'created_at'>) => void;
  
  // CRUD Events & RSVP
  addEvent: (item: Omit<EventItem, 'id' | 'created_at'>) => void;
  updateEvent: (id: string, updated: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  rsvpEvent: (eventId: string, rsvp: Omit<EventRSVP, 'id' | 'created_at'>) => void;
  
  // Guestbook & Proposals
  addGuestbookEntry: (entry: Omit<GuestbookEntry, 'id' | 'created_at'>) => void;
  addProposal: (proposal: Omit<MemberProposal, 'id' | 'created_at' | 'status'>) => void;
  approveProposal: (proposalId: string) => void;
  rejectProposal: (proposalId: string) => void;
  
  // Reset
  resetToDefaultData: () => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MEMBERS: 'silsilah_abah_odang_members',
  DELETED_MEMBERS: 'silsilah_abah_odang_deleted_members',
  GALLERY: 'silsilah_abah_odang_gallery',
  STORIES: 'silsilah_abah_odang_stories',
  EVENTS: 'silsilah_abah_odang_events',
  GUESTBOOK: 'silsilah_abah_odang_guestbook',
  PROPOSALS: 'silsilah_abah_odang_proposals',
  AUDIT_LOGS: 'silsilah_abah_odang_audit_logs',
  SUPABASE_SYNC: 'silsilah_abah_odang_supabase_sync',
  USER: 'silsilah_abah_odang_current_user'
};

export const FamilyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or initial data
  const loadState = <T,>(key: string, defaultData: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultData;
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
      return defaultData;
    }
  };

  const [members, setMembers] = useState<FamilyMember[]>(() => loadState(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS));
  const [deletedMembers, setDeletedMembers] = useState<FamilyMember[]>(() => loadState(STORAGE_KEYS.DELETED_MEMBERS, []));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadState(STORAGE_KEYS.GALLERY, INITIAL_GALLERY));
  const [stories, setStories] = useState<StoryItem[]>(() => loadState(STORAGE_KEYS.STORIES, INITIAL_STORIES));
  const [events, setEvents] = useState<EventItem[]>(() => loadState(STORAGE_KEYS.EVENTS, INITIAL_EVENTS));
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(() => loadState(STORAGE_KEYS.GUESTBOOK, INITIAL_GUESTBOOK));
  const [proposals, setProposals] = useState<MemberProposal[]>(() => loadState(STORAGE_KEYS.PROPOSALS, INITIAL_PROPOSALS));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadState(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS));
  const [users] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadState(STORAGE_KEYS.USER, INITIAL_USERS[0]));
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(() => loadState(STORAGE_KEYS.SUPABASE_SYNC, true));
  
  // UI State
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [selectedMemberForModal, setSelectedMemberForModal] = useState<FamilyMember | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenerationFilter, setSelectedGenerationFilter] = useState<GenerationNumber | 'ALL'>('ALL');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string | 'ALL'>('ALL');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState<boolean>(false);
  const [addMemberModalProps, setAddMemberModalProps] = useState<{ defaultParentId?: string; defaultGeneration?: GenerationNumber; defaultBranch?: string } | null>(null);

  const openAddMemberModal = (props?: { defaultParentId?: string; defaultGeneration?: GenerationNumber; defaultBranch?: string }) => {
    setAddMemberModalProps(props || null);
    setShowAddMemberModal(true);
  };

  const closeAddMemberModal = () => {
    setShowAddMemberModal(false);
    setAddMemberModalProps(null);
  };

  // Sync to localStorage
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.DELETED_MEMBERS, JSON.stringify(deletedMembers)); }, [deletedMembers]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories)); }, [stories]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.GUESTBOOK, JSON.stringify(guestbook)); }, [guestbook]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals)); }, [proposals]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SUPABASE_SYNC, JSON.stringify(isSupabaseConnected)); }, [isSupabaseConnected]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser)); }, [currentUser]);

  const logAction = (
    action: AuditLog['action'],
    entity: AuditLog['entity'],
    entity_id: string,
    description: string,
    prev?: any,
    nextData?: any
  ) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action,
      entity,
      entity_id,
      description,
      performed_by: currentUser ? `${currentUser.role} (${currentUser.nama})` : 'Tamu / Sistem',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      previous_data: prev,
      new_data: nextData
    };
    setAuditLogs(prevLogs => [newLog, ...prevLogs]);
  };

  const addMember = (newMemData: Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>) => {
    const id = `gen${newMemData.generation}-${Date.now()}`;
    const newMember: FamilyMember = {
      ...newMemData,
      id,
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0]
    };
    setMembers(prev => [...prev, newMember]);
    logAction('CREATE', 'family_members', id, `Menambahkan anggota keluarga baru: ${newMember.nama} (Gen ${newMember.generation})`, null, newMember);
  };

  const updateMember = (id: string, updated: Partial<FamilyMember>) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        const next = { ...m, ...updated, updated_at: new Date().toISOString().split('T')[0] };
        logAction('UPDATE', 'family_members', id, `Memperbarui data anggota: ${next.nama}`, m, next);
        return next;
      }
      return m;
    }));
  };

  const deleteMember = (id: string) => {
    const target = members.find(m => m.id === id);
    if (target) {
      setDeletedMembers(prev => [target, ...prev]);
      setMembers(prev => prev.filter(m => m.id !== id));
      logAction('DELETE', 'family_members', id, `Menghapus anggota: ${target.nama} (disimpan di riwayat pemulihan)`, target, null);
    }
  };

  const restoreMember = (id: string) => {
    const target = deletedMembers.find(m => m.id === id);
    if (target) {
      setMembers(prev => [...prev, target]);
      setDeletedMembers(prev => prev.filter(m => m.id !== id));
      logAction('RESTORE', 'family_members', id, `Memulihkan anggota yang terhapus: ${target.nama}`, null, target);
    }
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id' | 'created_at'>) => {
    const id = `gal-${Date.now()}`;
    const newItem: GalleryItem = {
      ...item,
      id,
      created_at: new Date().toISOString().split('T')[0]
    };
    setGallery(prev => [newItem, ...prev]);
    logAction('CREATE', 'gallery', id, `Mengunggah foto galeri: ${item.title}`);
  };

  const deleteGalleryItem = (id: string) => {
    const target = gallery.find(g => g.id === id);
    if (target) {
      setGallery(prev => prev.filter(g => g.id !== id));
      logAction('DELETE', 'gallery', id, `Menghapus foto galeri: ${target.title}`);
    }
  };

  const addStoryItem = (item: Omit<StoryItem, 'id' | 'created_at'>) => {
    const id = `story-${Date.now()}`;
    const newItem: StoryItem = {
      ...item,
      id,
      created_at: new Date().toISOString().split('T')[0]
    };
    setStories(prev => [newItem, ...prev]);
    logAction('CREATE', 'stories', id, `Menerbitkan cerita keluarga: ${item.title}`);
  };

  const addEvent = (item: Omit<EventItem, 'id' | 'created_at'>) => {
    const id = `ev-${Date.now()}`;
    const newEvent: EventItem = {
      ...item,
      id,
      created_at: new Date().toISOString().split('T')[0]
    };
    setEvents(prev => [newEvent, ...prev]);
    logAction('CREATE', 'events', id, `Menambahkan acara keluarga: ${item.title}`);
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        return { ...ev, ...updated };
      }
      return ev;
    }));
    logAction('UPDATE', 'events', id, `Memperbarui detail acara ID: ${id}`);
  };

  const deleteEvent = (id: string) => {
    const ev = events.find(e => e.id === id);
    setEvents(prev => prev.filter(e => e.id !== id));
    logAction('DELETE', 'events', id, `Menghapus acara: ${ev?.title || id}`);
  };

  const rsvpEvent = (eventId: string, rsvpData: Omit<EventRSVP, 'id' | 'created_at'>) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const currentRsvps = ev.rsvps || [];
        // Check if user already rsvp'd by name or member_id
        const existingIdx = currentRsvps.findIndex(r => 
          (rsvpData.member_id && r.member_id === rsvpData.member_id) || 
          r.name.toLowerCase() === rsvpData.name.toLowerCase()
        );

        let updatedRsvps;
        if (existingIdx >= 0) {
          updatedRsvps = [...currentRsvps];
          updatedRsvps[existingIdx] = {
            ...updatedRsvps[existingIdx],
            ...rsvpData
          };
        } else {
          const newRsvp: EventRSVP = {
            ...rsvpData,
            id: `rsvp-${Date.now()}`,
            created_at: new Date().toISOString().split('T')[0]
          };
          updatedRsvps = [newRsvp, ...currentRsvps];
        }
        return { ...ev, rsvps: updatedRsvps };
      }
      return ev;
    }));
    logAction('RSVP', 'events', eventId, `Konfirmasi kehadiran (${rsvpData.status}) oleh: ${rsvpData.name}`);
  };

  const addGuestbookEntry = (entry: Omit<GuestbookEntry, 'id' | 'created_at'>) => {
    const id = `gb-${Date.now()}`;
    const newEntry: GuestbookEntry = {
      ...entry,
      id,
      created_at: new Date().toISOString().split('T')[0]
    };
    setGuestbook(prev => [newEntry, ...prev]);
  };

  const addProposal = (propData: Omit<MemberProposal, 'id' | 'created_at' | 'status'>) => {
    const id = `prop-${Date.now()}`;
    const newProp: MemberProposal = {
      ...propData,
      id,
      status: 'pending',
      created_at: new Date().toISOString().split('T')[0]
    };
    setProposals(prev => [newProp, ...prev]);
  };

  const approveProposal = (proposalId: string) => {
    const prop = proposals.find(p => p.id === proposalId);
    if (prop && prop.proposed_member) {
      const p = prop.proposed_member;
      addMember({
        generation: (p.generation || 4) as GenerationNumber,
        nama: p.nama || 'Anggota Baru',
        nama_panggilan: p.nama_panggilan || 'Anggota',
        jenis_kelamin: (p.jenis_kelamin || 'L') as 'L' | 'P',
        tempat_lahir: p.tempat_lahir || 'Bandung',
        tanggal_lahir: p.tanggal_lahir || '2000-01-01',
        pekerjaan: p.pekerjaan || '-',
        pendidikan: p.pendidikan || '-',
        alamat: p.alamat || '-',
        whatsapp: p.whatsapp || '-',
        email: p.email || '-',
        bio: p.bio || `Diantrekan melalui usulan oleh ${prop.submitter_name}.`,
        photo_url: p.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        branch: 'Cabang Usulan Baru'
      });
      setProposals(prev => prev.map(p => p.id === proposalId ? { ...p, status: 'approved' } : p));
      logAction('APPROVE_PROPOSAL', 'proposals', proposalId, `Menyetujui usulan anggota: ${prop.proposed_member.nama}`);
    }
  };

  const rejectProposal = (proposalId: string) => {
    setProposals(prev => prev.map(p => p.id === proposalId ? { ...p, status: 'rejected' } : p));
  };

  const toggleSupabaseConnection = () => {
    setIsSupabaseConnected(prev => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const resetToDefaultData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang semua data ke kondisi awal Abah Odang & Enin Ucah?')) {
      setMembers(INITIAL_MEMBERS);
      setDeletedMembers([]);
      setGallery(INITIAL_GALLERY);
      setStories(INITIAL_STORIES);
      setEvents(INITIAL_EVENTS);
      setGuestbook(INITIAL_GUESTBOOK);
      setProposals(INITIAL_PROPOSALS);
      setAuditLogs(INITIAL_AUDIT_LOGS);
      localStorage.clear();
      alert('Data silsilah berhasil dikembalikan ke default!');
    }
  };

  return (
    <FamilyContext.Provider value={{
      members,
      deletedMembers,
      gallery,
      stories,
      events,
      guestbook,
      proposals,
      users,
      currentUser,
      auditLogs,
      isSupabaseConnected,
      activeTab,
      selectedMemberForModal,
      searchQuery,
      selectedGenerationFilter,
      selectedBranchFilter,
      isDarkMode,
      showAddMemberModal,
      addMemberModalProps,
      
      setActiveTab,
      setSelectedMemberForModal,
      openAddMemberModal,
      closeAddMemberModal,
      setSearchQuery,
      setSelectedGenerationFilter,
      setSelectedBranchFilter,
      setCurrentUser,
      toggleSupabaseConnection,
      toggleDarkMode,
      
      addMember,
      updateMember,
      deleteMember,
      restoreMember,
      addGalleryItem,
      deleteGalleryItem,
      addStoryItem,
      addEvent,
      updateEvent,
      deleteEvent,
      rsvpEvent,
      addGuestbookEntry,
      addProposal,
      approveProposal,
      rejectProposal,
      resetToDefaultData
    }}>
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) throw new Error('useFamily must be used within a FamilyProvider');
  return context;
};

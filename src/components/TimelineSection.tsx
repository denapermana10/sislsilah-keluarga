import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import { EventItem, EventRSVP } from '../types';
import { 
  Calendar, 
  Heart, 
  Award, 
  Users, 
  Sparkles, 
  Plus,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  UserCheck,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  History,
  Cake,
  MessageSquare,
  X
} from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { events, members, isDarkMode, currentUser, addEvent, updateEvent, deleteEvent, rsvpEvent } = useFamily();
  
  // Navigation tabs between Upcoming Calendar and Historical Timeline
  const [viewMode, setViewMode] = useState<'upcoming' | 'history'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Modal states for Admin Add/Edit Event
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    event_date: string;
    time: string;
    location: string;
    location_url: string;
    category: EventItem['category'];
    is_upcoming: boolean;
  }>({
    title: '',
    description: '',
    event_date: new Date().toISOString().split('T')[0],
    time: '10:00 - 15:00 WIB',
    location: 'Villa Cigadung Raya No. 12, Bandung',
    location_url: 'https://maps.google.com',
    category: 'Reuni',
    is_upcoming: true
  });

  // RSVP Modal state
  const [showRsvpModal, setShowRsvpModal] = useState<boolean>(false);
  const [rsvpEventTarget, setRsvpEventTarget] = useState<EventItem | null>(null);
  const [rsvpForm, setRsvpForm] = useState<{
    name: string;
    member_id: string;
    status: 'hadir' | 'berhalangan' | 'ragu';
    guests: number;
    note: string;
  }>({
    name: currentUser?.nama || '',
    member_id: '',
    status: 'hadir',
    guests: 1,
    note: ''
  });

  // Expanded RSVPs cards list view
  const [expandedRsvpIds, setExpandedRsvpIds] = useState<{ [key: string]: boolean }>({});

  const categories = ['ALL', 'Reuni', 'Ulang Tahun', 'Arisan / Pertemuan', 'Pernikahan', 'Kelahiran', 'Wisuda', 'Haji/Umrah', 'Wafat', 'Prestasi', 'Lainnya'];

  const isAdmin = currentUser?.role === 'Super Admin' || currentUser?.role === 'Admin Keluarga';

  // Separate upcoming/calendar events vs historical timeline events
  const todayStr = new Date().toISOString().split('T')[0];
  
  const upcomingEvents = events.filter(e => {
    const isFut = e.is_upcoming || e.event_date >= '2026-01-01' || e.event_date >= todayStr;
    const matchesCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    return isFut && matchesCat;
  }).sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());

  const historyEvents = events.filter(e => {
    const isHist = !e.is_upcoming && e.event_date < '2026-01-01' && e.event_date < todayStr;
    const matchesCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    return isHist && matchesCat;
  }).sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Pernikahan':
        return { bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/20', icon: Heart };
      case 'Kelahiran':
        return { bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-500/20', icon: Sparkles };
      case 'Wisuda':
      case 'Prestasi':
        return { bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20', icon: Award };
      case 'Reuni':
      case 'Arisan / Pertemuan':
        return { bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20', icon: Users };
      case 'Ulang Tahun':
        return { bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20', icon: Cake };
      default:
        return { bg: 'bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-500/20', icon: Calendar };
    }
  };

  const handleOpenEventModal = (event?: EventItem) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        event_date: event.event_date,
        time: event.time || '10:00 - 15:00 WIB',
        location: event.location || 'Bandung',
        location_url: event.location_url || 'https://maps.google.com',
        category: event.category,
        is_upcoming: event.is_upcoming !== undefined ? event.is_upcoming : true
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        event_date: new Date().toISOString().split('T')[0],
        time: '10:00 - 15:00 WIB',
        location: 'Villa Cigadung Raya No. 12, Bandung',
        location_url: 'https://maps.google.com',
        category: 'Reuni',
        is_upcoming: true
      });
    }
    setShowEventModal(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.event_date) {
      alert('Judul acara dan tanggal wajib diisi.');
      return;
    }

    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
      alert('Detail acara berhasil diperbarui!');
    } else {
      addEvent(formData);
      alert('Acara baru berhasil ditambahkan ke kalender keluarga!');
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = (event: EventItem) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus acara "${event.title}"?`)) {
      deleteEvent(event.id);
    }
  };

  const handleOpenRsvpModal = (event: EventItem) => {
    setRsvpEventTarget(event);
    setRsvpForm({
      name: currentUser?.nama || '',
      member_id: '',
      status: 'hadir',
      guests: 1,
      note: ''
    });
    setShowRsvpModal(true);
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpEventTarget || !rsvpForm.name) {
      alert('Nama wajib diisi untuk RSVP.');
      return;
    }

    rsvpEvent(rsvpEventTarget.id, rsvpForm);
    alert(`⚡ Terima kasih! Konfirmasi kehadiran (${rsvpForm.status.toUpperCase()}) untuk "${rsvpEventTarget.title}" berhasil disimpan.`);
    setShowRsvpModal(false);
  };

  const toggleExpandRsvp = (eventId: string) => {
    setExpandedRsvpIds(prev => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  return (
    <div className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#101f18] text-emerald-100' : 'bg-[#fcfbf7] text-[#1a2e26]'} transition-colors duration-300 border-t border-[#d4af37]/20`}>
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#d4af37]/30 pb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] dark:text-[#ffe885] border border-[#2d6a4f]/20 font-semibold text-xs uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" /> Agenda & Sejarah
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
              Kalender Acara & <span className="text-[#2d6a4f] dark:text-[#d4af37]">Linimasa Keluarga</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-200/80 font-serif-islamic italic">
              Kelola jadwal arisan, reuni, dan ulang tahun keluarga, serta telusuri kembali jejak sejarah Abah Odang & Enin Ucah sejak 1952.
            </p>
          </div>

          {/* View Mode Toggle Buttons & Admin CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-gray-100 dark:bg-[#0e1c16] p-1.5 rounded-2xl border border-gray-200 dark:border-emerald-800">
              <button
                onClick={() => setViewMode('upcoming')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'upcoming'
                    ? 'bg-[#1b4332] text-[#ffe885] shadow'
                    : 'text-gray-600 dark:text-emerald-300 hover:text-gray-900'
                }`}
              >
                <Calendar className="w-4 h-4" /> Kalender & Acara ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'history'
                    ? 'bg-[#1b4332] text-[#ffe885] shadow'
                    : 'text-gray-600 dark:text-emerald-300 hover:text-gray-900'
                }`}
              >
                <History className="w-4 h-4" /> Linimasa Sejarah ({historyEvents.length})
              </button>
            </div>

            {isAdmin && (
              <button
                onClick={() => handleOpenEventModal()}
                className="bg-[#d4af37] hover:bg-[#ffe885] text-[#1b4332] font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow transition-all shrink-0"
              >
                <Plus className="w-4 h-4" /> Tambah Acara / Sejarah
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-gray-100/80 dark:bg-[#0e1c16]/80 p-2 rounded-2xl border border-gray-200 dark:border-emerald-800/80">
          <span className="text-xs font-bold px-2 text-gray-500 dark:text-emerald-300">Filter Kategori:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#2d6a4f] text-[#ffe885] font-bold shadow' 
                  : 'text-gray-600 dark:text-emerald-300 hover:bg-white dark:hover:bg-[#152a21]'
              }`}
            >
              {cat === 'ALL' ? '⚡ Semua' : cat}
            </button>
          ))}
        </div>

        {/* VIEW 1: UPCOMING CALENDAR & RSVPS */}
        {viewMode === 'upcoming' && (
          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#152a21]/50 rounded-3xl border border-dashed border-gray-300 dark:border-emerald-800">
                <Calendar className="w-12 h-12 text-gray-300 dark:text-emerald-700 mx-auto mb-3" />
                <h4 className="font-heading font-bold text-lg text-gray-700 dark:text-white">Belum Ada Agenda Acara Mendatang</h4>
                <p className="text-xs text-gray-500 dark:text-emerald-300/80 max-w-md mx-auto mt-1">
                  Saat ini belum ada jadwal reuni, arisan, atau syukuran terdekat. Admin keluarga dapat menambahkan jadwal baru.
                </p>
                {isAdmin && (
                  <button
                    onClick={() => handleOpenEventModal()}
                    className="mt-4 bg-[#1b4332] text-[#ffe885] px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Tambah Jadwal Acara Sekarang
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {upcomingEvents.map(ev => {
                  const badge = getCategoryBadge(ev.category);
                  const Icon = badge.icon;
                  const rsvps = ev.rsvps || [];
                  const hadirCount = rsvps.filter(r => r.status === 'hadir').reduce((sum, r) => sum + (r.guests || 1), 0);
                  const berhalanganCount = rsvps.filter(r => r.status === 'berhalangan').length;
                  const raguCount = rsvps.filter(r => r.status === 'ragu').length;
                  const isExpanded = expandedRsvpIds[ev.id];

                  return (
                    <div 
                      key={ev.id}
                      className={`p-6 sm:p-7 rounded-3xl border-2 transition-all shadow-lg ${
                        isDarkMode 
                          ? 'bg-gradient-to-br from-[#152a21] to-[#0e1c16] border-[#2d6a4f]/70 hover:border-[#ffe885]/80' 
                          : 'bg-gradient-to-br from-white via-[#fffefc] to-[#fffbf0] border-emerald-600/30 hover:border-[#2d6a4f]'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        
                        {/* Event Left Info */}
                        <div className="space-y-4 flex-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${badge.bg}`}>
                              <Icon className="w-3.5 h-3.5" />
                              {ev.category}
                            </span>
                            <span className="text-xs font-bold bg-[#d4af37]/20 text-[#1b4332] dark:text-[#ffe885] px-3 py-1 rounded-full border border-[#d4af37]/40">
                              ⚡ Agenda Terjadwal
                            </span>
                          </div>

                          <div>
                            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1b4332] dark:text-white">
                              {ev.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/90 mt-2 leading-relaxed">
                              {ev.description}
                            </p>
                          </div>

                          {/* Event Date, Time, Location Bar */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100 dark:border-emerald-800/50 text-xs font-semibold text-gray-700 dark:text-emerald-200">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-[#2d6a4f] dark:text-[#ffe885] flex items-center justify-center shrink-0">
                                <Calendar className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="block text-[10px] text-gray-400">Tanggal & Waktu</span>
                                <span>{new Date(ev.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                {ev.time && <span className="block text-emerald-600 dark:text-[#ffe885] font-mono text-[11px]">{ev.time}</span>}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="block text-[10px] text-gray-400">Lokasi Acara</span>
                                <span className="truncate block">{ev.location || 'Bandung'}</span>
                                {ev.location_url && (
                                  <a 
                                    href={ev.location_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[11px] text-blue-600 dark:text-sky-300 hover:underline inline-flex items-center gap-1"
                                  >
                                    Buka Peta Google <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RSVP Action Box */}
                        <div className={`lg:w-80 p-5 rounded-2xl border flex flex-col justify-between shrink-0 ${
                          isDarkMode ? 'bg-[#0e1c16]/90 border-emerald-800' : 'bg-gray-50/90 border-gray-200'
                        }`}>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-gray-500 dark:text-emerald-300 flex items-center gap-1.5">
                                <UserCheck className="w-4 h-4 text-[#2d6a4f] dark:text-[#ffe885]" /> Status Kehadiran:
                              </span>
                              {isAdmin && (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleOpenEventModal(ev)}
                                    className="p-1.5 rounded-lg text-gray-500 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-emerald-900 transition-colors"
                                    title="Edit Acara"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEvent(ev)}
                                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-500 hover:bg-gray-200 dark:hover:bg-emerald-900 transition-colors"
                                    title="Hapus Acara"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-3 gap-1.5 text-center py-2 px-3 rounded-xl bg-white dark:bg-[#152a21] border border-gray-200 dark:border-emerald-800">
                              <div>
                                <span className="block text-base font-bold text-emerald-600 dark:text-[#ffe885]">{hadirCount}</span>
                                <span className="text-[10px] text-gray-500">Hadir</span>
                              </div>
                              <div className="border-l border-r border-gray-200 dark:border-emerald-800">
                                <span className="block text-base font-bold text-amber-500">{raguCount}</span>
                                <span className="text-[10px] text-gray-500">Ragu</span>
                              </div>
                              <div>
                                <span className="block text-base font-bold text-rose-500">{berhalanganCount}</span>
                                <span className="text-[10px] text-gray-500">Batal</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <button
                              onClick={() => handleOpenRsvpModal(ev)}
                              className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] text-[#ffe885] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#ffe885]" /> Konfirmasi Kehadiran (RSVP)
                            </button>

                            {rsvps.length > 0 && (
                              <button
                                onClick={() => toggleExpandRsvp(ev.id)}
                                className="w-full text-center text-xs font-semibold text-gray-600 dark:text-emerald-300 hover:underline flex items-center justify-center gap-1 pt-1"
                              >
                                {isExpanded ? 'Tutup Daftar Hadir' : `Lihat Siapa Saja Yang Hadir (${rsvps.length})`}
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Expanded RSVPs List */}
                      {isExpanded && rsvps.length > 0 && (
                        <div className="mt-6 pt-5 border-t border-gray-200 dark:border-emerald-800/80 animate-fadeIn space-y-3">
                          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-emerald-300">
                            Daftar Konfirmasi Kehadiran ({rsvps.length} Keluarga):
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {rsvps.map(r => (
                              <div 
                                key={r.id} 
                                className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                                  r.status === 'hadir'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-200'
                                    : r.status === 'ragu'
                                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                                      : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                                }`}
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5 font-bold">
                                    <span className="truncate">{r.name}</span>
                                    {r.guests > 1 && <span className="text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-md">+{r.guests - 1} tamu</span>}
                                  </div>
                                  {r.note && <p className="text-[11px] italic mt-1 text-gray-600 dark:text-emerald-300/80 line-clamp-2">"{r.note}"</p>}
                                  <span className="text-[9px] text-gray-400 block mt-1">Dicatat {r.created_at}</span>
                                </div>

                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                  r.status === 'hadir' ? 'bg-emerald-600 text-white' : r.status === 'ragu' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                                }`}>
                                  {r.status.toUpperCase()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: HISTORICAL TIMELINE */}
        {viewMode === 'history' && (
          <div className="relative border-l-2 border-[#d4af37] ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-12 py-4">
            {historyEvents.map((ev, idx) => {
              const badge = getCategoryBadge(ev.category);
              const Icon = badge.icon;

              return (
                <div key={ev.id} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1b4332] border-2 border-[#d4af37] flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffe885]" />
                  </div>

                  {/* Date Label on Left for Desktop */}
                  <div className="hidden sm:block absolute -left-36 top-1.5 text-right w-24">
                    <span className="font-heading font-bold text-sm text-[#1b4332] dark:text-[#ffe885]">
                      {new Date(ev.event_date).getFullYear()}
                    </span>
                    <span className="block text-[11px] text-gray-500 dark:text-emerald-200/70">
                      {new Date(ev.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  {/* Event Card */}
                  <div className={`p-6 rounded-2xl border transition-all shadow-md hover:shadow-xl ${
                    isDarkMode ? 'bg-[#152a21] border-[#2d6a4f]/50' : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                        {ev.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="sm:hidden text-xs font-bold text-[#1b4332] dark:text-[#ffe885]">
                          {new Date(ev.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        {isAdmin && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEventModal(ev)}
                              className="p-1 rounded text-gray-400 hover:text-blue-500 transition-colors"
                              title="Edit Sejarah"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(ev)}
                              className="p-1 rounded text-gray-400 hover:text-rose-500 transition-colors"
                              title="Hapus Sejarah"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1b4332] dark:text-white mb-2">
                      {ev.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/90 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                </div>
              );
            })}

            {historyEvents.length === 0 && (
              <div className="text-center py-12 text-gray-500 italic">
                Tidak ada peristiwa sejarah untuk kategori ini.
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL 1: RSVP FORM */}
      {showRsvpModal && rsvpEventTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-5 ${
            isDarkMode ? 'bg-[#10291e] border-[#d4af37] text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}>
            <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/20 text-[#2d6a4f] dark:text-[#ffe885] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg">Konfirmasi Kehadiran (RSVP)</h4>
                  <p className="text-xs text-gray-500 dark:text-emerald-300 truncate max-w-[220px] sm:max-w-xs">{rsvpEventTarget.title}</p>
                </div>
              </div>
              <button onClick={() => setShowRsvpModal(false)} className="p-1 rounded-lg text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRsvp} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold mb-1">Nama Anggota / Keluarga *</label>
                <input 
                  type="text"
                  required
                  placeholder="Contoh: Kang Asep / Keluarga Rizky"
                  value={rsvpForm.name}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Status Kehadiran *</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'hadir', label: '✅ Hadir', color: 'bg-emerald-600 text-white' },
                    { val: 'ragu', label: '🤔 Ragu-ragu', color: 'bg-amber-500 text-white' },
                    { val: 'berhalangan', label: '❌ Berhalangan', color: 'bg-rose-600 text-white' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, status: opt.val as any })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        rsvpForm.status === opt.val
                          ? `${opt.color} shadow-md scale-105 border-transparent`
                          : 'bg-gray-100 dark:bg-[#0e1c16] text-gray-600 dark:text-emerald-300 border-gray-200 dark:border-emerald-800'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {rsvpForm.status === 'hadir' && (
                <div>
                  <label className="block text-xs font-bold mb-1">Total Orang (Termasuk Pasangan/Anak)</label>
                  <input 
                    type="number"
                    min="1"
                    max="20"
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: parseInt(e.target.value, 10) || 1 })}
                    className={`w-full px-4 py-2 rounded-xl border text-sm ${
                      isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold mb-1">Catatan Tambahan (Opsional)</label>
                <textarea 
                  rows={2}
                  placeholder="Contoh: Insya Allah datang tepat waktu, bawa kue brownies..."
                  value={rsvpForm.note}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, note: e.target.value })}
                  className={`w-full px-4 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-200 dark:border-emerald-800">
                <button
                  type="button"
                  onClick={() => setShowRsvpModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-emerald-900 text-gray-700 dark:text-emerald-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1b4332] text-[#ffe885] hover:bg-[#2d6a4f] shadow"
                >
                  Kirim Konfirmasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADMIN ADD/EDIT EVENT */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto ${
            isDarkMode ? 'bg-[#10291e] border-[#d4af37] text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}>
            <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-3">
              <h4 className="font-heading font-bold text-lg flex items-center gap-2 text-[#1b4332] dark:text-[#ffe885]">
                <Calendar className="w-5 h-5 text-[#d4af37]" />
                {editingEvent ? 'Edit Detail Acara' : 'Tambah Acara & Kalender Keluarga'}
              </h4>
              <button onClick={() => setShowEventModal(false)} className="p-1 rounded-lg text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold mb-1">Judul Acara / Peristiwa *</label>
                <input 
                  type="text"
                  required
                  placeholder="Contoh: Reuni Akbar Keluarga 2026 / Pernikahan Rizky"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Tanggal *</label>
                  <input 
                    type="date"
                    required
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className={`w-full px-4 py-2 rounded-xl border text-sm ${
                      isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Waktu Acara (Opsional)</label>
                  <input 
                    type="text"
                    placeholder="Contoh: 09:00 - 14:00 WIB"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={`w-full px-4 py-2 rounded-xl border text-sm ${
                      isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Kategori Acara</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className={`w-full px-4 py-2 rounded-xl border text-sm ${
                      isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  >
                    {categories.filter(c => c !== 'ALL').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Tipe Penayangan</label>
                  <select
                    value={formData.is_upcoming ? 'upcoming' : 'history'}
                    onChange={(e) => setFormData({ ...formData, is_upcoming: e.target.value === 'upcoming' })}
                    className={`w-full px-4 py-2 rounded-xl border text-sm ${
                      isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="upcoming">📅 Kalender & Acara Mendatang</option>
                    <option value="history">📜 Linimasa Sejarah Masa Lalu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Lokasi / Alamat</label>
                <input 
                  type="text"
                  placeholder="Contoh: Villa Cigadung Raya No. 12, Bandung"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Link Google Maps (Opsional)</label>
                <input 
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={formData.location_url}
                  onChange={(e) => setFormData({ ...formData, location_url: e.target.value })}
                  className={`w-full px-4 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Deskripsi Lengkap *</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Tuliskan detail agenda acara, susunan kegiatan, dresscode, atau catatan penting..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-[#0e1c16] border-emerald-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200 dark:border-emerald-800">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-emerald-900 text-gray-700 dark:text-emerald-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1b4332] text-[#ffe885] hover:bg-[#2d6a4f] shadow"
                >
                  {editingEvent ? 'Simpan Perubahan' : 'Tambahkan Acara'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

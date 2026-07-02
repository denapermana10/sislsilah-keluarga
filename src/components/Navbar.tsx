import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import { 
  Users, 
  Trees, 
  Image, 
  BookOpen, 
  UserCheck, 
  MessageSquare, 
  Settings, 
  Search, 
  Database, 
  Menu, 
  X, 
  ShieldCheck, 
  Moon, 
  Sun,
  Home
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery, 
    isSupabaseConnected, 
    toggleSupabaseConnection,
    currentUser,
    users,
    setCurrentUser,
    isDarkMode,
    toggleDarkMode
  } = useFamily();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'tentang', label: 'Tentang Keluarga', icon: Users },
    { id: 'silsilah', label: 'Pohon Silsilah (4 Turunan)', icon: Trees },
    { id: 'data_anggota', label: 'Data Anggota', icon: UserCheck },
    { id: 'galeri', label: 'Galeri & Video', icon: Image },
    { id: 'cerita', label: 'Cerita Leluhur', icon: BookOpen },
    { id: 'buku_tamu', label: 'Buku Tamu & Usulan', icon: MessageSquare },
    { id: 'admin', label: 'Dashboard Admin', icon: Settings, isAdmin: true }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1b4332] text-white shadow-lg border-b border-[#d4af37]/40 transition-colors duration-300">
      {/* Top Banner for Supabase Status & Role Switcher */}
      <div className="bg-[#122c21] px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#2d6a4f]/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSupabaseConnection}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
              isSupabaseConnected 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
            title="Klik untuk simulasi status koneksi Supabase PostgreSQL"
          >
            <Database className="w-3 h-3" />
            <span>Supabase PostgreSQL: {isSupabaseConnected ? 'Online (Connected)' : 'Offline (Local Sync)'}</span>
            <span className={`w-2 h-2 rounded-full ${isSupabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          </button>
          <span className="hidden md:inline text-[#d4af37] font-serif-islamic italic">
            "Silih Asih, Silih Asah, Silih Asuh"
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Role Switcher for Testing RBAC */}
          <div className="relative">
            <button 
              onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
              className="flex items-center gap-1.5 bg-[#2d6a4f] hover:bg-[#3d8a67] px-2.5 py-0.5 rounded text-xs border border-[#d4af37]/30 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Akses: <strong>{currentUser?.role || 'Tamu'}</strong></span>
            </button>

            {showRoleSwitcher && (
              <div className="absolute right-0 mt-1 w-56 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b">
                  Ganti Hak Akses (RBAC Test)
                </div>
                {users.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setCurrentUser(u);
                      setShowRoleSwitcher(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#fcfbf7] ${
                      currentUser?.id === u.id ? 'bg-emerald-50 font-bold text-[#1b4332]' : 'text-gray-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{u.role}</div>
                      <div className="text-[10px] text-gray-500">{u.nama}</div>
                    </div>
                    {currentUser?.id === u.id && <span className="text-[#1b4332] text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#d4af37]"
            title={isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div 
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#ffe885] shadow-lg shrink-0 group-hover:scale-105 transition-all bg-[#122c21]">
              <img 
                src="https://lh3.googleusercontent.com/d/1WbFmRfG4p89aetw52ZseayGvrBDOfyHp=w1000" 
                alt="Abah Odang & Enin Ucah"
                onError={(e) => {
                  e.currentTarget.src = 'https://drive.google.com/thumbnail?id=1WbFmRfG4p89aetw52ZseayGvrBDOfyHp&sz=w1000';
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-heading font-bold text-base sm:text-lg leading-tight tracking-wide text-white group-hover:text-[#ffe885] transition-colors">
                ABAH ODANG & ENIN UCAH
              </h1>
              <p className="text-[11px] text-[#d4af37] font-medium uppercase tracking-wider">
                Silsilah Keluarga 4 Turunan
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-200" />
              <input
                type="text"
                placeholder="Cari nama, panggilan, kota..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'silsilah' && activeTab !== 'data_anggota') {
                    setActiveTab('silsilah');
                  }
                }}
                className="w-full bg-[#2d6a4f]/70 text-white placeholder-emerald-200/70 text-xs rounded-full pl-9 pr-4 py-1.5 border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:bg-[#2d6a4f] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-200 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-[#d4af37] text-[#1b4332] font-bold shadow-md scale-105' 
                      : item.isAdmin
                      ? 'bg-amber-500/20 text-[#ffe885] border border-amber-500/30 hover:bg-amber-500/30'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1b4332]' : 'text-[#d4af37]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#2d6a4f] text-white hover:bg-[#3d8a67] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#122c21] border-t border-[#d4af37]/30 px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
          {/* Mobile Search */}
          <div className="relative pt-1 pb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-200" />
            <input
              type="text"
              placeholder="Cari anggota keluarga..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTab('silsilah');
              }}
              className="w-full bg-[#2d6a4f] text-white placeholder-emerald-200 text-sm rounded-full pl-9 pr-4 py-2 border border-[#d4af37]/30 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                    isActive 
                      ? 'bg-[#d4af37] text-[#1b4332] font-bold shadow-md col-span-2' 
                      : 'bg-[#1b4332] text-emerald-100 hover:bg-[#2d6a4f]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1b4332]' : 'text-[#d4af37]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

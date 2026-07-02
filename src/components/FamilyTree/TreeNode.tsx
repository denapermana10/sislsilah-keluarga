import React from 'react';
import { FamilyMember, GenerationNumber } from '../../types';
import { useFamily } from '../../context/FamilyContext';
import { User, Heart, ChevronDown, ChevronUp, Eye, Sparkles } from 'lucide-react';

interface TreeNodeProps {
  member: FamilyMember;
  spouse?: FamilyMember;
  childrenMembers: FamilyMember[];
  isExpanded: boolean;
  onToggleExpand: (memberId: string) => void;
  isHighlighted?: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  member,
  spouse,
  childrenMembers,
  isExpanded,
  onToggleExpand,
  isHighlighted = false
}) => {
  const { setSelectedMemberForModal, isDarkMode, openAddMemberModal } = useFamily();

  const getGenerationBadgeColor = (gen: GenerationNumber) => {
    switch (gen) {
      case 1:
        return 'bg-gradient-to-r from-[#d4af37] to-[#f0a500] text-[#1b4332] border-[#ffe885]';
      case 2:
        return 'bg-[#1b4332] text-white border-[#d4af37]';
      case 3:
        return 'bg-[#2d6a4f] text-emerald-100 border-emerald-400';
      case 4:
        return 'bg-emerald-800 text-emerald-200 border-emerald-600';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  const getGenerationName = (gen: GenerationNumber) => {
    switch (gen) {
      case 1: return 'Gen 1 • Leluhur';
      case 2: return 'Gen 2 • Anak';
      case 3: return 'Gen 3 • Cucu';
      case 4: return 'Gen 4 • Cicit';
      default: return `Gen ${gen}`;
    }
  };

  const isDeceased = !!member.tanggal_wafat;

  return (
    <div className={`relative flex flex-col items-center transition-all duration-300 ${isHighlighted ? 'scale-105 z-20' : ''}`}>
      
      {/* Member + Spouse Couple Container */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/5 p-1.5 rounded-2xl border border-dashed border-[#d4af37]/30">
        
        {/* Main Member Card */}
        <div 
          onClick={() => setSelectedMemberForModal(member)}
          className={`w-48 sm:w-56 rounded-2xl p-3 border-2 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden ${
            isHighlighted 
              ? 'ring-4 ring-[#d4af37] bg-[#ffe885]/20 border-[#d4af37]' 
              : isDarkMode 
              ? 'bg-[#152a21] border-[#2d6a4f] hover:border-[#d4af37]' 
              : 'bg-white border-[#2d6a4f]/40 hover:border-[#1b4332]'
          }`}
        >
          {/* Generation Tag */}
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs ${getGenerationBadgeColor(member.generation)}`}>
              {getGenerationName(member.generation)}
            </span>
            {isDeceased ? (
              <span className="text-[9px] bg-gray-500 text-white px-1.5 py-0.5 rounded font-mono" title="Telah wafat">
                Alm.
              </span>
            ) : (
              <span className="text-[9px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Aktif
              </span>
            )}
          </div>

          {/* Photo + Name */}
          <div className="flex items-center gap-2.5">
            <div className="relative shrink-0">
              <img 
                src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
                alt={member.nama}
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#d4af37] shadow" 
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1b4332] text-white text-[9px] flex items-center justify-center font-bold">
                {member.jenis_kelamin}
              </span>
            </div>

            <div className="flex-1 min-w-0 text-left">
              <h4 className="font-heading font-bold text-xs sm:text-sm text-[#1b4332] dark:text-[#ffe885] truncate leading-tight">
                {member.nama_panggilan}
              </h4>
              <p className="text-[10px] text-gray-500 dark:text-emerald-200/80 line-clamp-2 leading-snug">
                {member.nama}
              </p>
              <p className="text-[9px] text-[#2d6a4f] dark:text-[#d4af37] font-semibold mt-0.5 truncate">
                {member.pekerjaan !== '-' ? member.pekerjaan : 'Anggota Keluarga'}
              </p>
            </div>
          </div>

          {/* Hover Action Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-[#1b4332] text-white text-[10px] py-1 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
            <Eye className="w-3 h-3 text-[#d4af37]" /> Klik untuk Lihat Profil
          </div>
        </div>

        {/* Spouse Connector & Card (if spouse exists) */}
        {spouse && (
          <>
            <div className="flex items-center justify-center -my-1 sm:my-0">
              <span className="w-6 h-6 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]" title="Pasangan / Suami-Istri">
                <Heart className="w-3 h-3 fill-[#d4af37]" />
              </span>
            </div>

            {/* Spouse Card */}
            <div 
              onClick={() => setSelectedMemberForModal(spouse)}
              className={`w-48 sm:w-56 rounded-2xl p-3 border-2 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden ${
                isDarkMode 
                  ? 'bg-[#152a21]/80 border-amber-500/40 hover:border-[#d4af37]' 
                  : 'bg-amber-50/60 border-amber-300 hover:border-[#d4af37]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Pasangan • {spouse.jenis_kelamin === 'L' ? 'Suami' : 'Istri'}
                </span>
                {spouse.tanggal_wafat ? (
                  <span className="text-[9px] bg-gray-500 text-white px-1 py-0.5 rounded font-mono">Alm.</span>
                ) : null}
              </div>

              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <img 
                    src={spouse.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
                    alt={spouse.nama}
                    className="w-11 h-11 rounded-xl object-cover border-2 border-amber-400 shadow" 
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-600 text-white text-[8px] flex items-center justify-center font-bold">
                    {spouse.jenis_kelamin}
                  </span>
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <h4 className="font-heading font-bold text-xs text-amber-900 dark:text-amber-200 truncate leading-tight">
                    {spouse.nama_panggilan}
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-emerald-200/70 truncate">
                    {spouse.nama}
                  </p>
                  <p className="text-[9px] text-amber-700 dark:text-amber-300 truncate mt-0.5">
                    {spouse.pekerjaan !== '-' ? spouse.pekerjaan : 'Anggota Keluarga'}
                  </p>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-amber-800 text-white text-[10px] py-1 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                <Eye className="w-3 h-3 text-[#ffe885]" /> Profil Pasangan
              </div>
            </div>
          </>
        )}

      </div>

      {/* Quick Add Child Button */}
      {member.generation < 4 && (
        <div className="mt-1.5 flex items-center justify-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openAddMemberModal({ defaultParentId: member.id, defaultGeneration: (member.generation + 1) as GenerationNumber });
            }}
            className="text-[10px] bg-emerald-700/90 hover:bg-[#1b4332] text-white px-2.5 py-0.5 rounded-full font-bold shadow flex items-center gap-1 transition-all border border-[#d4af37]/60 hover:scale-105"
            title={`Tambah anak untuk ${member.nama_panggilan}`}
          >
            <span>+ Tambah {member.generation === 1 ? 'Anak (Gen 2)' : member.generation === 2 ? 'Cucu (Gen 3)' : 'Cicit (Gen 4)'}</span>
          </button>
        </div>
      )}

      {/* Expand / Collapse Children Button (if has children) */}
      {childrenMembers.length > 0 && (
        <div className="mt-2 z-10">
          <button
            onClick={() => onToggleExpand(member.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow transition-all ${
              isExpanded 
                ? 'bg-[#1b4332] text-[#ffe885] border border-[#d4af37]' 
                : 'bg-[#d4af37] text-[#1b4332] hover:bg-[#ffe885]'
            }`}
            title={isExpanded ? 'Sembunyikan keturunan' : 'Tampilkan keturunan'}
          >
            <span>{childrenMembers.length} {member.generation === 1 ? 'Anak' : member.generation === 2 ? 'Cucu' : 'Cicit'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

    </div>
  );
};

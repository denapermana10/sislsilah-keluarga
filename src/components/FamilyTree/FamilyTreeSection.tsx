import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { TreeNode } from './TreeNode';
import { 
  Trees, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Filter, 
  Search, 
  Printer, 
  Download, 
  Sparkles, 
  Users,
  Layers,
  CheckCircle,
  HelpCircle,
  UserPlus
} from 'lucide-react';
import { FamilyMember, GenerationNumber } from '../../types';

export const FamilyTreeSection: React.FC = () => {
  const { 
    members, 
    searchQuery, 
    setSearchQuery, 
    selectedGenerationFilter, 
    setSelectedGenerationFilter,
    selectedBranchFilter,
    setSelectedBranchFilter,
    isDarkMode,
    setActiveTab,
    openAddMemberModal
  } = useFamily();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'gen1-1': true, // Abah Odang expanded by default
    'gen2-1': true, // Kang Asep expanded by default
    'gen2-2': true, // Ceu Siti expanded
    'gen2-3': true,
    'gen2-4': true,
    'gen3-1': true, // Rizky expanded
    'gen3-3': true
  });
  const [exportMode, setExportMode] = useState<string>('A4');
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const handleToggleExpand = (memberId: string) => {
    setExpandedNodes(prev => ({ ...prev, [memberId]: !prev[memberId] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    members.forEach(m => { all[m.id] = true; });
    setExpandedNodes(all);
  };

  const collapseAll = () => {
    setExpandedNodes({ 'gen1-1': false });
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.15, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  // Helper to get spouse
  const getSpouse = (member: FamilyMember) => {
    return members.find(m => m.spouse_id === member.id || member.spouse_id === m.id);
  };

  // Helper to get direct children
  const getChildren = (parentId: string) => {
    return members.filter(m => m.parent_id === parentId).sort((a, b) => a.id.localeCompare(b.id));
  };

  // Filter logic: if there is a generation filter or branch filter or search query, let's see which nodes should be highlighted
  const isMemberHighlighted = (m: FamilyMember) => {
    if (!searchQuery) return false;
    const q = searchQuery.toLowerCase();
    return m.nama.toLowerCase().includes(q) || 
           m.nama_panggilan.toLowerCase().includes(q) || 
           m.alamat.toLowerCase().includes(q) || 
           m.pekerjaan.toLowerCase().includes(q);
  };

  // Root member (Abah Odang)
  const rootMember = members.find(m => m.generation === 1 && m.jenis_kelamin === 'L') || members[0];

  // Branches list
  const branches = [
    'ALL',
    'Cabang 1: H. Asep Saepudin',
    'Cabang 2: Hj. Siti Nurhaliza',
    'Cabang 3: Drs. H. Dedi Mulyadi',
    'Cabang 4: Ir. Rini Wulandari'
  ];

  const handlePrintOrExport = (format: string) => {
    alert(`⚡ Simulasi Ekspor Pohon Silsilah ke format [${format}] berhasil dipersiapkan! File siap dicetak atau diunduh dengan resolusi tinggi (300 DPI).`);
    setShowExportModal(false);
  };

  return (
    <div id="silsilah-section" className={`py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#0e1c16] text-emerald-100' : 'bg-[#fcfbf7] text-[#1a2e26]'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#d4af37]/40 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] dark:text-[#ffe885] border border-[#2d6a4f]/20 font-semibold text-xs uppercase tracking-wider">
              <Trees className="w-3.5 h-3.5" /> Pohon Silsilah Interaktif
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Silsilah 4 Turunan <span className="text-[#2d6a4f] dark:text-[#d4af37]">Abah Odang & Enin Ucah</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-200/80 max-w-2xl font-serif-islamic italic">
              Klik pada kartu anggota untuk melihat profil lengkap, nomor WhatsApp, alamat, dan keturunan. Gunakan zoom atau geser untuk melihat keseluruhan pohon keluarga.
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={expandAll}
              className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" /> Buka Semua (Expand)
            </button>
            <button
              onClick={collapseAll}
              className="bg-white/10 hover:bg-white/20 text-gray-700 dark:text-emerald-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border border-gray-300 dark:border-emerald-700"
            >
              <Minimize2 className="w-3.5 h-3.5" /> Tutup Semua
            </button>
            <button
              onClick={() => openAddMemberModal()}
              className="bg-[#1b4332] hover:bg-[#2d6a4f] text-[#ffe885] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg border border-[#d4af37]/60 hover:scale-105 transition-all"
            >
              <UserPlus className="w-4 h-4 text-[#d4af37]" /> Tambah Anggota / Upload Foto
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="bg-gradient-to-r from-[#d4af37] to-[#f0a500] hover:from-[#ffe885] hover:to-[#d4af37] text-[#1b4332] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow transition-all"
            >
              <Printer className="w-4 h-4" /> Cetak / Ekspor Pohon
            </button>
          </div>
        </div>

        {/* Toolbar Controls (Search, Filters, Zoom) */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-[#152a21] border-[#2d6a4f]/50' : 'bg-white border-[#d4af37]/40 shadow-md'
        } flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4`}>
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-emerald-300" />
            <input
              type="text"
              placeholder="Cari nama, kota, pekerjaan dalam pohon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#0e1c16] text-gray-800 dark:text-white text-xs rounded-xl pl-10 pr-4 py-2.5 border border-gray-300 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            {searchQuery && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-[#d4af37] text-[#1b4332] px-2 py-0.5 rounded-full font-bold">
                {members.filter(isMemberHighlighted).length} Ditemukan
              </span>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Generation Filter */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#0e1c16] p-1 rounded-xl border border-gray-200 dark:border-emerald-800">
              <span className="text-[10px] font-bold px-2 text-gray-500 uppercase">Gen:</span>
              {(['ALL', 1, 2, 3, 4] as const).map(gen => (
                <button
                  key={gen}
                  onClick={() => setSelectedGenerationFilter(gen)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedGenerationFilter === gen 
                      ? 'bg-[#1b4332] text-[#ffe885] shadow-sm font-bold' 
                      : 'text-gray-600 dark:text-emerald-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {gen === 'ALL' ? 'Semua' : `Gen ${gen}`}
                </button>
              ))}
            </div>

            {/* Branch Filter */}
            <select
              value={selectedBranchFilter}
              onChange={(e) => setSelectedBranchFilter(e.target.value)}
              className="bg-gray-100 dark:bg-[#0e1c16] text-gray-800 dark:text-white text-xs rounded-xl px-3 py-2 border border-gray-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            >
              <option value="ALL">🌿 Semua Cabang Keluarga</option>
              {branches.slice(1).map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Zoom Buttons */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#0e1c16] p-1 rounded-xl border border-gray-200 dark:border-emerald-800">
              <button 
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-white dark:hover:bg-[#1b4332] rounded-lg transition-colors text-gray-700 dark:text-emerald-200"
                title="Perkecil Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={handleResetZoom}
                className="px-2 py-1 hover:bg-white dark:hover:bg-[#1b4332] rounded-lg transition-colors text-xs font-mono font-bold text-[#1b4332] dark:text-[#ffe885]"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button 
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-white dark:hover:bg-[#1b4332] rounded-lg transition-colors text-gray-700 dark:text-emerald-200"
                title="Perbesar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Tree Interactive Canvas Area */}
        <div className={`relative min-h-[600px] overflow-auto p-8 rounded-3xl border-2 border-dashed ${
          isDarkMode ? 'bg-[#08120d] border-emerald-900/60' : 'bg-[#f8f7f2] border-[#d4af37]/60 shadow-inner'
        }`}>
          
          {/* Zoom & Pan Wrapper */}
          <div 
            style={{ 
              transform: `scale(${zoomLevel})`, 
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out'
            }}
            className="flex flex-col items-center min-w-max pb-16"
          >
            
            {/* Root Member & Spouse (Generation 1) */}
            {rootMember && (
              <div className="flex flex-col items-center">
                <TreeNode
                  member={rootMember}
                  spouse={getSpouse(rootMember)}
                  childrenMembers={getChildren(rootMember.id)}
                  isExpanded={expandedNodes[rootMember.id] ?? true}
                  onToggleExpand={handleToggleExpand}
                  isHighlighted={isMemberHighlighted(rootMember) || (getSpouse(rootMember) ? isMemberHighlighted(getSpouse(rootMember)!) : false)}
                />

                {/* Vertical Line Connector from Root */}
                {(expandedNodes[rootMember.id] ?? true) && getChildren(rootMember.id).length > 0 && (
                  <div className="w-1 h-8 bg-gradient-to-b from-[#d4af37] to-[#2d6a4f] my-1" />
                )}

                {/* GENERATION 2: ANAK (4 Putra-Putri) */}
                {(expandedNodes[rootMember.id] ?? true) && (
                  <div className="relative flex flex-col sm:flex-row items-start justify-center gap-8 sm:gap-16 pt-4 border-t-2 border-[#2d6a4f]/40 px-6">
                    {getChildren(rootMember.id)
                      .filter(child => selectedBranchFilter === 'ALL' || child.branch === selectedBranchFilter || selectedBranchFilter.includes(child.nama_panggilan.split(' ')[0]))
                      .map((child, idx, arr) => {
                        const childSpouse = getSpouse(child);
                        const grandChildren = getChildren(child.id);
                        const isChildExpanded = expandedNodes[child.id] ?? true;

                        return (
                          <div key={child.id} className="flex flex-col items-center relative">
                            {/* Vertical drop connector to Gen 2 */}
                            <div className="absolute -top-4 w-0.5 h-4 bg-[#2d6a4f]" />

                            <TreeNode
                              member={child}
                              spouse={childSpouse}
                              childrenMembers={grandChildren}
                              isExpanded={isChildExpanded}
                              onToggleExpand={handleToggleExpand}
                              isHighlighted={isMemberHighlighted(child) || (childSpouse ? isMemberHighlighted(childSpouse) : false)}
                            />

                            {/* Vertical line to Gen 3 */}
                            {isChildExpanded && grandChildren.length > 0 && (
                              <div className="w-0.5 h-6 bg-[#2d6a4f] my-1" />
                            )}

                            {/* GENERATION 3: CUCU */}
                            {isChildExpanded && grandChildren.length > 0 && (
                              <div className="relative flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-10 pt-4 border-t-2 border-emerald-600/40 px-4">
                                {grandChildren.map((gChild) => {
                                  const gSpouse = getSpouse(gChild);
                                  const greatGrandChildren = getChildren(gChild.id);
                                  const isGChildExpanded = expandedNodes[gChild.id] ?? true;

                                  return (
                                    <div key={gChild.id} className="flex flex-col items-center relative">
                                      <div className="absolute -top-4 w-0.5 h-4 bg-emerald-600" />

                                      <TreeNode
                                        member={gChild}
                                        spouse={gSpouse}
                                        childrenMembers={greatGrandChildren}
                                        isExpanded={isGChildExpanded}
                                        onToggleExpand={handleToggleExpand}
                                        isHighlighted={isMemberHighlighted(gChild) || (gSpouse ? isMemberHighlighted(gSpouse) : false)}
                                      />

                                      {/* Vertical line to Gen 4 */}
                                      {isGChildExpanded && greatGrandChildren.length > 0 && (
                                        <div className="w-0.5 h-6 bg-emerald-700 my-1" />
                                      )}

                                      {/* GENERATION 4: CICIT */}
                                      {isGChildExpanded && greatGrandChildren.length > 0 && (
                                        <div className="relative flex flex-col sm:flex-row items-start justify-center gap-4 pt-4 border-t border-emerald-700/40 px-2">
                                          {greatGrandChildren.map((ggChild) => (
                                            <div key={ggChild.id} className="flex flex-col items-center relative">
                                              <div className="absolute -top-4 w-0.5 h-4 bg-emerald-700" />

                                              <TreeNode
                                                member={ggChild}
                                                childrenMembers={[]}
                                                isExpanded={false}
                                                onToggleExpand={() => {}}
                                                isHighlighted={isMemberHighlighted(ggChild)}
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                    </div>
                                  );
                                })}
                              </div>
                            )}

                          </div>
                        );
                      })}
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Canvas helper hint */}
          <div className="absolute bottom-4 left-4 bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Tips: Gunakan zoom untuk melihat cicit dengan jelas. Klik kartu untuk melihat kontak WhatsApp & Alamat.</span>
          </div>

        </div>

      </div>

      {/* Export & Print Simulation Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className={`max-w-md w-full rounded-3xl p-6 shadow-2xl border-2 border-[#d4af37] ${isDarkMode ? 'bg-[#122c21] text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2 text-[#1b4332] dark:text-[#ffe885]">
                <Printer className="w-5 h-5 text-[#d4af37]" />
                Ekspor / Cetak Pohon Silsilah
              </h3>
              <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <p className="text-xs text-gray-600 dark:text-emerald-200 mb-6">
              Pilih ukuran cetak dan format unduhan sesuai spesifikasi pada PRD Bagian 19 (Export PDF, Excel, PNG, A4, A3, hingga Banner):
            </p>

            <div className="space-y-3 mb-6">
              <label 
                onClick={() => setExportMode('A4')}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  exportMode === 'A4' ? 'bg-[#1b4332] text-white border-[#d4af37] font-bold' : 'border-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <span>📄 Cetak Ukuran A4 (Standar Dokumen)</span>
                {exportMode === 'A4' && <CheckCircle className="w-4 h-4 text-[#ffe885]" />}
              </label>

              <label 
                onClick={() => setExportMode('A3')}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  exportMode === 'A3' ? 'bg-[#1b4332] text-white border-[#d4af37] font-bold' : 'border-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <span>📜 Cetak Ukuran A3 (Bagan Poster)</span>
                {exportMode === 'A3' && <CheckCircle className="w-4 h-4 text-[#ffe885]" />}
              </label>

              <label 
                onClick={() => setExportMode('Banner')}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  exportMode === 'Banner' ? 'bg-[#1b4332] text-white border-[#d4af37] font-bold' : 'border-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <span>🏁 Cetak Ukuran Spanduk / Banner Reuni (High-Res 300 DPI)</span>
                {exportMode === 'Banner' && <CheckCircle className="w-4 h-4 text-[#ffe885]" />}
              </label>

              <label 
                onClick={() => setExportMode('PNG')}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  exportMode === 'PNG' ? 'bg-[#1b4332] text-white border-[#d4af37] font-bold' : 'border-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <span>🖼️ Unduh Gambar PNG Pohon Keluarga Lengkap</span>
                {exportMode === 'PNG' && <CheckCircle className="w-4 h-4 text-[#ffe885]" />}
              </label>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowExportModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 font-semibold text-xs text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>
              <button 
                onClick={() => handlePrintOrExport(exportMode)}
                className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f0a500] hover:from-[#ffe885] hover:to-[#d4af37] text-[#1b4332] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Download className="w-4 h-4" /> Mulai Ekspor / Cetak
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

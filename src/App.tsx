/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { FamilyProvider, useFamily } from './context/FamilyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AboutFamily } from './components/AboutFamily';
import { FamilyTreeSection } from './components/FamilyTree/FamilyTreeSection';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { StoriesSection } from './components/StoriesSection';
import { MemberDirectory } from './components/MemberDirectory';
import { GuestbookSection } from './components/GuestbookSection';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { MemberProfileModal } from './components/MemberProfileModal';
import { BirthdayReminderWidget } from './components/BirthdayReminderWidget';
import { AddMemberModal } from './components/AddMemberModal';

const MainContent: React.FC = () => {
  const { activeTab, isDarkMode } = useFamily();

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0e1c16] text-emerald-100' : 'bg-[#fcfbf7] text-[#1a2e26]'
    }`}>
      {/* Top Navbar with Role Switcher & Dark Mode Toggle */}
      <Navbar />

      {/* Dynamic Content Based on Active Navigation Tab */}
      <main className="flex-grow pt-20">
        {activeTab === 'beranda' && (
          <div className="space-y-4">
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
              <BirthdayReminderWidget compact={true} />
            </div>
            <AboutFamily />
            <FamilyTreeSection />
            <TimelineSection />
            <GallerySection />
            <StoriesSection />
            <GuestbookSection />
          </div>
        )}

        {activeTab === 'silsilah' && <FamilyTreeSection />}
        {activeTab === 'tentang' && <AboutFamily />}
        {activeTab === 'galeri' && <GallerySection />}
        {activeTab === 'cerita' && <StoriesSection />}
        {activeTab === 'timeline' && <TimelineSection />}
        {activeTab === 'direktori' && <MemberDirectory />}
        {activeTab === 'tamu' && <GuestbookSection />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Member Detail & WhatsApp Modal */}
      <MemberProfileModal />
      <AddMemberModal />

      {/* Footer with Islamic Warmth & Contact Info */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <FamilyProvider>
      <MainContent />
    </FamilyProvider>
  );
}


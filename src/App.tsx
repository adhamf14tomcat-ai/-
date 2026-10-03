/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TimeBankProvider, useTimeBank } from './context/TimeBankContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { BrowseSkillsView } from './components/BrowseSkillsView';
import { ProfileView } from './components/ProfileView';
import { LeaderboardView } from './components/LeaderboardView';
import { LiveSessionView } from './components/LiveSessionView';
import { BookingModal } from './components/BookingModal';
import { AddSkillModal } from './components/AddSkillModal';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    currentView, 
    selectedTeacherForBooking, 
    closeBooking, 
    notification, 
    clearNotification 
  } = useTimeBank();

  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#242E24] selection:bg-[#E8C5A5] selection:text-[#1B291D]">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-bounce-short">
          <div
            className={`p-4 rounded-2xl shadow-lg border flex items-start justify-between gap-3 text-xs font-semibold ${
              notification.type === 'success'
                ? 'bg-[#354C30] text-white border-[#2B3E27]'
                : notification.type === 'warning'
                ? 'bg-[#E06D28] text-white border-[#C95717]'
                : 'bg-white text-[#243321] border-[#DDD5C7]'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 text-[#E8BFA0]" />}
              {notification.type === 'warning' && <AlertCircle className="w-5 h-5 shrink-0 text-white" />}
              {notification.type === 'info' && <Info className="w-5 h-5 shrink-0 text-[#354C30]" />}
              <span className="leading-snug pt-0.5">{notification.message}</span>
            </div>
            <button
              onClick={clearNotification}
              className="p-1 opacity-80 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar onOpenAddSkill={() => setIsAddSkillOpen(true)} />

      {/* Main Page View Switching */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView onOpenAddSkill={() => setIsAddSkillOpen(true)} />
        )}

        {currentView === 'skills' && (
          <BrowseSkillsView />
        )}

        {(currentView === 'profile' || currentView === 'sessions') && (
          <ProfileView onOpenAddSkill={() => setIsAddSkillOpen(true)} />
        )}

        {currentView === 'leaderboard' && (
          <LeaderboardView />
        )}

        {currentView === 'live-session' && (
          <LiveSessionView />
        )}
      </main>

      {/* Booking Modal */}
      {selectedTeacherForBooking && (
        <BookingModal
          teacher={selectedTeacherForBooking}
          onClose={closeBooking}
        />
      )}

      {/* Add Skill Modal */}
      {isAddSkillOpen && (
        <AddSkillModal
          onClose={() => setIsAddSkillOpen(false)}
        />
      )}

      {/* Quiet Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <TimeBankProvider>
      <AppContent />
    </TimeBankProvider>
  );
}

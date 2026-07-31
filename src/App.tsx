/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StartupsView from './components/views/StartupsView';
import InvestorsView from './components/views/InvestorsView';
import TalentsView from './components/views/TalentsView';
import ProfileDetailView from './components/views/ProfileDetailView';
import UpdatePopup from './components/UpdatePopup';
import { ViewState, TeamMember, Talent } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('startups');
  const [selectedProfile, setSelectedProfile] = useState<TeamMember | Talent | null>(null);

  const renderView = () => {
    switch (currentView) {
      case 'startups':
        return <StartupsView onProfileClick={setSelectedProfile} />;
      case 'investors':
        return <InvestorsView />;
      case 'talents':
        return <TalentsView />;
      default:
        return <StartupsView onProfileClick={setSelectedProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] flex pb-16 sm:pb-0">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col w-full min-w-0 relative">
        <Navbar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 w-full relative">
          <div style={{ display: selectedProfile ? 'none' : 'block', height: '100%' }}>
            {renderView()}
          </div>
          {selectedProfile && (
            <ProfileDetailView profile={selectedProfile} onBack={() => setSelectedProfile(null)} />
          )}
        </main>
      </div>
      <UpdatePopup />
    </div>
  );
}


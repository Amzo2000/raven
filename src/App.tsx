/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import StartupsView from './components/views/StartupsView';
import InvestorsView from './components/views/InvestorsView';
import TalentsView from './components/views/TalentsView';
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
      case 'startups':
        return <StartupsView />;
      case 'investors':
        return <InvestorsView />;
      case 'talents':
        return <TalentsView />;
      default:
        return <StartupsView />;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16 sm:pb-0">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      <main className="w-full">
        {renderView()}
      </main>
    </div>
  );
}

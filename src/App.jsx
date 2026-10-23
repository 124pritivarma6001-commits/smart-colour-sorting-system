import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatusBanner from './components/StatusBanner';
import OverviewCards from './components/OverviewCards';
import LiveColourPanel from './components/LiveColourPanel';
import ColourChart from './components/ColourChart';
import SortingHistory from './components/SortingHistory';
import TechnicalDetailsSection from './components/TechnicalDetailsSection';
import HardwareControls from './components/HardwareControls';
import HardwareSpecsModal from './components/HardwareSpecsModal';
import { SortingService } from './services/sortingService';

export default function App() {
  const [systemState, setSystemState] = useState(SortingService.getSystemState());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = SortingService.subscribe((data) => {
      setSystemState(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        systemState={systemState}
        onOpenHardwareModal={() => setIsSpecsModalOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex w-full">
        {/* Clean Light Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          onOpenSpecs={() => setIsSpecsModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
          
          {/* Status Banner */}
          <StatusBanner
            systemState={systemState}
            onOpenSpecs={() => setIsSpecsModalOpen(true)}
          />

          {/* Section 1: Overview Cards */}
          <section id="overview" className="scroll-mt-24">
            <OverviewCards stats={systemState.stats} />
          </section>

          {/* Section 2: Live Monitoring (Colour & Servo Angle) */}
          <section id="live-detection" className="scroll-mt-24">
            <LiveColourPanel
              detection={systemState.latestDetection}
              onOpenTechnical={() => handleSelectSection('technical')}
              source={systemState.source}
            />
          </section>

          {/* Section 3: Colour Distribution Chart */}
          <section id="analytics" className="scroll-mt-24">
            <ColourChart stats={systemState.stats} />
          </section>

          {/* Section 4: Recent Sorting History Table */}
          <section id="history" className="scroll-mt-24">
            <SortingHistory
              history={systemState.sortingHistory}
              loading={systemState.loading}
              source={systemState.source}
            />
          </section>

          {/* Section 5: Collapsible Technical Details (Frequencies, Pinout, Logic) */}
          <TechnicalDetailsSection detection={systemState.latestDetection} />

          {/* Section 6: Actuator Controls (Safely Disabled) */}
          <section id="controls" className="scroll-mt-24">
            <HardwareControls onOpenSpecs={() => setIsSpecsModalOpen(true)} />
          </section>

          {/* Footer */}
          <footer className="pt-8 pb-6 border-t border-slate-200/80 text-center text-xs text-slate-500 space-y-1">
            <p className="font-medium text-slate-700">
              AI Colour Sorting System • IoT Industrial Dashboard
            </p>
            <p className="font-mono text-slate-400">
              TCS3200 Optical Sensor • SG90 Servo Actuator (0° Red / 60° Green / 120° Blue) • Supabase Realtime
            </p>
          </footer>
        </main>
      </div>

      {/* Hardware Specs & Wiring Guide Modal */}
      <HardwareSpecsModal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
      />
    </div>
  );
}

import React from 'react';
import { Cpu, Clock, Menu, Code2, Database } from 'lucide-react';

export default function Header({ systemState, onOpenHardwareModal, onToggleSidebar }) {
  const isConnected = systemState.isHardwareConnected;
  const isSupabase = systemState.source === 'SUPABASE';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 shadow-sm">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        {/* Left: Mobile hamburger & Project Title */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-sm">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Smart Colour Sorting System
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 font-mono">
                  ESP32
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                TCS3200 Optical Sensor & Servo Motor Control
              </p>
            </div>
          </div>
        </div>

        {/* Right: Hardware Status & Last Update */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Connection Status Pill */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
              isConnected
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                : 'bg-amber-50 text-amber-800 border-amber-200/80'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'
              }`}
            />
            <span className="font-semibold">Hardware:</span>
            <span>{isConnected ? 'Online' : 'Awaiting Connection'}</span>
            <span
              className={`hidden md:inline px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${
                isSupabase
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {systemState.loading ? 'Syncing...' : isSupabase ? 'Supabase Live' : 'Demo Data'}
            </span>
          </div>

          {/* Last Update */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Last Sync: {systemState.lastUpdateTime}</span>
          </div>

          {/* Technical Specs & Pinout button */}
          <button
            onClick={onOpenHardwareModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium transition shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Wiring & Schema</span>
          </button>
        </div>
      </div>
    </header>
  );
}

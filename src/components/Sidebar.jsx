import React from 'react';
import {
  LayoutDashboard,
  Eye,
  PieChart,
  History,
  SlidersHorizontal,
  Cpu,
  X,
  Code2
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, activeSection, onSelectSection, onOpenSpecs }) {
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'live-detection', label: 'Live Detection & Servo', icon: Eye },
    { id: 'analytics', label: 'Colour Distribution', icon: PieChart },
    { id: 'history', label: 'Sorting History', icon: History },
    { id: 'technical', label: 'Technical Details', icon: Code2 },
    { id: 'controls', label: 'Actuator Controls', icon: SlidersHorizontal },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Light Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[65px] left-0 h-full lg:h-[calc(100vh-65px)] w-64 bg-white border-r border-slate-200/80 z-50 transition-transform duration-200 ease-in-out flex flex-col justify-between overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Mobile Top Close */}
          <div className="flex items-center justify-between lg:hidden pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-slate-900">ESP32 Sorter</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectSection(item.id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Servo Bin Routing Card - Clean & Minimal */}
          <div className="pt-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Sorting Angles
            </p>
            <div className="bg-slate-50 rounded-xl p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="text-slate-700 font-medium">Red Bin</span>
                </div>
                <span className="font-mono text-red-700 font-bold bg-white px-2 py-0.5 rounded shadow-xs">
                  0°
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-700 font-medium">Green Bin</span>
                </div>
                <span className="font-mono text-emerald-700 font-bold bg-white px-2 py-0.5 rounded shadow-xs">
                  60°
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="text-slate-700 font-medium">Blue Bin</span>
                </div>
                <span className="font-mono text-blue-700 font-bold bg-white px-2 py-0.5 rounded shadow-xs">
                  120°
                </span>
              </div>
            </div>
          </div>

          {/* Hardware Specs Card */}
          <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-xs">
            <p className="font-semibold text-slate-800">Hardware Profile</p>
            <div className="space-y-1 text-slate-600 font-mono text-[11px]">
              <div>• MCU: ESP32 DevKit V1</div>
              <div>• Sensor: TCS3200 Optical</div>
              <div>• Actuator: SG90 Servo</div>
            </div>
            <button
              onClick={onOpenSpecs}
              className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View wiring diagram →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 text-xs text-slate-400">
          <p className="font-medium text-slate-700">AI Colour Sorting System</p>
          <p className="text-[11px] mt-0.5 text-slate-500">IoT Industrial Dashboard</p>
        </div>
      </aside>
    </>
  );
}

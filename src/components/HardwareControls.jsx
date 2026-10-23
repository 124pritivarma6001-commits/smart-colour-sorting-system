import React from 'react';
import {
  Play,
  Square,
  RotateCcw,
  Sliders,
  Lock,
  Compass,
  AlertCircle
} from 'lucide-react';

export default function HardwareControls({ onOpenSpecs }) {
  return (
    <div id="controls" className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/60 shadow-sm scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Hardware Actuator Controls
              <span className="flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                <Lock className="w-3 h-3" />
                Locked (Awaiting ESP32)
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Direct ESP32 conveyor, feeder and counter commands
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSpecs}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          View integration guide →
        </button>
      </div>

      {/* Control Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        
        {/* Start Button */}
        <div className="relative group">
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 text-slate-400 border border-slate-200/70 cursor-not-allowed font-medium text-xs sm:text-sm"
          >
            <Play className="w-4 h-4 text-slate-400" />
            <span>Start Sorting Run</span>
            <Lock className="w-3.5 h-3.5 ml-auto text-slate-400" />
          </button>
          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-900 text-[11px] text-white rounded-lg shadow-lg text-center z-20">
            Disabled: Requires real-time ESP32 hardware connection.
          </div>
        </div>

        {/* Stop Button */}
        <div className="relative group">
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 text-slate-400 border border-slate-200/70 cursor-not-allowed font-medium text-xs sm:text-sm"
          >
            <Square className="w-4 h-4 text-slate-400" />
            <span>Pause / Stop Feeder</span>
            <Lock className="w-3.5 h-3.5 ml-auto text-slate-400" />
          </button>
          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-900 text-[11px] text-white rounded-lg shadow-lg text-center z-20">
            Disabled: Requires real-time ESP32 hardware connection.
          </div>
        </div>

        {/* Reset Counter Button */}
        <div className="relative group">
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 text-slate-400 border border-slate-200/70 cursor-not-allowed font-medium text-xs sm:text-sm"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Reset Counters</span>
            <Lock className="w-3.5 h-3.5 ml-auto text-slate-400" />
          </button>
          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-900 text-[11px] text-white rounded-lg shadow-lg text-center z-20">
            Disabled: Protected against accidental counter resets in demo mode.
          </div>
        </div>

        {/* Servo Calibrate Button */}
        <div className="relative group">
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 text-slate-400 border border-slate-200/70 cursor-not-allowed font-medium text-xs sm:text-sm"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Calibrate Servo</span>
            <Lock className="w-3.5 h-3.5 ml-auto text-slate-400" />
          </button>
          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-900 text-[11px] text-white rounded-lg shadow-lg text-center z-20">
            Disabled: Servo motor angle calibration requires active GPIO 13 PWM link.
          </div>
        </div>

      </div>

      {/* Safety Notice Footer */}
      <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2.5 text-xs text-slate-600">
        <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span>
          Safety Interlock: Microcontroller actuation signals remain inhibited until an authenticated Firebase handshake is established.
        </span>
      </div>
    </div>
  );
}

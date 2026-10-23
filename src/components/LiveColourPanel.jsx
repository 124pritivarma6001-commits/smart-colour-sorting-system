import React from 'react';
import { Eye, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LiveColourPanel({ detection, onOpenTechnical, source = 'DEMO' }) {
  const color = detection?.color || 'Awaiting Object';
  const hex = detection?.hex || '#94a3b8';
  const servoAngle = detection?.servoAngle ?? 90;
  const timestamp = detection?.timestamp || 'No recent telemetry';
  const confidence = detection?.confidence ?? 0;
  const binAssigned = detection?.binAssigned || 'Awaiting assignment';

  const isSupabase = source === 'SUPABASE';

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/60 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Live Monitoring: Detected Colour & Servo Angle
            </h2>
            <p className="text-xs text-slate-500">
              Real-time classification from TCS3200 colour sensor and SG90 servo position
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
            isSupabase ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-700'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isSupabase ? 'bg-blue-600' : 'bg-slate-500'}`}></span>
            {isSupabase ? 'Supabase Realtime' : 'Demo Telemetry'}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {timestamp}
          </span>
        </div>
      </div>

      {/* Main Clean Monitoring Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
        
        {/* Left: Detected Colour Card */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Latest Detected Object
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confidence: {confidence}%
              </span>
            </div>

            <div className="flex items-center gap-5 my-2">
              {/* Colour Disc */}
              <div
                className="w-20 h-20 rounded-2xl shadow-sm border-2 border-white flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105"
                style={{ backgroundColor: hex }}
              >
                <div className="w-6 h-6 rounded-full bg-white/40 backdrop-blur-xs shadow-xs" />
              </div>

              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {color}
                </div>
                <div className="text-xs font-mono text-slate-500 mt-1">
                  Hex Code: <span className="text-slate-800 font-semibold">{hex}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Routed to: <span className="font-semibold text-slate-900">{binAssigned}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
            <span>TCS3200 Optical Sensor</span>
            <button
              onClick={onOpenTechnical}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Frequency readings →
            </button>
          </div>
        </div>

        {/* Right: Servo Motor Actuator Angle Position */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-slate-600" />
                Servo Flap Position
              </span>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                SG90 PWM
              </span>
            </div>

            {/* Visual Gauge */}
            <div className="py-2 flex flex-col items-center justify-center">
              <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
                {/* Arc Track */}
                <div className="w-44 h-44 rounded-full border-[6px] border-slate-200 border-t-emerald-500 border-l-red-500 border-r-blue-500 border-b-transparent absolute top-0" />
                
                {/* Needle Indicator */}
                <div
                  className="origin-bottom w-1.5 h-16 bg-slate-800 rounded-t-full shadow-md transition-transform duration-700 z-10"
                  style={{
                    transform: `rotate(${servoAngle - 90}deg)`
                  }}
                />
                <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow absolute bottom-0 z-20" />
              </div>

              <div className="text-center mt-3">
                <div className="text-3xl font-extrabold font-mono text-slate-900">
                  {servoAngle}°
                </div>
                <div className="text-xs font-medium text-emerald-700 mt-0.5">
                  {servoAngle === 0 ? 'Aligned with Bin 1 (Red)' : servoAngle === 60 ? 'Aligned with Bin 2 (Green)' : servoAngle === 120 ? 'Aligned with Bin 3 (Blue)' : 'Neutral / Center Position'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Angle legend */}
          <div className="mt-5 pt-3.5 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className={`py-1 px-1.5 rounded-lg ${servoAngle === 0 ? 'bg-red-100 text-red-800 font-bold' : 'text-slate-500'}`}>
              0°: Red
            </div>
            <div className={`py-1 px-1.5 rounded-lg ${servoAngle === 60 ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-500'}`}>
              60°: Green
            </div>
            <div className={`py-1 px-1.5 rounded-lg ${servoAngle === 120 ? 'bg-blue-100 text-blue-800 font-bold' : 'text-slate-500'}`}>
              120°: Blue
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

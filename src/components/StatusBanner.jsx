import React from 'react';
import { Info, ArrowRight, CheckCircle2, AlertTriangle, Database } from 'lucide-react';

export default function StatusBanner({ systemState, onOpenSpecs }) {
  const isSupabase = systemState?.source === 'SUPABASE';
  const isConnected = systemState?.isHardwareConnected;
  const error = systemState?.error;
  const loading = systemState?.loading;

  // Case 1: Error during Supabase query (e.g. RLS blocked or table missing)
  if (isSupabase && error) {
    return (
      <div className="bg-red-50 border border-red-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-red-100 text-red-800 flex-shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-900 text-sm">
                  Supabase Query Notice
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-red-100 text-red-900">
                  RLS / TABLE CHECK
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {error}. If Row Level Security (RLS) is active, ensure a <code className="bg-white px-1 py-0.5 rounded border border-red-200 font-mono text-red-700">SELECT</code> policy is granted to role <code className="bg-white px-1 py-0.5 rounded border border-red-200 font-mono text-red-700">anon</code> for <code className="font-mono">public.sorting_history</code> and <code className="font-mono">public.device_status</code>.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSpecs}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-red-200 text-xs font-medium transition shadow-xs"
          >
            <span>View RLS Policy SQL</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    );
  }

  // Case 2: Supabase is active and connected
  if (isSupabase) {
    return (
      <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700 flex-shrink-0 mt-0.5 sm:mt-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-900 text-sm">
                  Supabase Realtime Synchronized
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 text-blue-800">
                  {loading ? 'FETCHING...' : 'LIVE SUPABASE DATA'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Connected to tables <code className="font-mono font-semibold text-slate-800">public.sorting_history</code> and <code className="font-mono font-semibold text-slate-800">public.device_status</code>. Hardware controls remain safely locked until the microcontroller publishes an online heartbeat.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-mono font-semibold text-blue-700 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-xs">
              {isConnected ? 'ESP32 Online' : 'Awaiting ESP32 Ping'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Supabase credentials not yet provided in .env (Demo Mode)
  return (
    <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5 sm:mt-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-900 text-sm">
                Supabase Environment Variables Awaiting Setup
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900">
                SAMPLE DATA DEMO
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Add your <code className="font-mono font-semibold text-slate-800">VITE_SUPABASE_URL</code> and <code className="font-mono font-semibold text-slate-800">VITE_SUPABASE_PUBLISHABLE_KEY</code> to the <code className="font-mono font-semibold text-slate-800">.env</code> file to fetch live data from <code className="font-mono">public.sorting_history</code> and <code className="font-mono">public.device_status</code>.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSpecs}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-amber-200 text-xs font-medium transition shadow-xs"
        >
          <span>Setup Instructions</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    </div>
  );
}

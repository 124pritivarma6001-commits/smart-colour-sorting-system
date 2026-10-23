import React, { useState } from 'react';
import { History, Download, Clock, CheckCircle2, Inbox } from 'lucide-react';

export default function SortingHistory({ history = [], loading = false, source = 'DEMO' }) {
  const [filterColor, setFilterColor] = useState('ALL');

  const filteredItems = history.filter((item) => {
    if (filterColor === 'ALL') return true;
    return (item.color || '').toUpperCase() === filterColor;
  });

  const exportCSV = () => {
    if (filteredItems.length === 0) return;
    const headers = ["Log ID,Timestamp,Color,Servo Angle (Deg),Bin,Red Freq (kHz),Green Freq (kHz),Blue Freq (kHz),Status,Data Source\n"];
    const rows = filteredItems.map(item => 
      `${item.id},${item.timestamp},${item.color},${item.servoAngle},${item.bin},${item.frequencies?.r || 0},${item.frequencies?.g || 0},${item.frequencies?.b || 0},${item.status},${item.tag || source}`
    );
    const blob = new Blob([...headers, rows.join("\n")], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `colour_sorting_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/60 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Recent Sorting History
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                source === 'SUPABASE' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {source === 'SUPABASE' ? 'Supabase Table' : 'Demo Buffer'}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Timestamped log from <code className="font-mono text-slate-700">public.sorting_history</code>
            </p>
          </div>
        </div>

        {/* Filter & Export */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs">
            {['ALL', 'RED', 'GREEN', 'BLUE'].map((col) => (
              <button
                key={col}
                onClick={() => setFilterColor(col)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  filterColor === col
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {col}
              </button>
            ))}
          </div>

          <button
            onClick={exportCSV}
            disabled={filteredItems.length === 0}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition shadow-xs ${
              filteredItems.length === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900'
            }`}
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-xs font-mono">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <span>Syncing sorting records from Supabase...</span>
        </div>
      ) : history.length === 0 ? (
        /* Empty State */
        <div className="py-16 text-center text-slate-500">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3 border border-slate-100">
            <Inbox className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-800">No sorting events in table yet</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            The table <code className="font-mono text-slate-700">public.sorting_history</code> is currently empty. As objects are sorted by the ESP32, entries will stream in here automatically.
          </p>
        </div>
      ) : (
        /* Table Container */
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Log ID</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Detected Colour</th>
                <th className="py-3 px-4">TCS3200 Frequencies (R / G / B)</th>
                <th className="py-3 px-4">Servo Angle</th>
                <th className="py-3 px-4">Target Bin</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* ID */}
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                    {item.id}
                  </td>

                  {/* Timestamp */}
                  <td className="py-3.5 px-4 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.timestamp}</span>
                    </div>
                  </td>

                  {/* Colour Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${item.colorHex}15`,
                        color: item.colorHex === '#3b82f6' ? '#1d4ed8' : (item.colorHex === '#ef4444' ? '#b91c1c' : '#047857')
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      {item.color}
                    </span>
                  </td>

                  {/* Sensor raw frequencies */}
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    <span className="text-red-600 font-medium">{item.frequencies?.r || 0}</span> /{' '}
                    <span className="text-emerald-600 font-medium">{item.frequencies?.g || 0}</span> /{' '}
                    <span className="text-blue-600 font-medium">{item.frequencies?.b || 0}</span> kHz
                  </td>

                  {/* Servo Angle */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                      {item.servoAngle}°
                    </span>
                  </td>

                  {/* Bin */}
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.bin}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <span>Showing {filteredItems.length} records</span>
        <span className="text-slate-400 font-mono">
          {source === 'SUPABASE' ? 'Synced from public.sorting_history' : 'Sample dataset from verification run'}
        </span>
      </div>
    </div>
  );
}

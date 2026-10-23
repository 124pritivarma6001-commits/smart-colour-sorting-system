import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { PieChart, BarChart3 } from 'lucide-react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function ColourChart({ stats }) {
  const [chartType, setChartType] = useState('doughnut');
  const { totalSorted, redCount, greenCount, blueCount } = stats;

  const redPct = totalSorted > 0 ? ((redCount / totalSorted) * 100).toFixed(1) : 0;
  const greenPct = totalSorted > 0 ? ((greenCount / totalSorted) * 100).toFixed(1) : 0;
  const bluePct = totalSorted > 0 ? ((blueCount / totalSorted) * 100).toFixed(1) : 0;

  const isEmpty = totalSorted === 0;

  const chartData = {
    labels: isEmpty
      ? ['No Objects Sorted']
      : ['Red Objects (0°)', 'Green Objects (60°)', 'Blue Objects (120°)'],
    datasets: [
      {
        label: 'Objects Sorted',
        data: isEmpty ? [1] : [redCount, greenCount, blueCount],
        backgroundColor: isEmpty
          ? ['#e2e8f0']
          : [
              '#ef4444', // Red
              '#10b981', // Green
              '#3b82f6'  // Blue
            ],
        borderColor: '#ffffff',
        borderWidth: isEmpty ? 0 : 3,
        hoverOffset: isEmpty ? 0 : 6,
        borderRadius: chartType === 'bar' ? 8 : 0,
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0f172a',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const val = context.raw || 0;
            const pct = totalSorted > 0 ? ((val / totalSorted) * 100).toFixed(1) : 0;
            return ` ${val} items (${pct}%)`;
          }
        }
      }
    },
    cutout: '72%'
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0f172a',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 12, weight: '500' } }
      },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 12 } }
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/60 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Colour Distribution Analytics</h3>
            <p className="text-xs text-slate-500">Volume and percentage breakdown per colour category</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setChartType('doughnut')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              chartType === 'doughnut'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieChart className="w-3.5 h-3.5 text-blue-600" />
            <span>Doughnut</span>
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              chartType === 'bar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>Bar Chart</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative h-64 my-6 flex items-center justify-center">
        {chartType === 'doughnut' ? (
          <>
            <Doughnut data={chartData} options={doughnutOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-semibold uppercase text-slate-400">Total</span>
              <span className="text-3xl font-extrabold font-mono text-slate-900">{totalSorted}</span>
              <span className="text-xs text-slate-500">Objects</span>
            </div>
          </>
        ) : (
          <Bar data={chartData} options={barOptions} />
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-100">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs font-semibold text-slate-700">Red Objects (0°)</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {redCount} <span className="text-xs font-normal text-slate-500 font-sans">({redPct}%)</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-700">Green Objects (60°)</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {greenCount} <span className="text-xs font-normal text-slate-500 font-sans">({greenPct}%)</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold text-slate-700">Blue Objects (120°)</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {blueCount} <span className="text-xs font-normal text-slate-500 font-sans">({bluePct}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

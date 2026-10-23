import React from 'react';
import { Package } from 'lucide-react';

export default function OverviewCards({ stats }) {
  const { totalSorted = 0, redCount = 0, greenCount = 0, blueCount = 0 } = stats || {};

  const redPct = totalSorted > 0 ? ((redCount / totalSorted) * 100).toFixed(1) : 0;
  const greenPct = totalSorted > 0 ? ((greenCount / totalSorted) * 100).toFixed(1) : 0;
  const bluePct = totalSorted > 0 ? ((blueCount / totalSorted) * 100).toFixed(1) : 0;

  const cards = [
    {
      title: "Total Objects Sorted",
      value: totalSorted,
      subtext: "Total sorted items across all bins",
      tag: "All Bins",
      tagStyle: "bg-slate-100 text-slate-700",
      accentDot: "bg-blue-600",
      valueColor: "text-slate-900",
      percentage: "100%",
      angle: "0° – 120°"
    },
    {
      title: "Red Objects Count",
      value: redCount,
      subtext: `${redPct}% of total sorted objects`,
      tag: "Bin 1",
      tagStyle: "bg-red-50 text-red-700 font-semibold",
      accentDot: "bg-red-500",
      valueColor: "text-red-600",
      percentage: `${redPct}%`,
      angle: "0° Servo"
    },
    {
      title: "Green Objects Count",
      value: greenCount,
      subtext: `${greenPct}% of total sorted objects`,
      tag: "Bin 2",
      tagStyle: "bg-emerald-50 text-emerald-700 font-semibold",
      accentDot: "bg-emerald-500",
      valueColor: "text-emerald-600",
      percentage: `${greenPct}%`,
      angle: "60° Servo"
    },
    {
      title: "Blue Objects Count",
      value: blueCount,
      subtext: `${bluePct}% of total sorted objects`,
      tag: "Bin 3",
      tagStyle: "bg-blue-50 text-blue-700 font-semibold",
      accentDot: "bg-blue-500",
      valueColor: "text-blue-600",
      percentage: `${bluePct}%`,
      angle: "120° Servo"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {card.title}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full ${card.tagStyle}`}>
                {card.tag}
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-2">
              <span className={`text-3xl font-extrabold font-mono tracking-tight ${card.valueColor}`}>
                {card.value.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-slate-500 font-mono">
                {card.percentage}
              </span>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${card.accentDot}`} />
              {card.subtext}
            </span>
            <span className="font-mono font-medium text-slate-700">{card.angle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

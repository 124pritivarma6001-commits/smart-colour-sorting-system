import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Activity, Compass, Database, Terminal, Check, Copy } from 'lucide-react';
import { HARDWARE_SPECS } from '../data/mockData';

export default function TechnicalDetailsSection({ detection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const rawFrequencies = detection?.rawFrequencies || { red: 0, green: 0, blue: 0 };
  const filterMode = detection?.filterMode || 'Optical Standby';
  const maxFreq = Math.max(rawFrequencies.red || 0, rawFrequencies.green || 0, rawFrequencies.blue || 0, 100);

  const esp32Snippet = `// ESP32 Arduino Sketch snippet for TCS3200 + SG90 Servo
#include <WiFi.h>
#include <ESP32Servo.h>

#define S0_PIN 19
#define S1_PIN 18
#define S2_PIN 5
#define S3_PIN 17
#define OUT_PIN 16
#define SERVO_PIN 13

Servo sorterServo;

// Sorting logic:
// Red   -> 0 degrees
// Green -> 60 degrees
// Blue  -> 120 degrees
void sortColour(int angle) {
  sorterServo.write(angle);
  delay(1000); // Allow object to drop into designated bin
  sorterServo.write(90); // Return flap to center
}
`;

  const copyCode = () => {
    navigator.clipboard.writeText(esp32Snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="technical" className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden scroll-mt-20">
      {/* Accordion Toggle Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 sm:p-7 flex items-center justify-between hover:bg-slate-50/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Technical Details & Hardware Diagnostics
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                ESP32 • TCS3200 • SG90
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Raw optical sensor frequencies, servo PWM routing rules, ESP32 pinout table and Firebase schema
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
          <span>{isOpen ? 'Hide Details' : 'Show Details'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 space-y-6">
          
          {/* 1. Sensor Frequency Breakdown */}
          <div className="mt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              TCS3200 Optical Filter Frequencies
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Red Filter */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-red-700">Red Filter (S2:L, S3:L)</span>
                  <span className="font-mono font-bold text-slate-900">{rawFrequencies.red} kHz</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(rawFrequencies.red / maxFreq) * 100}%` }}
                  />
                </div>
              </div>

              {/* Green Filter */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-emerald-700 font-bold">Green Filter (S2:H, S3:H) ★</span>
                  <span className="font-mono font-bold text-slate-900">{rawFrequencies.green} kHz</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${(rawFrequencies.green / maxFreq) * 100}%` }}
                  />
                </div>
              </div>

              {/* Blue Filter */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-blue-700">Blue Filter (S2:L, S3:H)</span>
                  <span className="font-mono font-bold text-slate-900">{rawFrequencies.blue} kHz</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(rawFrequencies.blue / maxFreq) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Active Mode: <span className="font-semibold text-slate-700">{filterMode}</span> (Highest frequency indicates dominant colour).
            </p>
          </div>

          {/* 2. ESP32 Pinout Wiring Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              ESP32 DevKit V1 Hardware Pinout Map
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-100 bg-slate-50 text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Hardware Component</th>
                    <th className="py-2.5 px-4">Module Pin</th>
                    <th className="py-2.5 px-4">ESP32 GPIO Pin</th>
                    <th className="py-2.5 px-4">Role & Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700">
                  <tr>
                    <td className="py-2 px-4 font-semibold text-slate-900">TCS3200 Sensor</td>
                    <td className="py-2 px-4 font-mono">S0, S1</td>
                    <td className="py-2 px-4 font-mono font-bold text-blue-700">GPIO 19, GPIO 18</td>
                    <td className="py-2 px-4">Frequency scaling (configured at 20%)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold text-slate-900">TCS3200 Sensor</td>
                    <td className="py-2 px-4 font-mono">S2, S3</td>
                    <td className="py-2 px-4 font-mono font-bold text-blue-700">GPIO 5, GPIO 17</td>
                    <td className="py-2 px-4">Colour photodiode array filter selector</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold text-slate-900">TCS3200 Sensor</td>
                    <td className="py-2 px-4 font-mono">OUT</td>
                    <td className="py-2 px-4 font-mono font-bold text-amber-700">GPIO 16</td>
                    <td className="py-2 px-4">Pulse frequency read via pulseIn / interrupt</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold text-slate-900">SG90 Servo Motor</td>
                    <td className="py-2 px-4 font-mono">PWM Signal</td>
                    <td className="py-2 px-4 font-mono font-bold text-emerald-700">GPIO 13</td>
                    <td className="py-2 px-4">Actuator sorting arm (0° Red, 60° Green, 120° Blue)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold text-slate-900">Power Supply</td>
                    <td className="py-2 px-4 font-mono">VCC / GND</td>
                    <td className="py-2 px-4 font-mono font-bold text-slate-900">VIN (5V) / GND</td>
                    <td className="py-2 px-4">Common 5V DC power rail and system ground</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Arduino Sketch & Firebase Schema */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Arduino Code Snippet */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-600" />
                    Arduino / ESP32 Hardware Logic
                  </span>
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white px-2 py-1 rounded border border-slate-200 shadow-xs"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-800 overflow-x-auto max-h-40">
                  <pre>{esp32Snippet}</pre>
                </div>
              </div>
            </div>

            {/* Supabase Schema & RLS Policy */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-blue-600" />
                    Supabase Tables & RLS Policies
                  </span>
                  <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500">
                    SQL / PostgREST
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-800 overflow-x-auto max-h-40">
                  <pre>{`-- Enable SELECT for anonymous dashboard visitors
ALTER TABLE public.sorting_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.sorting_history 
  FOR SELECT TO anon USING (true);

ALTER TABLE public.device_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.device_status 
  FOR SELECT TO anon USING (true);`}</pre>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

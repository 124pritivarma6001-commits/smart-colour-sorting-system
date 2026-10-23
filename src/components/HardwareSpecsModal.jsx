import React, { useState } from 'react';
import { X, Cpu, Database, Copy, Check, Terminal } from 'lucide-react';

export default function HardwareSpecsModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const esp32Snippet = `// ESP32 Arduino Sketch snippet for TCS3200 + SG90 Servo + Firebase RTDB
#include <WiFi.h>
#include <ESP32Servo.h>
#include <Firebase_ESP_Client.h>

#define S0_PIN 19
#define S1_PIN 18
#define S2_PIN 5
#define S3_PIN 17
#define OUT_PIN 16
#define SERVO_PIN 13

Servo sorterServo;

// Sorting Angle Reference:
// Red   -> 0 degrees
// Green -> 60 degrees
// Blue  -> 120 degrees
void routeObject(int angle) {
  sorterServo.write(angle);
  delay(1200); // Allow object to drop into designated bin
  sorterServo.write(90); // Return to neutral flap position
}
`;

  const copyCode = () => {
    navigator.clipboard.writeText(esp32Snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ESP32 Hardware Pinout & Supabase Integration</h3>
              <p className="text-xs text-slate-500 font-mono">TCS3200 Optical Sensor • SG90 Servo (0° / 60° / 120°) • Supabase RLS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Servo Angles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Servo Actuator Sorting Angles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-red-50/60 border border-red-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-red-800">Bin 1: Red</div>
                  <div className="text-slate-500 text-xs font-mono">Filter S2:L, S3:L</div>
                </div>
                <div className="text-2xl font-mono font-bold text-red-600">0°</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-800">Bin 2: Green</div>
                  <div className="text-slate-500 text-xs font-mono">Filter S2:H, S3:H</div>
                </div>
                <div className="text-2xl font-mono font-bold text-emerald-600">60°</div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-blue-800">Bin 3: Blue</div>
                  <div className="text-slate-500 text-xs font-mono">Filter S2:L, S3:H</div>
                </div>
                <div className="text-2xl font-mono font-bold text-blue-600">120°</div>
              </div>
            </div>
          </div>

          {/* Wiring Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              ESP32 DevKit Wiring Map
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 font-sans font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Component</th>
                    <th className="py-2.5 px-4">Pin</th>
                    <th className="py-2.5 px-4">ESP32 Pin</th>
                    <th className="py-2.5 px-4">Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">TCS3200</td>
                    <td className="py-2.5 px-4">S0 / S1</td>
                    <td className="py-2.5 px-4 font-bold text-blue-700">GPIO 19 / GPIO 18</td>
                    <td className="py-2.5 px-4 text-slate-500">Frequency scaling selection (20%)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">TCS3200</td>
                    <td className="py-2.5 px-4">S2 / S3</td>
                    <td className="py-2.5 px-4 font-bold text-blue-700">GPIO 5 / GPIO 17</td>
                    <td className="py-2.5 px-4 text-slate-500">Colour filter selection</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">TCS3200</td>
                    <td className="py-2.5 px-4">OUT</td>
                    <td className="py-2.5 px-4 font-bold text-amber-700">GPIO 16</td>
                    <td className="py-2.5 px-4 text-slate-500">Square wave frequency output</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">SG90 Servo</td>
                    <td className="py-2.5 px-4">PWM Signal</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-700">GPIO 13</td>
                    <td className="py-2.5 px-4 text-slate-500">Servo control (0°, 60°, 120°)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">Power Rails</td>
                    <td className="py-2.5 px-4">VCC / GND</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">VIN (5V) / GND</td>
                    <td className="py-2.5 px-4 text-slate-500">Common ground and DC supply</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Arduino Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                Arduino / ESP32 Code Skeleton
              </span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-48">
              <pre>{esp32Snippet}</pre>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            AI Colour Sorting System • Technical Reference
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium transition shadow-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

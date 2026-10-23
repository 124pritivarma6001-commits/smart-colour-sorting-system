/**
 * Mock / Sample Data for IoT-Based Smart Colour Sorting System Using ESP32
 * 
 * Hardware Specs:
 * - Microcontroller: ESP32 DevKit V1
 * - Color Sensor: TCS3200 (Frequency output proportional to color intensity)
 * - Actuator: Micro Servo Motor SG90 / MG995
 *   - Red   -> 0°
 *   - Green -> 60°
 *   - Blue  -> 120°
 * 
 * NOTE: This is clearly labelled sample data for development and demonstration.
 * No fake hardware polling is executed. Real-time sync can be connected via Firebase.
 */

export const HARDWARE_SPECS = {
  board: "ESP32-WROOM-32",
  sensor: "TCS3200 RGB Color Sensor",
  actuator: "TowerPro SG90 / MG996R Servo",
  bins: [
    { name: "Red Bin", color: "#ef4444", angle: 0, label: "0° (Red)" },
    { name: "Green Bin", color: "#10b981", angle: 60, label: "60° (Green)" },
    { name: "Blue Bin", color: "#3b82f6", angle: 120, label: "120° (Blue)" }
  ],
  pinout: {
    s0: "GPIO 19",
    s1: "GPIO 18",
    s2: "GPIO 5",
    s3: "GPIO 17",
    out: "GPIO 16",
    servoPwm: "GPIO 13",
    vcc: "5V / 3.3V",
    gnd: "GND"
  }
};

export const INITIAL_SYSTEM_STATE = {
  isHardwareConnected: false, // Explicitly false as per project instructions
  connectionStatus: "OFFLINE (Demo Mode Active)",
  lastUpdateTime: "Today, 18:45:22 IST",
  firmwareVersion: "v1.2.0-esp32-tcs3200",
  wifiSsid: "IoT-Lab-WiFi (Unpaired)",
  firebaseStatus: "Ready for Firebase RTDB integration",
  
  // Total summary counts
  stats: {
    totalSorted: 148,
    redCount: 52,
    greenCount: 47,
    blueCount: 49,
    efficiencyRate: 98.6,
    avgSortingTimeSec: 1.4
  },

  // Latest detected object at the TCS3200 sensor
  latestDetection: {
    color: "Green",
    hex: "#10b981",
    servoAngle: 60,
    timestamp: "18:45:20 IST",
    confidence: 96.8,
    // TCS3200 raw frequency readings (scaled 20% typical ESP32 pulseIn readings in µs or kHz)
    rawFrequencies: {
      red: 142,   // kHz or scaled cycle frequency
      green: 285, // Dominant frequency for green
      blue: 168
    },
    filterMode: "Green Filter (S2: HIGH, S3: HIGH)",
    binAssigned: "Bin 2 (Green - 60°)"
  },

  // Recent sorting history log
  sortingHistory: [
    {
      id: "SRT-0148",
      timestamp: "18:45:20 IST",
      color: "Green",
      colorHex: "#10b981",
      servoAngle: 60,
      bin: "Bin 2 (Green)",
      frequencies: { r: 142, g: 285, b: 168 },
      status: "Sorted Success",
      tag: "DEMO"
    },
    {
      id: "SRT-0147",
      timestamp: "18:43:55 IST",
      color: "Red",
      colorHex: "#ef4444",
      servoAngle: 0,
      bin: "Bin 1 (Red)",
      frequencies: { r: 310, g: 135, b: 122 },
      status: "Sorted Success",
      tag: "DEMO"
    },
    {
      id: "SRT-0146",
      timestamp: "18:42:10 IST",
      color: "Blue",
      colorHex: "#3b82f6",
      servoAngle: 120,
      bin: "Bin 3 (Blue)",
      frequencies: { r: 110, g: 154, b: 320 },
      status: "Sorted Success",
      tag: "DEMO"
    },
    {
      id: "SRT-0145",
      timestamp: "18:40:32 IST",
      color: "Red",
      colorHex: "#ef4444",
      servoAngle: 0,
      bin: "Bin 1 (Red)",
      frequencies: { r: 295, g: 128, b: 115 },
      status: "Sorted Success",
      tag: "DEMO"
    },
    {
      id: "SRT-0144",
      timestamp: "18:38:15 IST",
      color: "Blue",
      colorHex: "#3b82f6",
      servoAngle: 120,
      bin: "Bin 3 (Blue)",
      frequencies: { r: 105, g: 160, b: 315 },
      status: "Sorted Success",
      tag: "DEMO"
    },
    {
      id: "SRT-0143",
      timestamp: "18:36:50 IST",
      color: "Green",
      colorHex: "#10b981",
      servoAngle: 60,
      bin: "Bin 2 (Green)",
      frequencies: { r: 138, g: 278, b: 162 },
      status: "Sorted Success",
      tag: "DEMO"
    },
    {
      id: "SRT-0142",
      timestamp: "18:35:05 IST",
      color: "Red",
      colorHex: "#ef4444",
      servoAngle: 0,
      bin: "Bin 1 (Red)",
      frequencies: { r: 305, g: 132, b: 118 },
      status: "Sorted Success",
      tag: "DEMO"
    },
    {
      id: "SRT-0141",
      timestamp: "18:33:40 IST",
      color: "Green",
      colorHex: "#10b981",
      servoAngle: 60,
      bin: "Bin 2 (Green)",
      frequencies: { r: 145, g: 290, b: 170 },
      status: "Sorted Success",
      tag: "DEMO"
    }
  ]
};

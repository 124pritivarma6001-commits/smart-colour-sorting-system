/**
 * Firebase Configuration for ESP32 IoT Smart Colour Sorting System
 * 
 * Instructions for connecting your real hardware:
 * 1. Create a Firebase project at https://console.firebase.google.com/
 * 2. Enable "Realtime Database" and set rules to allow read/write or authenticated access.
 * 3. Replace the placeholder config below or add .env variables (VITE_FIREBASE_API_KEY, etc.)
 * 4. In your ESP32 Arduino sketch, use the "Firebase ESP32 Client" library by Mobizt
 *    to push sensor readings:
 *      - /sensorData/latestDetection (color, servoAngle, redFreq, greenFreq, blueFreq)
 *      - /sensorData/stats (totalSorted, redCount, greenCount, blueCount)
 *      - /sensorData/history (push log entries with timestamp)
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "smart-colour-sorter.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://smart-colour-sorter-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "smart-colour-sorter",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "smart-colour-sorter.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

export const isFirebaseConfigured = () => {
  return (
    Boolean(import.meta.env.VITE_FIREBASE_DATABASE_URL) &&
    import.meta.env.VITE_FIREBASE_DATABASE_URL !== "https://smart-colour-sorter-default-rtdb.firebaseio.com"
  );
};

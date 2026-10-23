# IoT-Based AI Colour Sorting System

An end-to-end industrial IoT solution featuring an **ESP32 microcontroller**, a **TCS3200 colour sensor**, an **SG90 servo actuator**, a **Python serial telemetry bridge**, and a modern **web dashboard** synchronized in real-time with **Supabase**.

---

## 🏗️ System Architecture

1. **Hardware Controller (`esp32/colour_sorting.ino`):**
   - Reads RGB filter frequencies from the TCS3200 sensor.
   - Actuates the SG90 servo motor:
     - 🔴 **Red:** `0°` (Bin 1)
     - 🟢 **Green:** `60°` (Bin 2)
     - 🔵 **Blue:** `120°` (Bin 3)
   - Transmits structured `DATA,colour,red,green,blue` serial records at 115200 baud.

2. **Serial-to-Cloud Bridge (`esp32/usb_to_supabase.py`):**
   - Connects to the ESP32 via USB serial port.
   - Securely reads environment variables from `.env`.
   - Posts classified sorting events directly to Supabase (`public.sorting_history`).

3. **Real-time Web Dashboard (`src/`):**
   - Built with React, Tailwind CSS, and Chart.js.
   - Listens to PostgreSQL database events in real-time via `@supabase/supabase-js`.
   - Displays live KPI counters, distribution charts, and timestamped audit logs.

---

## 🚀 Quick Start Guide

### 1. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-anon-key
SERIAL_PORT=COM3
BAUD_RATE=115200
```

> ⚠️ **Security Notice:** Use ONLY the publishable (anon) public key in `VITE_SUPABASE_PUBLISHABLE_KEY`. Never commit or expose your secret service-role key.

---

### 2. Database Tables & Row Level Security (RLS)

Run the following SQL in your **Supabase SQL Editor**:

```sql
-- Allow anonymous read access to device_status
ALTER TABLE public.device_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read device_status"
  ON public.device_status
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous read access to sorting_history
ALTER TABLE public.sorting_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read sorting_history"
  ON public.sorting_history
  FOR SELECT
  TO anon
  USING (true);
```

---

### 3. Verify Connection

Test your Supabase connection and schema permissions:

```bash
npm run test:supabase
```

---

### 4. Run the Web Dashboard

```bash
# Install frontend dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

### 5. Run the Hardware Serial Bridge

```bash
# Install python dependencies
pip install pyserial requests

# Start USB bridge
python esp32/usb_to_supabase.py
```

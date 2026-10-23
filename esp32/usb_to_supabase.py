import os
import sys
import time
import serial
import requests

# Load environment variables from .env if present
def load_env_file():
    env_paths = [
        ".env",
        "../.env",
        os.path.join(os.path.dirname(__file__), "..", ".env"),
        os.path.join(os.path.dirname(__file__), ".env"),
    ]
    for path in env_paths:
        if os.path.isfile(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            k, v = k.strip(), v.strip().strip("'\"")
                            if k not in os.environ:
                                os.environ[k] = v
                break
            except Exception:
                pass

load_env_file()

# Hardware Serial Configuration
SERIAL_PORT = os.getenv("SERIAL_PORT", "COM3")
BAUD_RATE = int(os.getenv("BAUD_RATE", "115200"))

# Supabase Credentials loaded securely from environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = (
    os.getenv("SUPABASE_KEY")
    or os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY")
    or os.getenv("SUPABASE_ANON_KEY")
)

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ ERROR: Supabase URL or Publishable Key is not set.")
    print("Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file or environment.")
    sys.exit(1)

ENDPOINT = SUPABASE_URL.rstrip("/") + "/rest/v1/sorting_history"

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def main():
    print("=" * 60)
    print("🤖 ESP32 USB to Supabase Telemetry Bridge")
    print(f"📡 Serial Port: {SERIAL_PORT} @ {BAUD_RATE} baud")
    print(f"☁️  Supabase URL: {SUPABASE_URL}")
    print("=" * 60)

    try:
        esp = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    except Exception as err:
        print(f"❌ Failed to open serial port {SERIAL_PORT}: {err}")
        print("Please check USB cable connection and verify port in Device Manager.")
        sys.exit(1)

    with esp:
        # ESP32 may restart when the serial port opens
        time.sleep(2)
        print("✅ USB receiver connected. Waiting for colour classification data from ESP32...")

        while True:
            try:
                raw_line = esp.readline()
                if not raw_line:
                    continue

                line = raw_line.decode("utf-8", errors="ignore").strip()

                if not line.startswith("DATA,"):
                    continue

                parts = line.split(",")

                if len(parts) != 5:
                    continue

                _, colour, red, green, blue = parts

                payload = {
                    "detected_colour": colour,
                    "red_value": int(red),
                    "green_value": int(green),
                    "blue_value": int(blue)
                }

                try:
                    response = requests.post(
                        ENDPOINT,
                        headers=headers,
                        json=payload,
                        timeout=10
                    )

                    if response.ok:
                        print(f"✅ Saved to Supabase: {colour} (R:{red}, G:{green}, B:{blue})")
                    else:
                        print(f"⚠️ Supabase error ({response.status_code}): {response.text}")

                except requests.RequestException as error:
                    print("⚠️ Network error sending data to Supabase:", error)
                    time.sleep(2)

            except KeyboardInterrupt:
                print("\n🛑 Receiver stopped by user.")
                break
            except Exception as err:
                print(f"⚠️ Serial read warning: {err}")
                time.sleep(0.5)

if __name__ == "__main__":
    main()

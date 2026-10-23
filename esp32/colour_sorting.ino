#include <ESP32Servo.h>

// TCS3200 sensor pins
#define S0 13
#define S1 12
#define S2 14
#define S3 27
#define sensorOut 26

// Servo pin and angles
#define SERVO_PIN 18
#define RED_ANGLE 0
#define GREEN_ANGLE 60
#define BLUE_ANGLE 120

Servo sorterServo;

unsigned long redValue = 0;
unsigned long greenValue = 0;
unsigned long blueValue = 0;

void setup() {
  Serial.begin(115200);

  pinMode(S0, OUTPUT);
  pinMode(S1, OUTPUT);
  pinMode(S2, OUTPUT);
  pinMode(S3, OUTPUT);
  pinMode(sensorOut, INPUT);

  // TCS3200 frequency scaling: 20%
  digitalWrite(S0, HIGH);
  digitalWrite(S1, LOW);

  sorterServo.setPeriodHertz(50);
  sorterServo.attach(SERVO_PIN, 500, 2400);
  sorterServo.write(0);

  Serial.println("Smart Colour Sorting System ready.");
}

void loop() {
  // Read red
  digitalWrite(S2, LOW);
  digitalWrite(S3, LOW);
  redValue = pulseIn(sensorOut, LOW, 25000);
  delay(100);

  // Read green
  digitalWrite(S2, HIGH);
  digitalWrite(S3, HIGH);
  greenValue = pulseIn(sensorOut, LOW, 25000);
  delay(100);

  // Read blue
  digitalWrite(S2, LOW);
  digitalWrite(S3, HIGH);
  blueValue = pulseIn(sensorOut, LOW, 25000);
  delay(100);

  String colour = "NONE";

  if (redValue > 0 &&
      redValue < greenValue &&
      redValue < blueValue) {
    colour = "RED";
    sorterServo.write(RED_ANGLE);
  }
  else if (greenValue > 0 &&
           greenValue < redValue &&
           greenValue < blueValue) {
    colour = "GREEN";
    sorterServo.write(GREEN_ANGLE);
  }
  else if (blueValue > 0 &&
           blueValue < redValue &&
           blueValue < greenValue) {
    colour = "BLUE";
    sorterServo.write(BLUE_ANGLE);
  }

  if (colour != "NONE") {
    delay(800);

    // Machine-readable data for the laptop program
    Serial.printf("DATA,%s,%lu,%lu,%lu\n",
                  colour.c_str(),
                  redValue,
                  greenValue,
                  blueValue);
  }

  delay(1500);
}
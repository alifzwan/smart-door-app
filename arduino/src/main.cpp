#include <Arduino.h>

// Define the pin connected to the lock mechanism
const int lockPin = 8; // Pin 8 is connected to the lock mechanism
bool isLocked = false; // initialized as unlocked


// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(9600);          // Begin serial communication at a baud rate of 9600
  pinMode(lockPin, OUTPUT);    // Set the lock pin as an output
  digitalWrite(lockPin, LOW);  // Initialize the lock state (locked)
}



void loop() {
  if (Serial.available() > 0) { // Check if data is available to read from the serial port
   
    String command = Serial.readStringUntil('\n');  // Read the incoming command as a string
    command.trim(); // Remove any leading/trailing whitespace

   
    if (command == "lock") {

      digitalWrite(lockPin, HIGH); // Lock the door
      isLocked = true;
      Serial.println("locked");

    } else if (command == "unlock") {
        digitalWrite(lockPin, LOW); // Unlock the door
        isLocked = false;
        Serial.println("unlocked");
    }
  }
}


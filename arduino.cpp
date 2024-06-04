const int lockPin = 8; // Pin connected to the lock mechanism

void setup() { // This function is called once when the Arduino board is powered up or reset
  pinMode(lockPin, OUTPUT);
  digitalWrite(lockPin, LOW); // This line sets the lockPin to LOW (0 volts) ensure the lock is initially locked
  Serial.begin(9600); // Start the serial communication at baud rate 9600. This used to communicate with the Arduino board
}

void loop() { // This function is called repeatedly
  if (Serial.available() > 0) { // Check if there is any data available to read from the serial port
    String command = Serial.readStringUntil('\n'); // Read the data from the serial port until a newline character is received
    command.trim(); // Remove any whitespace characters

    if (command == "lock") {
      digitalWrite(lockPin, LOW); // Activate the lock
      Serial.println("locked");
    } else if (command == "unlock") {
      digitalWrite(lockPin, HIGH); // Deactivate the lock
      Serial.println("unlocked");
    } else if (command == "status") {
      if (digitalRead(lockPin) == HIGH) {
        Serial.println("unlocked");
      } else {
        Serial.println("locked");
      }
    } else {
      Serial.println("unknown command");
    }
  }
}

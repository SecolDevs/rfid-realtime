#include <Servo.h>
Servo servoMotor;
int servoPin = 9;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  servoMotor.attach(servoPin);
}

void loop() {
  // put your main code here, to run repeatedly:
  servoMotor.write(0);
  delay(1000);
  servoMotor.write(180);
  delay(1000);
}

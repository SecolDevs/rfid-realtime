
int red = 9;
int green = 10;
int blue = 11;
int buzz = 8;

void setup() {
  // put your setup code here, to run once:
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
  pinMode(buzz, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  analogWrite(red, 255);
  analogWrite(blue, 0);
  delay(500);
  digitalWrite(buzz, HIGH);
  analogWrite(red, 0);
  analogWrite(green, 255);
  delay(500);
  digitalWrite(buzz, LOW);
  analogWrite(green, 0);
  analogWrite(blue, 255);
  delay(500);
}

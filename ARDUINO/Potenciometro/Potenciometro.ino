long val1;
long val2;

int potR;
int potB;

bool encendido = false;

int ledR = 9;
int ledG = 10;
int ledB = 11;
int buzz = 4;
int btnLed = 2;
int btnBuzz = 3;

int pot1 = A0;
int pot2 = A1;

 
void setup() {
  Serial.begin(9600);
  pinMode(ledR, OUTPUT);
  pinMode(ledG, OUTPUT);
  pinMode(ledB, OUTPUT);
  pinMode(buzz, OUTPUT);
  pinMode(btnLed, INPUT);
  pinMode(btnBuzz, INPUT);
}

void loop() {
  val1 = analogRead(pot1);
  val2 = analogRead(pot2);
  potR = map(val1, 0, 1023, 0, 255);
  potB = map(val2, 0, 1023, 0, 255);

  if (digitalRead(btnBuzz) == HIGH) {
    digitalWrite(buzz, HIGH);
  } else {
    digitalWrite(buzz, LOW);
  }

  if (digitalRead(btnLed) == HIGH) {
    delay(200);
    encendido = !encendido;
  }


  if (encendido) {
    analogWrite(ledG, 255);
  } else {
    analogWrite(ledG, 0);
  }

  analogWrite(ledR, potR);
  analogWrite(ledB, potB);
}

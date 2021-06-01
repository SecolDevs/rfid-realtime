int latchPin = 8;
int clockPin = 13;
int dataPin = 12;
int dDisplay = 200;
int dBtn = 200;
int i = 0;

int toggleBtn = 7;
int addBtn = 5;
int lessBtn = 6;

bool toggle = false;

byte numbers[] = {
  0b11111101, //0
  0b01100001, //1
  0b11011011, //2
  0b11110011, //3
  0b01100111, //4
  0b10110111, //5
  0b10111111, //6
  0b11100001, //7
  0b11111111, //8
  0b11110111, //9
  0b00000000  // off
};

void setup() {
  Serial.begin(9600);
  pinMode(latchPin, OUTPUT);
  pinMode(clockPin, OUTPUT);
  pinMode(dataPin, OUTPUT);
  pinMode(addBtn, INPUT_PULLUP);
  pinMode(lessBtn, INPUT_PULLUP);
  pinMode(toggleBtn, INPUT_PULLUP);
}

void loop() {
  digitalWrite(latchPin, LOW);        //ABCDEFGX
  shiftOut(dataPin, clockPin, LSBFIRST, numbers[i]);
  digitalWrite(latchPin, HIGH);

  if (digitalRead(toggleBtn) == LOW) {
    delay(dBtn);
    toggle = !toggle;
  }

  if (toggle) {
    i++;
    delay(dDisplay);
    if (i > 9) {
      i = 0;
    }
  }

  if (digitalRead(addBtn) == LOW) {
    delay(dBtn);
    i++;
    i = i > 10 ? 0 : i;
  }

  if (digitalRead(lessBtn) == LOW) {
    delay(dBtn);
    i--;
    i = i < 0 ? 10 : i;
  }
}

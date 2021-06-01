#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN  9    //Pin 9 para el reset del RC522
#define SS_PIN  10   //Pin 10 para el SS (SDA) del RC522
MFRC522 mfrc522(SS_PIN, RST_PIN); //Creamos el objeto para el RC522
byte lectUID[4];
byte user1[4] = {0x93, 0xE2, 0x8E, 0x1A};

int ledR = 5;
int ledG = 6;
int ledB = 7;

int buzz = 4;

void setup() {
  Serial.begin(9600);      // inicializa comunicacion por monitor serie a 9600 bps
  SPI.begin();        // inicializa bus SPI
  mfrc522.PCD_Init();     // inicializa modulo lector

  pinMode(ledR, OUTPUT);
  pinMode(ledG, OUTPUT);
  pinMode(buzz, OUTPUT);
}

void loop() {
  if ( ! mfrc522.PICC_IsNewCardPresent())   // si no hay una tarjeta presente
    return;           // retorna al loop esperando por una tarjeta

  if ( ! mfrc522.PICC_ReadCardSerial())     // si no puede obtener datos de la tarjeta
    return;           // retorna al loop esperando por otra tarjeta


  for (byte i = 0; i < mfrc522.uid.size; i++) { // bucle recorre de a un byte por vez el UID
    if (mfrc522.uid.uidByte[i] < 0x10) {  // si el byte leido es menor a 0x10
      Serial.print(" 0");       // imprime espacio en blanco y numero cero
    }
    else {          // sino
      Serial.print(" ");        // imprime un espacio en blanco
    }
    Serial.print(mfrc522.uid.uidByte[i], HEX);    // imprime el byte del UID leido en hexadecimal
  }

  Serial.print("\n");         // imprime un espacio de tabulacion
  String desc = Serial.readString();
  if (desc == "true") {
    parpadearLed(ledG, 2, 100);
  } else {
    parpadearLed(ledR, 2, 300);
  }
  mfrc522.PICC_HaltA();     // detiene comunicacion con tarjeta

}

void parpadearLed(int led, int veces, int retraso){
  for(int i = 0; i < veces; i++){
    digitalWrite(led, HIGH);
    digitalWrite(buzz, HIGH);
    delay(retraso);
    digitalWrite(led, LOW);
    digitalWrite(buzz, LOW);
    delay(retraso);
  }
}

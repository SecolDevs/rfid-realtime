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

int buzz = 3;

void setup() {
  Serial.begin(9600);      // inicializa comunicacion por monitor serie a 9600 bps
  SPI.begin();        // inicializa bus SPI
  mfrc522.PCD_Init();     // inicializa modulo lector
  Serial.println("Listo");    // Muestra texto Listo

  pinMode(ledR, OUTPUT);
  pinMode(ledB, OUTPUT);
  pinMode(ledG, OUTPUT);
  pinMode(buzz, OUTPUT);
}

void loop() {
  if ( ! mfrc522.PICC_IsNewCardPresent())   // si no hay una tarjeta presente
    return;           // retorna al loop esperando por una tarjeta

  if ( ! mfrc522.PICC_ReadCardSerial())     // si no puede obtener datos de la tarjeta
    return;           // retorna al loop esperando por otra tarjeta

  Serial.print("UID:");       // muestra texto UID:
  for (byte i = 0; i < mfrc522.uid.size; i++) { // bucle recorre de a un byte por vez el UID
    if (mfrc522.uid.uidByte[i] < 0x10) {  // si el byte leido es menor a 0x10
      Serial.print(" 0");       // imprime espacio en blanco y numero cero
    }
    else {          // sino
      Serial.print(" ");        // imprime un espacio en blanco
    }
    Serial.print(mfrc522.uid.uidByte[i], HEX);    // imprime el byte del UID leido en hexadecimal
    lectUID[i] = mfrc522.uid.uidByte[i];   // almacena en array el byte del UID leido
  }

  Serial.print("\t");         // imprime un espacio de tabulacion

  if (comparaUID(lectUID, user1)) {  // llama a funcion comparaUID con Usuario1
    Serial.println("Bienvenido Usuario 1");  // si retorna verdadero muestra texto bienvenida
    digitalWrite(ledG, HIGH);
    digitalWrite(buzz, HIGH);
    delay(300);
    digitalWrite(buzz, LOW);
    digitalWrite(ledG, LOW);
    delay(200);
    digitalWrite(ledG, HIGH);
    digitalWrite(buzz, HIGH);
    delay(300);
    digitalWrite(buzz, LOW);
    digitalWrite(ledG, LOW);
  }
  else {
    Serial.println("No te conozco");  // si retorna falso muestra texto equivalente a acceso denegado
    digitalWrite(ledR, HIGH);
    digitalWrite(buzz, HIGH);
    delay(300);
    digitalWrite(ledR, LOW);
    delay(200);
    digitalWrite(ledR, HIGH);
    delay(300);
    digitalWrite(buzz, LOW);
    digitalWrite(ledR, LOW);
  }
  mfrc522.PICC_HaltA();     // detiene comunicacion con tarjeta
}

boolean comparaUID(byte lectura[], byte usuario[]) // funcion comparaUID
{
  for (byte i = 0; i < mfrc522.uid.size; i++) { // bucle recorre de a un byte por vez el UID
    if (lectura[i] != usuario[i])       // si byte de UID leido es distinto a usuario
      return (false);         // retorna falso
  }
  return (true);          // si los 4 bytes coinciden retorna verdadero
}

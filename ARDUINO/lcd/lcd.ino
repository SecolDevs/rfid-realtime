
/*
  Capitulo 35 de Arduino desde cero en Español.
  Simple programa que muestra en la pantalla de un modulo LCD 1602A mediante adaptador
  LCD I2C el tiempo transcurrido desde la ejecucion del mismo. Adaptador basado en
  circuito integrado PCF8574 y libreria LiquidCrystal_I2C descargada desde:
  https://bitbucket.org/fmalpartida/new-liquidcrystal/downloads/

  Autor: bitwiseAr

*/

#include <Wire.h>     // libreria de comunicacion por I2C
#include <LCD.h>      // libreria para funciones de LCD
#include <LiquidCrystal_I2C.h>    // libreria para LCD por I2C

LiquidCrystal_I2C lcd (0x27, 2, 1, 0, 4, 5, 6, 7); // DIR, E, RW, RS, D4, D5, D6, D7

int sensor = A0;
float minivolts;
float temp;

void setup() {
  lcd.setBacklightPin(3, POSITIVE); // puerto P3 de PCF8574 como positivo
  lcd.setBacklight(HIGH);   // habilita iluminacion posterior de LCD
  lcd.begin(16, 2);     // 16 columnas por 2 lineas para LCD 1602A
  lcd.clear();      // limpia pantalla
  Serial.begin(9600);
}

void loop() {
  minivolts = (analogRead(sensor) / 1023.0) * 5000;
  temp = (minivolts / 10);
  Serial.println(temp);
  lcd.setCursor(0, 0);    // ubica cursor en columna 0 y linea 0
  lcd.print("Temperatura");
  lcd.setCursor(0, 1);    // ubica cursor en columna 0 y linea 1
  delay(1000);
  lcd.print(temp); 
  lcd.print(" C");
}

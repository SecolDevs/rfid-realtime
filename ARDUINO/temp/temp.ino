#include <DHT.h>
#include <DHT_U.h>

// Definimos el pin digital donde se conecta el sensor
#define DHTPIN 2
// Dependiendo del tipo de sensor
#define DHTTYPE DHT11

// Inicializamos el sensor DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  // Inicializamos comunicación serie
  Serial.begin(9600);

  // Comenzamos el sensor DHT
  dht.begin();

}

void loop() {
  // Leemos la humedad relativa
  float h = dht.readHumidity();
  // Leemos la temperatura en grados centígrados (por defecto)
  float t = dht.readTemperature();
  // Leemos la temperatura en grados Fahreheit
  float f = dht.readTemperature(true);

  Serial.print("Humedad: ");
  Serial.println(h);
  Serial.print("Temp C° ");
  Serial.println(t);
  Serial.print("Temp F ");
  Serial.println(f);

  // Esperamos 5 segundos entre medidas
  delay(5000);
}

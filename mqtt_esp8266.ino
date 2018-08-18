
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = ""; //Your WIFI's name
const char* password = ""; //Your WIFI's Password
const char* mqtt_server = ""; //Raspberry's IP Address

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {

  Serial.begin(9600);

  setup_wifi();

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  //The output pin. D5 on Lolin NODEMCU ESP8266 V3
  // See https://pradeepsinghblog.files.wordpress.com/2016/04/nodemcu_pins.png?w=616 
  //for details 
  
  pinMode(14, OUTPUT); 

}

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {

  if (payload == NULL) return;

  if ((char) payload[0] == '1') {
    //Turn on
    Serial.println("ON");
    digitalWrite(14, HIGH);
  }
  else if ((char) payload[0] == '0') {
    //Turn off
    Serial.println("OFF");  
    digitalWrite(14, LOW);
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

    if (client.connect("ESP8266Client")) {
      client.subscribe("relay");
      Serial.println("HolA");
      return;
    }
    else {
      Serial.print(client.state());
      delay(5000);
    }

  }

}

void loop() {

  if (!client.connected())
    reconnect();

  client.loop();
}


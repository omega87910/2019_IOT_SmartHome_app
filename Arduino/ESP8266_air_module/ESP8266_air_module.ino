//include libraries
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h> 
#include <DHT.h>

//Access point credentials
const char* ssid = "Pixel_2039";
const char* pwd = "00000000";
const char* host = "ip";
String get_host = "ip";
int air_auto= 0;
int air_state = 0;
int homemode = 0;
int homemode_pin = 1;
int air_pin = 3;
DHT dht(2,DHT11);
WiFiServer server(80);  // open port 80 for server connection
 
void setup() 
{
  dht.begin();
  Serial.begin(115200); //initialise the serial communication
  delay(20);
  WiFi.begin(ssid, pwd);
  pinMode(homemode_pin,OUTPUT);
  pinMode(air_pin,OUTPUT);
  //starting the server
  server.begin();
}
 
void loop(){
    float temp = dht.readTemperature();
    float humi = dht.readHumidity();
    set_DHT_status(temp,humi);
    get_Homemode_status("Homemode_state");
    get_device_status("air_state");
    get_device_status("air_auto_state");
    if(air_auto == 1 && homemode == 1){//Homemode開啟時，空調自動開關
      if (temp>28 || humi>60){
        digitalWrite(air_pin,HIGH);
      }else{
        digitalWrite(air_pin,LOW);
      }
    }else{//空調手動
      if(air_state == 1 && homemode == 1){
        digitalWrite(air_pin,HIGH);
      }else{
        digitalWrite(air_pin,LOW);
      }
    }
} 
void set_DHT_status(float val,float val2)
  {
        WiFiClient client = server.available();
        HTTPClient http;
        String url = get_host+"/~Iot/Arduino_update_temp_humi.php?temp="+String(val)+"&humi="+String(val2);
        http.begin(url);
        //GET method
        int httpCode = http.GET();
        http.end();
        delay(300);
  }
void get_device_status(String device_name)
  {
        WiFiClient client = server.available();
        HTTPClient http;
        String url = get_host+"/~Iot/Arduino_state.php?device="+device_name;
        http.begin(url);
        //GET method
        int httpCode = http.GET();
        delay(100);
        String str = http.getString();
        if(device_name=="air_auto_state"){
          if(str=="1"){
            air_auto = 1;
          }else{
            air_auto = 0;
          }
        }else if (device_name=="air_state"){
          if(str == "1"){
            air_state = 1;
          }else{
            air_state = 0;
          }
        }
        http.end();
        delay(300);
  }
void get_Homemode_status(String device_name)
  {
        WiFiClient client = server.available();
        HTTPClient http;
        String url = get_host+"/~Iot/Arduino_get_homemode_state.php?device="+device_name;
        http.begin(url);
        //GET method
        int httpCode = http.GET();
        delay(50);
        String str = http.getString();
        if(str=="1"){
          homemode = 1;
          digitalWrite(homemode_pin,HIGH);
        }else{
          homemode = 0;
          digitalWrite(homemode_pin,LOW);
        }
        http.end();
        delay(50);
  }

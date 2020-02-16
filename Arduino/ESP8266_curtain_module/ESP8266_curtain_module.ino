//include libraries
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h> 

//Access point credentials
const char* ssid = "Pixel_2039";
const char* pwd = "00000000";
const char* host = "ip";
String get_host = "ip";
int curtain_auto_pin = 1;
int curtain_motor_pin = 3;
WiFiServer server(80);  // open port 80 for server connection
int homemode = 0;
void setup() 
{
  Serial.begin(115200); //initialise the serial communication
  delay(20);
  WiFi.begin(ssid, pwd);
  pinMode(curtain_auto_pin,OUTPUT);
  pinMode(curtain_motor_pin,OUTPUT);
  //starting the server
  server.begin();
}
 
void loop(){
    get_Homemode_status("Homemode_state");
    get_device_status("curtain_state",curtain_motor_pin);
    get_device_status("curtain_auto_state",curtain_auto_pin);
} 
void get_device_status(String device_name,int gpio)
  {
        WiFiClient client = server.available();
        HTTPClient http;
        String url = get_host+"/~Iot/Arduino_state.php?device="+device_name;
        http.begin(url);
        //GET method
        int httpCode = http.GET();
        delay(50);
        String str = http.getString();
        if(device_name == "curtain_auto_state"){
          if(str=="1" && homemode == 1){
            digitalWrite(gpio,HIGH);
          }else{
            digitalWrite(gpio,LOW);
          }
        }else{
          if(str=="1"){
            digitalWrite(gpio,HIGH);
          }else if(str=="0")
          {
            digitalWrite(gpio,LOW);
          }
        }
        http.end();
        delay(50);
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
        }else{
          homemode = 0;
        }
        http.end();
        delay(50);
  }
void set_device_status(String device_name,int num)
  {
        WiFiClient client = server.available();
        HTTPClient http;
        String url = get_host+"/~Iot/Arduino_update_ALLstate.php?device="+device_name+"&value="+String(num);
        http.begin(url);
        //GET method
        int httpCode = http.GET();
        http.end();
        delay(10);
  }

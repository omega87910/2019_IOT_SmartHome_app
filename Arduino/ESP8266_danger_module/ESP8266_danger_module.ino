//include libraries
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h> 

//Access point credentials
const char* ssid = "Pixel_2039";
const char* pwd = "00000000";
const char* host = "ip";
String get_host = "ip";
int button_read_pin = 1;
int danger_pin = 2;
int danger_state = 0;
WiFiServer server(80);  // open port 80 for server connection
int switch_status = 0;
int cd = 0;
void setup()
{
  Serial.begin(115200); //initialise the serial communication
  delay(20);
  WiFi.begin(ssid, pwd);
  pinMode(danger_pin,OUTPUT);
  pinMode(button_read_pin,INPUT);
  //starting the server
  server.begin();
}
 
void loop(){
    switch_status = digitalRead(button_read_pin);
    if(switch_status == HIGH && cd == 0 ){//若要切換狀態了
      delay(1000);
      cd = 10;
      if(danger_state == 0){
        set_device_status("danger_state",1);
      }else if(danger_state == 1){
        set_device_status("danger_state",0);
      }
    }
    get_device_status("danger_state",danger_pin);
    if(cd > 0){
      cd -= 1;
    }
    delay(500);
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

        if(device_name == "danger_state"){
          if(str=="1"){
            danger_state = 1;
            digitalWrite(gpio,HIGH);
          }else if(str=="0")
          {
            danger_state = 0;
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

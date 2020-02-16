//include libraries
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h> 
 
//Access point credentials
const char* ssid = "Pixel_2039";
const char* pwd = "00000000";
const char* host = "ip";
String get_host = "ip";
int total_num = 0;
int homemode = 0;
int outside_val = 0;    
int inside_val = 0;
int pre_inside_val =0;
int pre_outside_val =0;
int inside_sec = 0;
int outside_sec = 0;
String result = "";
int danger_timeout = 60000;
int danger_time_state = 0 ;
WiFiServer server(80);  // open port 80 for server connection
 
void setup() 
{
  Serial.begin(115200); //initialise the serial communication
  delay(20);
  pinMode(0,OUTPUT);
  pinMode(1,OUTPUT);
  pinMode(2,INPUT);
  pinMode(3,INPUT);
  WiFi.begin(ssid, pwd);
 
   
  //starting the server
  server.begin();
  set_device_status("num",total_num);//初始化人數
}
 
void loop()
{
  inside_val = digitalRead(2);
  outside_val = digitalRead(3);
  get_Homemode_status("Homemode_state");
  get_RGB_status("RGB_state",0,1);
  result = "";
  //進出門增減人數
  if(inside_val== HIGH){
    inside_sec = 500 ;
   }
   if(inside_sec > 0){
    inside_sec-=1;
    pre_inside_val = 1;
    Serial.println("內側有人經過");
    if(pre_outside_val == 1 && result==""){
      Serial.println("判斷入門");
      pre_inside_val = 0;
      pre_outside_val = 0; 
      result="入門";
    }
   }else{
    pre_inside_val = 0;
    Serial.println("內側無人或人靜止不動"); 
   }
   if( outside_val== HIGH){
    outside_sec = 500;
   }
   if(outside_sec > 0){
    outside_sec-=1;
    pre_outside_val = 1;
    Serial.println("外側有人經過");
    if(pre_inside_val == 1 && result==""){
      result="外出";
      pre_inside_val = 0;
      pre_outside_val = 0; 
      Serial.println("判斷外出");
    }
   }else
   {
    pre_outside_val = 0;
    Serial.println("外側無人或人靜止不動"); 
   }
   if (result!=""){
      if(result == "入門"){
        total_num+=1;
        set_device_status("num",total_num);
        if(total_num == 1){
          set_HomeMode_status("Homemode_state",1);
        }
        danger_time_state = 0;
      }
      else if (result=="外出" && total_num > 0){
        total_num-=1;
        set_device_status("num",total_num);
        if(total_num == 0){
          set_HomeMode_status("Homemode_state",0);
          danger_timeout = 60000;
          danger_time_state = 1;
        }
      }
      outside_sec = 0;
      inside_sec = 0;
      pre_outside_val = 0;
      pre_inside_val = 0; 
      delay(3000);
   }
   if(danger_timeout > 0 && danger_time_state == 1){
      danger_timeout -=1;
      if(danger_timeout == 0){
          danger_time_state = 0;  
          set_danger_status("danger_state",0);
      }
   }
   //
   delay(10);
} 
void set_device_status(String device_name,int num)
  {
        WiFiClient client = server.available();
        HTTPClient http;
        String url = get_host+"/~Iot/Arduino_upload.php?"+device_name+"="+String(num);
        http.begin(url);
        //GET method
        int httpCode = http.GET();
        http.end();
        delay(10);
  }
void set_HomeMode_status(String device_name,int num)
  {
        WiFiClient client = server.available();
        HTTPClient http;
        String url = get_host+"/~Iot/Arduino_update_state.php?device="+device_name+"&value="+String(num);
        http.begin(url);
        //GET method
        int httpCode = http.GET();
        http.end();
        delay(10);
  }
void get_RGB_status(String device_name,int gpio_0,int gpio_1)
  {
        WiFiClient client = server.available();
        HTTPClient http;
        String url = get_host+"/~Iot/Arduino_state.php?device="+device_name;
        http.begin(url);
        //GET method
        int httpCode = http.GET();
        delay(10);
        String str = http.getString();
        if(str=="white" && homemode == 1){
          digitalWrite(gpio_0,HIGH);
          digitalWrite(gpio_1,HIGH);
        }else if(str=="yellow" && homemode == 1){
          digitalWrite(gpio_0,LOW);
          digitalWrite(gpio_1,HIGH);  
        }else{
          digitalWrite(gpio_0,LOW);
          digitalWrite(gpio_1,LOW);
        }
        http.end();
        delay(10);
  }
void get_Homemode_status(String device_name)
  {
        WiFiClient client = server.available();
        HTTPClient http;
        String url = get_host+"/~Iot/Arduino_get_homemode_state.php?device="+device_name;
        http.begin(url);
        //GET method
        int httpCode = http.GET();
        delay(10);
        String str = http.getString();
        if(str=="1"){
          homemode = 1;
        }else{
          homemode = 0;
        }
        http.end();
        delay(10);
  }
void set_danger_status(String device_name,int num)
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

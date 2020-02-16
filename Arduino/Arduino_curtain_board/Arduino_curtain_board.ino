#include<Servo.h>
Servo curtain_motor;
Servo toilet_motor;
int light_sensor_pin = A0;
int light_sensor_value = 0;
int curtain_state_pin = 7;
int curtain_state_value = 0;
int curtain_auto_state_pin = 8;
int curtain_auto_state_value = 0;
int homemode_pin = A1;
int homemode = 0;
int IR_pin = 13;
int IR_value = 0;
void setup(){
  Serial.begin(9600);
  pinMode(curtain_state_pin,INPUT);
  pinMode(curtain_auto_state_pin,INPUT);
  pinMode(IR_pin,INPUT);
  pinMode(button_write_pin,OUTPUT);
  curtain_motor.attach(9);
  toilet_motor.attach(10);
}
void loop() {
  light_sensor_value = analogRead(light_sensor_pin);
  curtain_auto_state_value = digitalRead(curtain_auto_state_pin);
  homemode = digitalRead(homemode_pin);
  Serial.println(curtain_auto_state_value);
  Serial.println(light_sensor_value);
  //判斷光強度(0~1023)轉動馬達(0~180)

  //窗簾馬達部分
  if (curtain_auto_state_value == 1){ //如果自動感應
      if (light_sensor_value<500){//感測到強光
          curtain_motor.write(180);
       }else{//弱光或無光
          curtain_motor.write(0);
       }
  }else{//未開啟自動感應
      curtain_state_value = digitalRead(curtain_state_pin);
      if (curtain_state_value == 1){//若開
          curtain_motor.write(180);
       }else{//弱光或無光
          curtain_motor.write(0);
       }
  }
  //
  
  //馬桶馬達部分
  if(homemode == 1){
      IR_value = digitalRead(IR_pin);
      Serial.println("紅外線感測到人:"+String(IR_value));
      if(IR_value == HIGH){//感應到有人
        toilet_motor.write(90);
        delay(3000);
      }else{
        toilet_motor.write(0);
      }
  }else{
        toilet_motor.write(0);
  }
  //
  delay(100);
}

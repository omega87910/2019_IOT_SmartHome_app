//LED亮燈的接腳
int outside_LED = 8;
int inside_LED = 7;
//

//全域變數
int RGB_val = 0;
int RGB_val2 = 0;
//

//ESP8266傳輸給Arduino的接腳
int RGB_from_ESP = A2;
int RGB2_from_ESP = A3;
//

//RGB色溫燈的接腳及HomeMode顏色
#define LEDR 11
#define LEDG 10
#define LEDB 9
int r = 255;
int g = 255;
int b = 255;
//
void setup()
{
   Serial.begin(9600);    //設置傳輸鮑率為9600，這裡要跟軟體設置相一致
   pinMode(outside_LED,OUTPUT);
   pinMode(inside_LED,OUTPUT);
   pinMode(RGB_from_ESP,INPUT);
   pinMode(LEDR, OUTPUT);
   pinMode(LEDG, OUTPUT);
   pinMode(LEDB, OUTPUT);
}

void loop()
{
   RGB_val = digitalRead(RGB_from_ESP);
   RGB_val2 = digitalRead(RGB2_from_ESP);
   //RGB調色
   if(RGB_val == 1 && RGB_val2 == 1){//11 全白
      r = 80;
      g = 20;
      b = 80;
      analogWrite(LEDR,r);
      analogWrite(LEDG,g);
      analogWrite(LEDB,b);
   }else if(RGB_val == 1 && RGB_val2 == 0) {//01 淺黃
      r = 80;
      g = 10;
      b = 0;
      analogWrite(LEDR,r);
      analogWrite(LEDG,g);
      analogWrite(LEDB,b);
   }else{//00 or 10
      analogWrite(LEDR,0);
      analogWrite(LEDG,0);
      analogWrite(LEDB,0);
   }
   //
   
}

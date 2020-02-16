int button_write_HIGH_pin = 4;
int button_write_LOW_pin = 5;
void setup() {
  Serial.begin(9600);
  // put your setup code here, to run once:
  pinMode(button_write_HIGH_pin,OUTPUT);
  pinMode(button_write_LOW_pin,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(button_write_HIGH_pin,HIGH);
  digitalWrite(button_write_LOW_pin,LOW);
}

#!/usr/bin/env python

import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

led_pin = 11

GPIO.setup(led_pin,GPIO.OUT)

GPIO.output(led_pin,True)

time.sleep(5)

GPIO.output(led_pin,False)

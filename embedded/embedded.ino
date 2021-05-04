///
/// @mainpage  CreateAPModeWebServer
///
/// @details  Start WiFi in AP mode and a basic server
/// @n
/// * Start WiFi in in AP mode creating a network that you can connecto to
/// from a PC or SmartPhone. There is a limitation that only ONE device
/// can be connected. Trying to connect to the network with a second client
/// will fail. To connect with a different device, first disconnect the device
/// currently connected.
///
///  * Display a basic web-server to turn the LEDs on and off.
///
/// @n
/// @n @a   Developed with [embedXcode+](http://embedXcode.weebly.com)
///
/// @author   Robert Wessels
/// @date   Mar 08, 2016
/// @version  201
///
/// @copyright  This example code is in the public domain.
///
///
/// @b  Hardware
/// * CC3200 LaunchPad or MSP430/TivaC LaunchPad with CC3200 BoosterPack
/// * Serical console
///
/// @b  History
/// * Created November 2014 by Robert Wessels
/// This example code is in the public domain.
///
/// * Updated 2016-03-08 by Rei Vilo
/// Added basic web-server to turn the LEDs on and off.
///


// Core library for code-sense - IDE-based
#include "Energia.h"


// Include application, user and local libraries

#ifndef __CC3200R1M1RGC__
#include <SPI.h>                // Do not include SPI for CC3200 LaunchPad
#endif
#include <WiFi.h>


// Define structures and classes


// Define variables and constants
char wifi_name[] = "energia";
char wifi_password[] = "launchpad";

char oscilloscope[] = "{OSCILLOSCOPE.HTML}";
char voltmeter[] = "{VOLTMETER.HTML}";
char logic[] = "{LOGIC.HTML}";
char waveform[] = "{WAVEFORM.HTML}";
char power[] = "{POWER.HTML}";
char style[] = "{STYLE.CSS}";
uint8_t img[] = {LOGO.PNG}; 

WiFiServer myServer(80);
uint8_t oldCountClients = 0;
uint8_t countClients = 0;


// Add setup code
void setup()
{
    Serial.begin(115200);
    delay(500);
    
    Serial.println("*** LaunchPad CC3200 WiFi Web-Server in AP Mode");
    
    // Start WiFi and create a network with wifi_name as the network name
    // with wifi_password as the password.
    Serial.print("Starting AP... ");
    WiFi.beginNetwork(wifi_name, wifi_password);
    while (WiFi.localIP() == INADDR_NONE)
    {
        // print dots while we wait for the AP config to complete
        Serial.print('.');
        delay(300);
    }
    Serial.println("DONE");
    
    Serial.print("LAN name = ");
    Serial.println(wifi_name);
    Serial.print("WPA password = ");
    Serial.println(wifi_password);
    
    
    pinMode(RED_LED, OUTPUT);      // set the LED pin mode
    digitalWrite(RED_LED, LOW);
    pinMode(GREEN_LED, OUTPUT);      // set the LED pin mode
    digitalWrite(GREEN_LED, LOW);
    pinMode(YELLOW_LED, OUTPUT);      // set the LED pin mode
    digitalWrite(YELLOW_LED, LOW);
    
    IPAddress ip = WiFi.localIP();
    Serial.print("Webserver IP address = ");
    Serial.println(ip);
    
    Serial.print("Web-server port = ");
    myServer.begin();                           // start the web server on port 80
    Serial.println("80");
    Serial.println();
}

// Add loop code
void loop()
{
    
    countClients = WiFi.getTotalDevices();
    
    // Did a client connect/disconnect since the last time we checked?
    if (countClients != oldCountClients)
    {
        if (countClients > oldCountClients)
        {  // Client connect
            //            digitalWrite(RED_LED, !digitalRead(RED_LED));
            Serial.println("Client connected to AP");
            for (uint8_t k = 0; k < countClients; k++)
            {
                Serial.print("Client #");
                Serial.print(k);
                Serial.print(" at IP address = ");
                Serial.print(WiFi.deviceIpAddress(k));
                Serial.print(", MAC = ");
                Serial.println(WiFi.deviceMacAddress(k));
                Serial.println("CC3200 in AP mode only accepts one client.");
            }
        }
        else
        {  // Client disconnect
            //            digitalWrite(RED_LED, !digitalRead(RED_LED));
            Serial.println("Client disconnected from AP.");
            Serial.println();
        }
        oldCountClients = countClients;
    }
    
    WiFiClient myClient = myServer.available();
    
    if (myClient)
    {                             // if you get a client,
        Serial.println(". Client connected to server");           // print a message out the serial port
        char buffer[150] = {0};                 // make a buffer to hold incoming data

        int8_t i = 0, requestedFile = 0;
        while (myClient.connected())
        {            // loop while the client's connected
            if (myClient.available())
            {             // if there's bytes to read from the client,
                char c = myClient.read();             // read a byte, then
                //Serial.write(c);                    // print it out the serial monitor
                if (c == '\n') {                    // if the byte is a newline character
                    
                    // if the current line is blank, you got two newline characters in a row.
                    // that's the end of the client HTTP request, so send a response:
                    if (strlen(buffer) == 0)
                    {
                        String text = buffer;

                         if (requestedFile > 0 && requestedFile <= 5) {
                          // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
                          // and a content-type so the client knows what's coming, then a blank line:
                          myClient.println("HTTP/1.1 200 OK");
                          myClient.println("Content-type:text/html");
                          myClient.println();

                          // the content of the HTTP response follows the header:
                          if (requestedFile == 1) {
                            // oscilloscope
                            myClient.println(oscilloscope);
                          } else if (requestedFile == 2) {
                            // voltmeter
                            myClient.println(voltmeter);
                          } else if (requestedFile == 3) {
                            // logic analyzer
                            myClient.println(logic);
                          } else if (requestedFile == 4) {
                            // waveform generator
                            myClient.println(waveform);
                          } else if (requestedFile == 5) {
                            // power supply
                            myClient.println(power);
                          }
                        } else if (requestedFile == 6) {
                          // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
                          // and a content-type so the client knows what's coming, then a blank line:
                          myClient.println("HTTP/1.1 200 OK");
                          myClient.println("Content-type:text/css");
                          myClient.println();

                          // the content of the HTTP response follows the header:
                          myClient.println(style);
                        } else if (requestedFile == 7) {
                          myClient.println("HTTP/1.1 200 OK");
                          myClient.println("Content-type:image/png");
                          myClient.println();
                          myClient.write(img, sizeof(img));
                        } else {
                          myClient.println("HTTP/1.1 404 Not Found");
                          myClient.println("Content-type:text/html");
                          myClient.println();
                          myClient.println("404 could not find resource");
                        }
                        
                        // The HTTP response ends with another blank line:
                        myClient.println();
                        // break out of the while loop:
                        break;
                    }
                    else
                    {      // if you got a newline, then clear the buffer:
                        String text = buffer;
                        if (text.startsWith("GET /oscilloscope.html")) {
                          requestedFile = 1;
                        } else if (text.startsWith("GET /voltmeter.html")) {
                          requestedFile = 2;
                        } else if (text.startsWith("GET /logic.html")) {
                          requestedFile = 3;
                        } else if (text.startsWith("GET /waveform.html")) {
                          requestedFile = 4;
                        } else if (text.startsWith("GET /power.html")) {
                          requestedFile = 5;
                        } else if (text.startsWith("GET /css/style.css")) {
                          requestedFile = 6;
                        } else if (text.startsWith("GET /images/logo.png")) {
                          requestedFile = 7;
                        }
                        memset(buffer, 0, 150);
                        i = 0;
                    }
                }
                else if (c != '\r')
                {    // if you got anything else but a carriage return character,
                    buffer[i++] = c;      // add it to the end of the currentLine
                }
            }
        }
        
        // close the connection:
        myClient.stop();
        Serial.println(". Client disconnected from server");
        Serial.println();
    }
}

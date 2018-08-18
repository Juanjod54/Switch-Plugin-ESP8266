# Switch-Plugin-ESP8266

A project to enable IOT on any suitable board by using a Raspberry Pi, a relay and an ESP8266 board.

## Notes
  
  · This project has been tested on a Raspberry Pi 3 B+.
  
  · ESP82266 code can be downloaded and run only with Arduino IDE.
  
  · Since I am not a native speaker, some steps may be poorly written. Any help is welcomed.

## Prerequisites

  · Raspberry must be running Raspbian Jessie.
  
  · SSH connection must be established.
  
  · APT-GET must be updated and upgraded:

  ``` 
    apt-get update  
    apt-get upgrade  
  ```

## 1st Step: Installing Node js.
  
  We will be installing a linux binary. Since we're running Raspbian, we'll use 'Linux Binaries (ARM)'.
  Notice there are three download options. To know which one we should download, we need to type the following command on our     Raspberry Pi:
  ```
  cat /proc/cpuinfo | grep "model name"
  ```
  To download the file we should copy our model's file URL and type on the raspberry's command prompt:
  
  ```
  sudo wget %URL%
  ```
  (%URL% is the file's url)

  We need to unzip the file and copy it to '/usr/local'
  
  ```
  tar -xvf %downloaded node file name%
  cd %unzipped node file name%
  sudo cp * /usr/local/
  ```

## 2nd Step: Installing Mosquitto and Mosquitto's Java Script Library

  First we'll download the key and add it to the key's list:
  
  ```
  sudo wget http://repo.mosquitto.org/debian/mosquitto-repo.gpg.key
  
  sudo apt-key add mosquitto-repo.gpg.key
  ```
  Now we type the following command to enter into the directory:
  
  ```
  cd /etc/apt/sources.list.d/
  ```
  
  Then we download the repositories list.
  
  ```
  sudo wget http://repo.mosquitto.org/debian/mosquitto-jessie.list
  ```

  After that, we install mosquitto and mosquitto-clients
  
  ```
  sudo apt-get install mosquitto
  
  sudo apt-get install mosquito-clients
  ```
  
  Finally, we install the MQTT Java Script library
  
  ```
  npm i mqtt
  ```
  
## 3rd Step: Installing Homebridge.

  Since this part isn't messy, it is better to follow the [creator's guide](https://github.com/nfarina/homebridge)
   
## 4th Step: Downloading source files.
  
  Once we have installed Homebridge, it is time to install our Switch plugin.
  Go ahead and type: 
  ```
  cd /usr/local/lib/node_modules
  ```
  Now you are at the homebridge plugins' path. We need to create a new directory, which is going to be called 'homebridge-relay'. Then we'll enter it.

  ```
  sudo mkdir homebridge-relay
  
  cd homebridge-relay
  ```
  
  Now we'll be downloading the files:
  
  ```
  sudo wget https://raw.githubusercontent.com/Juanjod54/Switch-Plugin-ESP8266/master/index.js
  
  sudo wget https://raw.githubusercontent.com/Juanjod54/Switch-Plugin-ESP8266/master/package.json 
  ```
  
##  5th Step: Setting the plugin.

  We'll edit homebridge's config file, which is located at '~/.homebridge'.
  
  ```
  cd ~/.homebridge
  
  sudo nano config.json
  ```
  
  By adding the following lines, our plugin has been installed and is ready to go!
  **Remember to add a name and a mqttHost, which is the Raspberry's IP Address.**
  
  ```
    {
      "accessory": "relay",
      "name": "",
      "topic": "relay",
      "mqttHost": ""
    }
  ```
  

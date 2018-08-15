# Switch-Plugin-ESP8266

A project to enable IOT on any suitable board by using a Raspberry Pi, a relay and an ESP8266 board.

## Notes
  
  · This project has been tested on a Raspberry Pi 3 B+.
  
  · Since I am not a native speaker, some steps may be poorly written. Any help is welcomed.

## Prerequisites

  · Raspberry must be running Raspbian.
  
  · SSH connection must be established.
  
  · APT-GET must be updated and upgraded:

  ``` 
    apt-get update  
    apt-get upgrade  
  ```

## 1st Step: Installing Node js.
  
  We will be installing a linux binary. Since we're running Raspbian, we'll use 'Linux Binaries (ARM)'.
  Notice there are three options. To know which one we should download, we need to type the following command:
  ```
  cat /proc/cpuinfo | grep "model name"
  ```
  To download the file we should copy the file's URL and type on the raspberry's command prompt:
  
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

## 2nd Step: Installing Homebridge.

  Since this part isn't messy, it is better to follow the [creator's guide] (https://github.com/nfarina/homebridge)
  

## 3rd Step: Downloading source files.
  
  Once we have installed Homebridge, it is time to install our Switch plugin.
  Go ahead and type: 
  ```
  cd /usr/local/lib/node_modules
  ```
  Now you are at the homebridge plugins' path. We need to create a new directory, which is going to be called 'homebridge-relay'

  ```
  sudo mkdir homebridge-relay
  ```
 

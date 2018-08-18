var Service, Characteristic
var exec = require('child_process').exec;
var mqtt = require('mqtt');


module.exports = function (homebridge){
 Service = homebridge.hap.Service;
 Characteristic = homebridge.hap.Characteristic;
 homebridge.registerAccessory("homebridge-relay", "relay", Relay);
}

/*
  Reading data from config file over ~/.homebridge/config.json
*/

function Relay(log, config) {
  this.log = log;

  this.name = config['name'];
  this.topic = config['topic'];
  this.mqttHost = config['mqttHost'];

  this.lastValue = 0;

  this.verifyConfig();
  this.connect();

}


Relay.prototype = {

/*
  Info and details overriding
*/

  getServices: function () {
    let informationService = new Service.AccessoryInformation();
    informationService
      .setCharacteristic(Characteristic.Manufacturer, "Juanjo Daza")
      .setCharacteristic(Characteristic.Model, "V1.0")
      .setCharacteristic(Characteristic.SerialNumber, "No Serial Number");

/*
  We create a new service (a light switch) to manage our relay status (on-off)
*/

    let service = new Service.Lightbulb(this.name);
    service
      .getCharacteristic(Characteristic.On)
      .on('get', (callback) => { this.getValue(callback) })
      .on('set', (value, callback) => { this.setValue(value, callback) });

    return [informationService, service];
  },

/*
  Allows the plugin verify its parameters
*/

  verifyConfig: function () {
      if (!this.name || !this.mqttHost) {
        this.log.error('Product name or mqttHost missing in config.json!');
      }
    },

  /*
    We connect to our mqtt Server
  */
    connect: function() {
      var options = {
        port: 1883,
        host: this.mqttHost,
        clientId: ''
      };

      var client = mqtt.connect(options);

    },

  /*
    This function is called each time the 'Home' app launches
    We answer the "Is it on?" request by checking the lastValue we gave to our relay
  */
    getValue: function (callback) {
        var value = this.lastValue ? true : false;
        return callback(value);
      },

/*
  This function is called each time the 'Home' app launches
  We answer the "Is it on?" request by checking the lastValue we gave to our relay
*/
  getValue: function (callback) {
      var value = this.lastValue ? true : false;
      return callback(value);
    },

/*
  This function runs a mqtt command to publish a new status to our ESP8266
  If everything worked fine, a new 'lastValue' will be stored
*/
   setValue: function (value, callback) {

     var digitalValue = (value) ? 1 : 0;

     exec('mosquitto_pub -t ' + this.topic + ' -m ' + digitalValue,
         function (error, stdout, stderr) {
             if (error !== null) {
                  console.log('exec error: ' + error);
                  return callback(null, false);
             }
          });

    this.lastValue = digitalValue;
    return callback(null, true);

   }

}


const Service, Characteristic;
const request = require('request');
const url = require('url');

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("relay-plugin", "relay", relay);
};

relay.prototype = {
  getServices: function () {
    let informationService = new Service.AccessoryInformation();
    informationService
      .setCharacteristic(Characteristic.Manufacturer, "Juanjo Daza")
      .setCharacteristic(Characteristic.Model, "1.0 Beta 1")
      .setCharacteristic(Characteristic.SerialNumber, "0000001");

    let service = new Service.Switch("relay");
    service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));

    this.informationService = informationService;
    this.switchService = switchService;
    return [informationService, switchService];
  }

  getOn: function (next) {
    const me = this;
    request({
        url: me.getUrl,
        method: 'GET',
    },
    function (error, response, body) {
      if (error) {

        if (statusCode)
          me.log('STATUS: ' + response.statusCode);

        me.log(error.message);
        return next(error);
      }
      return next(null, body.currentState);
    });
  },

  setOn: function (on, next) {
    const me = this;
    request({
      url: me.postUrl,
      body: JSON.stringify({'targetState': on}),
      method: 'POST',
      headers: {'Content-type': 'application/json'}
    },
    function (error, response) {
      if (error) {
        me.log('STATUS: ' + response.statusCode);
        me.log(error.message);
        return next(error);
      }
      return next();
    });
  }

};

function relay(log, config) {
  this.log = log;
  this.getUrl = url.parse(config['getUrl']);
  this.postUrl = url.parse(config['postUrl']);
}

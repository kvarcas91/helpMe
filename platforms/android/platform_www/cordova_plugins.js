cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "mx.ferreyra.callnumber.CallNumber",
      "file": "plugins/mx.ferreyra.callnumber/www/CallNumber.js",
      "pluginId": "mx.ferreyra.callnumber",
      "clobbers": [
        "call"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "mx.ferreyra.callnumber": "0.0.2"
  };
});
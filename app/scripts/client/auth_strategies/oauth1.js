(function() {
  'use strict';

  var Oauth1 = function(scheme, credentials) {
    var tokenFactory = RAML.Client.AuthStrategies.Oauth1.Token.createFactory(scheme.settings, credentials);
    this.requestToken = RAML.Client.AuthStrategies.Oauth1.requestToken(scheme.settings, tokenFactory);
    this.requestAuthorization = RAML.Client.AuthStrategies.Oauth1.requestAuthorization(scheme.settings);
    this.requestTokenCredentials = RAML.Client.AuthStrategies.Oauth1.requestTokenCredentials(scheme.settings, tokenFactory);
  };

  Oauth1.proxyRequest = function(url) {
    if (RAML.Settings.proxy) {
      url = RAML.Settings.proxy + url;
    }

    return url;
  };

  Oauth1.parseUrlEncodedData = function(data) {
    var result = {};

    data.split('&').forEach(function(param) {
      var keyAndValue = param.split('=');
      result[keyAndValue[0]] = keyAndValue[1];
    });

    return result;
  };

  Oauth1.prototype.authenticate = function() {
    return this.requestToken().then(this.requestAuthorization).then(this.requestTokenCredentials);
  };

  RAML.Client.AuthStrategies.Oauth1 = Oauth1;
})();

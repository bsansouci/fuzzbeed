var https = require('https');

var Flickr = function(keys) {
  this.apiKey = keys.api_key;
  this.apiUrl = "https://api.flickr.com/services/rest/?";


  this.get = function(method ,opts, result) {

    api_url = this.apiUrl + "&method=flickr."+ method + "&api_key=" + this.apiKey + "&format=json" + "&nojsoncallback=1";

    for (var item in opts) {
      api_url += "&" + item + "=" + opts[item];
    }
    https.get(api_url, function(res) {
      data = "";
      res.on('data', function(chunk) {
        data += chunk;
      });
      res.on('end', function() {
        var jsonObj = JSON.parse(data);
        result(jsonObj);
      });
    });
  };

  return this;
};

// export the module
module.exports = Flickr;
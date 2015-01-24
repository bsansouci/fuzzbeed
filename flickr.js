var https = require('https');
var async = require("async");
var flatten = require("lodash.flatten");

var base = "https://api.flickr.com/services/rest/?";
var apiKey = process.env.FLICKR_API_KEY;

function get(method ,opts, callback) {
  var api_url = base + "&method=flickr."+ method + "&api_key=" + apiKey + "&format=json" + "&nojsoncallback=1";

  for (var item in opts) {
    api_url += "&" + item + "=" + opts[item];
  }
  var data = "";
  https.get(api_url, function(res) {
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      var jsonObj = JSON.parse(data);
      callback(jsonObj);
    });
  });
}

// we assume we can only pass a string or an array of strings
var findPictures = function(query, callback) {
  if(typeof query === "string") query = [query];

  async.mapLimit(query, 5, function(str, cb) {
    get("photos.search", {"text":str}, function(data){
      var photos = data.photos.photo;
      var arr = [];
      for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];
        var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
        arr.push(url);
      }
      cb(null, arr);
    });
  },function(err, data) {
    if(err) return console.error('findPictures - flickr:', err);

    callback(flatten(data));
  });
};

// export the module
module.exports = findPictures;
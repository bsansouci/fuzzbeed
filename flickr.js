var https = require('https');

var base = "https://api.flickr.com/services/rest/?";
var apiKey = process.env.FLICKR_API_KEY;
function get(method ,opts, callback) {
  var api_url = base + "&method=flickr."+ method + "&api_key=" + apiKey + "&format=json" + "&nojsoncallback=1";

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
      callback(jsonObj);
    });
  });
}

var findPictures = function(text, callback) {
  get("photos.search", {"text":text}, function(data){
    var photos = data.photos.photo;
    var arr = [];
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
      arr.push(url);
    }
    callback(arr);
  });
};

// export the module
module.exports = findPictures;
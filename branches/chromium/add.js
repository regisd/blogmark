var req = new XMLHttpRequest();
$(document).ready(init);

function init() {
req.open(
    "GET",
    "http://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "api_key=90485e931f687a9b9c2a66bf58a3861a&" +
        "text=hello%20world&" +
        "safe_search=1&" +  // 1 is "safe"
        "content_type=1&" +  // 1 is "photos only"
        "sort=relevance&" +  // another good one is "interestingness-desc"
        "per_page=20",
    true);
req.onreadystatechange = function (evt) {
	if (req.readyState == 4) {
	if(req.status == 200)
		showPhotos();
	else
		alert("Error requesting API\n"+evt.target.status);
	}
};
req.send(null);
}

function showPhotos() {
  var photos = req.responseXML.getElementsByTagName("photo");

  for (var i = 0, photo; photo = photos[i]; i++) {
    var img = document.createElement("image");
    img.src = constructImageURL(photo);
    document.body.appendChild(img);
  }
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
}

/*
var req = new XMLHttpRequest();
req.open(
    "GET",
    "http://api.blogmarks.net/"+
		"?object=TagsList ",
    true);
req.onload = showPublicTags;
req.send(null);

function showPublictags() {
  var tags = req.responseXML.getElementsByTagName("photo");

  for (var i = 0, tag; tag = tags[i]; i++) {
    var spanTag = document.createElement("span");
    spanTag.innerHTML = tag;
    document.body.appendChild(img);
  }
}*/
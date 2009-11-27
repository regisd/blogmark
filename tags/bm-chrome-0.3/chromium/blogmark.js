var server = "http://api.blogmarks.net/";
var reqlimit = 15; // 15 items is 3x5 images

// perform JavaScript after the document is scriptable.
$(function() {
	// initially all panes are hidden (CSS trick does not work)
	$("div#panes > div.pane").hide();
	// setup ul.tabs to work as tabs for each div directly under div.panes
	$("ul#tabs").tabs("div#panes > div", {
		effect : "fade",
		fadeOutSpeed : 400,
		onClick : onTabClicked
	});
	getMarks("public");
	getMarks("my");

});

// send message to page when tab "New" is clicked
function onTabClicked(event, tabIndex) {
	if (tabIndex != 2)
		return;
	// tab is "new"
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {
			blogmark : "new"
		}, function(response) {
			console.log("title=" + response.title + "\nurl=" + response.url);
			$("#new-url").val(response.url);
			$("#new-title").val(response.title);
			$("#new-description").val(response.description);
			$("#new-via").val(response.via);
		});
	});
}

/* Returns 15 latest public marks ; or in private marks if my is true */
function getMarks(zone) {
	var req = new XMLHttpRequest();
	if (zone == "my") {
		if (!localStorage["user"]) {
			message("Please set user and password in <a href=\"/options.html\">Options</a>");
			return;
		}
		req.open("GET", server + "marks?last=" + reqlimit + "&author="
				+ localStorage["user"]);
		req.setRequestHeader("X-WSSE", wsseHeader(localStorage["user"],
				localStorage["password"]));
	} else {
		req.open("GET", server + "marks?last=" + reqlimit);
	}
	req.onreadystatechange = function(evt) {
		onresponse(req, evt, function() {
			var marks = req.responseXML.getElementsByTagName("entry");
			showMarks(zone, marks);
		});
	};
	req.send(null);
}

/* display the 15 latest marks, in zone=(my|public) */
function showMarks(zone, marks) {
	var hList = document.getElementById(zone + "-marks");
	var itemMark, url, links, a, img;
	for ( var i = 0, mark; mark = marks[i]; i++) {
		itemMark = document.createElement("li");
		img = document.createElement("img");
		img.setAttribute("alt",
				mark.getElementsByTagName("title")[0].textContent);
		img.setAttribute("height", "84px");
		img.setAttribute("width", "112px");

		a = document.createElement("a");
		a.setAttribute("title",
				mark.getElementsByTagName("title")[0].textContent);
		// get the URL related to this entry (the blogmarked page)
		links = mark.getElementsByTagName("link");
		if (links == null)
			return;
		for ( var j = 0, l; l = links[j]; j++) {
			if (l.getAttribute("rel") == "related") {
				a.setAttribute("href", "#");
				a.setAttribute("onClick", "bmopen(\"" + l.getAttribute("href")
						+ "\");");
			} else if (l.getAttribute("rel") == "enclosure") {
				img.setAttribute("src", l.getAttribute("href"));
			}
		}
		a.appendChild(img);
		itemMark.appendChild(a);
		hList.appendChild(itemMark);
	}
}

function bmopen(url) {
	window.close(); // close extension popup
	window.open(url);// open URL in new tab
}

function getPublicTags() {
	req.open("GET", server + "?object=TagsList ", true);
	req.onreadystatechange = function(evt) {
		onresponse(evt, showPublicTags);
	};
	req.send(null);
}

function showPublictags() {
	var tags = req.responseXML.getElementsByTagName("photo");

	for ( var i = 0, tag; tag = tags[i]; i++) {
		var spanTag = document.createElement("span");
		spanTag.innerHTML = tag;
		document.body.appendChild(img);
	}
}

/* subrouting to handle an Ajax response */
function onresponse(req, evenement, f) {
	if (req.readyState == 4) {
		if (req.status == 200)
			f();
		else
			alert("Error requesting API\n" + evenement.target.status);
	}
}

function saveMark() {
	// TODO
	alert("not implemented yet");
	window.close();
}

/* set nicely a message in a div (with fading) */
function message(msg) {
	$("#status").html(msg);
	$("#status").show();
	setTimeout(function() {
		$("#status").fadeOut("normal");
	}, 2000);
}

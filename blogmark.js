var server = "http://api.blogmarks.net/";
var req = new XMLHttpRequest();

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
	getMarks();

});

// send message to page when tab "New" is clicked
function onTabClicked(event, tabIndex) {
	if (tabIndex != 3)
		return;
	// tab is "new"
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {
			blogmark : "new"
		}, function(response) {
			console.log("title=" + response.title + "\nurl=" + response.url);
			$("#new-url").val(response.url);
			$("#new-title").val(response.title);
			$("#new-descripton").val(response.description);
		});
	});
}

/* Returns 30 latest public marks */
function getMarks() {
	req.open("GET", server + "marks");
	req.onreadystatechange = function(evt) {
		onresponse(evt, showPublicMarks);
	};
	req.send(null);
}

function showPublicMarks() {
	var marks = req.responseXML.getElementsByTagName("entry");
	var publicMarks = document.getElementById("public-marks");
	var u, t, url, links, a;
	for ( var i = 0, mark; mark = marks[i]; i++) {
		var itemMark = document.createElement("li");
		t = mark.getElementsByTagName("title")[0].textContent;
		u = "#";
		a = document.createElement("a");

		a.innerHTML = t;
		// get the URL related to this entry (the blogmarked page)
		links = mark.getElementsByTagName("link"); // TODO check there is at
													// least one
		for ( var j = 0, l; l = links[j]; j++) {
			if (l.getAttribute("rel") == "related") {
				u = l.getAttribute("href");
				break;
			}
		}
		a.setAttribute("href", u);

		itemMark.appendChild(a);
		publicMarks.appendChild(itemMark);
	}
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

function onresponse(evenement, f) {
	if (req.readyState == 4) {
		if (req.status == 200)
			f();
		else
			alert("Error requesting API\n" + evenement.target.status);
	}
}
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.blogmark == "new") {
		console.log("new blogmark for " + document.title);
		var resp = {
			title : document.title,
			url : document.location.href,
			/* encode/decode is the best way to serialize a complex DOMObject */
			description : decodeURIComponent(encodeURIComponent(document
					.getSelection())),
			via : document.referrer
		};
		sendResponse(resp);
	} else {
		sendResponse( {}); // snub them.
	}
});
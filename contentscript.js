chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (sender.tab !=null ) {
      console.log("Message comes from a page, not for me"); 
      sendResponse({blogmark: "ignored"});
      return;
    }
    if (request.blogmark == "new") {
      var select=document.getSelection();
      var resp={title: document.title, 
		url:document.url,
		description:document.getSelection().anchorNode.textContent
	       };
      sendResponse(resp);
    } 
    else {
      sendResponse({title: "Arg"}); // snub them.
    }
    
    console.log("send data about "+resp.title);
  }
);
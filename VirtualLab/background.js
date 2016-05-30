chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  	var activeTab = tabs[0];
  	console.log(activeTab[0].url);
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});

  });
});


chrome.tabs.onCreated.addListener(function(tab) {
    
    console.log("new tab");

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){ 

	        status = changeInfo.status;
	        console.log("status : " + status);

	        console.log(tab.url);

	        if(status === "complete"){
				
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				  	var activeTab = tabs[0];
				  	console.log(activeTab);
				  	var url = activeTab.url;
				  	
				  	console.log(url);

				  	if (!url.startsWith("https://www.google.co.in") && !url.startsWith("chrome://")) {

				  		console.log("close");
				  		chrome.tabs.remove(activeTab.id, function() { });
				  	}

				 });
	        }

	});

    
});
function getURL(response) {
	console.log(response)
	var url = response.match(/(?<=location.replace\(")(.*)(?="\))/gi)[0];

	return url;
}

function request(url, callback) {
	var ajax = new XMLHttpRequest();

	ajax.onreadystatechange = function() {
		if(ajax.readyState === 4 && ajax.status === 200) {
			callback(ajax.responseText);
		}
	}
	ajax.open("GET", url);
	ajax.send();
}

function init() {
	chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
		var url = getURL(data);
		
		request(url, handler);

	    function handler(response) {
	    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			    chrome.tabs.sendMessage(tabs[0].id, response);  
			});
	    }
	});
}

init();
function getID() {
	var externalBtn = document.querySelector(".external-btn");

	if(externalBtn) {
		var id = externalBtn.getAttribute("onclick").match(/\d+/gi)[0];

		return id;
	}
}

function addLinks(links) {
	var imageBlock = document.querySelector(".image-block");
	var result = parseResponse(links);
	var innerBoxList = result.querySelector(".inner-box--list");

	innerBoxList.classList.add("_lostfilm-short-link");
	imageBlock.parentNode.insertBefore(innerBoxList, imageBlock.nextSibling);
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
		
function parseResponse(string) {
	var parse = new DOMParser();

	return parse.parseFromString(string, "text/html");
}

function init() {
	var url = "//www.lostfilm.tv/v_search2.php?a=";
	var id = getID();
	
	request(url + id, handler);

	function handler(data) {
		chrome.runtime.sendMessage(data);
	}
	
	chrome.runtime.onMessage.addListener(function(data) {
		addLinks(data);
	})
}

init();
var summaryText = "";

chrome.browserAction.onClicked.addListener( function() {
  calcSummary();
} );

function calcSummary() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection", protocol: tabs[0].url.split(":")[0] }, function(response){});
  });
}

var context = "selection";
var title = "Get the Jist!";
var id = chrome.contextMenus.create({"title": title, "contexts": [context], "onclick": calcSummary});

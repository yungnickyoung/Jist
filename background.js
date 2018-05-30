var summaryText = ""; // initialize summary text

// called when user clicks context menu item or browser extension icon
function calcSummary() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { // find currently open/active tab
    chrome.tabs.sendMessage(tabs[0].id,
      {
        method: "getSelection",
        protocol: tabs[0].url.split(":")[0] // determine if HTTPS
      },
      function (response) { });
  });
}

// content for context menu item
var context = "selection";
var title = "Get the Jist!";

// create context menu item which summarizes highlighted text when clicked
var id = chrome.contextMenus.create({ "title": title, "contexts": [context], "onclick": calcSummary });

// give browser extension icon same functionality as context menu item
chrome.browserAction.onClicked.addListener(function () {
  calcSummary();
});

/*
JQuery used under the MIT license.
  * For more information, see https://jquery.org/license/

This extension uses the 'Summa' implementation of the TextRank algorithm,
available under the MIT license. Copyright 2014 Summa NLP.
  * For more information, see http://summanlp.github.io/textrank/.
*/

var divDialog = document.createElement('div');
document.body.appendChild(divDialog);
var success;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method == "getSelection") {

    var summaryText = "";
    var divWaitOverlay = document.createElement('div');
    divWaitOverlay.className = 'waitOverlay';
    document.body.appendChild(divWaitOverlay);

    var xhttp = new XMLHttpRequest();
    var url = (request.protocol == "https")
      ? "https://yungnickyoung.pythonanywhere.com"
      : "http://yungnickyoung.pythonanywhere.com";

    var paramsObj = {
      "selText": window.getSelection().toString()
    };

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        summaryText = this.responseText;
      }
      document.body.removeChild(divWaitOverlay);
      updateDivDialog(summaryText);
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(paramsObj));
  }
});

/* Convert the divDialog from an empty div to a pop-up dialog box
 * containing the summarized text retrieved from the server
 * 
 * @param summaryText: summarized text returned from the server
 */
function updateDivDialog(summaryText) {
  divDialog.id = 'jistDialog';
  divDialog.title = 'Jist! Summary';

  if (summaryText == "") {
    summaryText = "An error has occured."; // server shouldn't return empty text
  }

  divDialog.innerHTML = summaryText;
  var winWidth = $(window).width();
  var winHeight = $(window).height();
  $("#jistDialog").dialog({
    autoOpen: false,
    modal: true,
    width: (.7 * winWidth),
    height: (.6 * winHeight),
    minWidth: (.5 * winWidth),
    minHeight: (.5 * winHeight),
    maxWidth: (.9 * winWidth),
    maxHeight: (.9 * winHeight)
  });

  $("#jistDialog").dialog({
    buttons: [
      {
        //text: "OK",
        icon: "ui-icon-check",
        click: function () {
          $(this).dialog("close");
        }
      }
    ]
  });
  $("#jistDialog").dialog({ show: { effect: "fade", duration: 400 } });
  $("#jistDialog").dialog("open");
}

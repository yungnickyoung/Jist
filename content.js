/*
JQuery used under the MIT license.
  * For more information, see https://jquery.org/license/

This extension uses the 'Summa' implementation of the TextRank algorithm,
available under the MIT license. Copyright 2014 Summa NLP.
  * For more information, see http://summanlp.github.io/textrank/.
*/

var div1 = document.createElement( 'div' );
document.body.appendChild(div1);
var summaryText = "";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection") {

    var div2 = document.createElement( 'div' );
    div2.className = 'waitOverlay';
    document.body.appendChild(div2);

    var xhttp = new XMLHttpRequest();
    var url = "";
    if (request.protocol == "https") {
      url = "https://yungnickyoung.pythonanywhere.com";
    }
    else {
      url = "http://yungnickyoung.pythonanywhere.com";
    }
    var paramsObj = {"selText" : window.getSelection().toString()};
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        summaryText = this.responseText;
        document.body.removeChild(div2);
        _update(summaryText);
      }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(paramsObj));
  }
});

function _update(sumtxt) {
  div1.id = 'jistDialog';
  div1.title = 'Jist! Summary';
  if (sumtxt == "") {sumtxt = "An error has occured.";}
  div1.innerHTML = sumtxt;
  var winWidth = $(window).width();
  var winHeight = $(window).height();
  $( "#jistDialog" ).dialog({
                              autoOpen: false,
                              modal: true,
                              width: (.7 * winWidth),
                              height: (.6 * winHeight),
                              minWidth: (.5 * winWidth),
                              minHeight: (.5 * winHeight),
                              maxWidth: (.9 * winWidth),
                              maxHeight: (.9 * winHeight)
                            });
  $( "#jistDialog" ).dialog({
    buttons: [
      {
        //text: "OK",
        icon: "ui-icon-check",
        click: function() {
          $( this ).dialog( "close" );
        }
      }
    ]
  });
  $( "#jistDialog" ).dialog({ show: {effect: "fade", duration: 400} });
  $( "#jistDialog" ).dialog( "open" );
}

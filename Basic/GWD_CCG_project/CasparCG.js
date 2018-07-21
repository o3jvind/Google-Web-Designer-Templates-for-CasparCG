/*
*   Data sent from CasparCG Client as templateData
*   is pushed into corresponding HTML id element
*
*   Usage:
*   insert a script reference in the HTML template header.
*   ex: <script type="text/javascript" src="CasparCG.js"></script>
*   Make sure that the id that you refer to is the innermost tag.
*   Everything within that tag id will be replaced by the value sent from CasparCG
*
*   put together by Tomas Linden
*   modified by Øjvind Søgaard Andersen
*
   Structure of data sent from CasparCG:
   <templateData>
      <componentData id="#idCaspar#">
         <data id="text" value="#valCaspar#" />
      </componentData>
      :
      :
      <componentData id="#idCaspar#">
         <data id="text" value="#valCaspar#" />
      </componentData>
   </templateData>
*/
// Global variable for data from CasparCG
var dataCaspar = {};

// Replace characters that could become a problem if left as is
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Parse templateData into an XML object
function parseCaspar(str) {
  var xmlDoc;
  if (window.DOMParser) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(str, "text/xml");
  }
  dataCaspar = XML2JSON(xmlDoc.documentElement.childNodes);
}


// Make the XML templateData message into a more simple key:value object
function XML2JSON(node) {
  var data = {}; // resulting object
  for (k = 0; k < node.length; k++) {
    var idCaspar = node[k].getAttribute("id");
    var valCaspar = node[k].childNodes[0].getAttribute("value");
    if (idCaspar != undefined && valCaspar != undefined) {
      data[idCaspar] = valCaspar;
    };
  }
  return data;
}

// Main function to insert data
function dataInsert(dataCaspar) {
  for (var idCaspar in dataCaspar) {
    var idTemplate = document.getElementById(idCaspar);
    if (idTemplate != undefined) {
      idTemplate.innerHTML = escapeHtml(dataCaspar[idCaspar]);
    }
  }
}

// Call for a update of data from CasparCG client
function update(str) {
  parseCaspar(str); // Parse templateData into an XML object
  dataInsert(dataCaspar); // Insert data
}

// insert data from CasparCg client when activated
function play(str) {
  parseCaspar(str); // Parse templateData into an XML object
  dataInsert(dataCaspar); // Insert data
}

// Call for a next from CasparCG client
function next() {
  gwd.actions.timeline.play('document.body');
}

// Call for a stop from CasparCG client
function stop() {
  gwd.actions.timeline.gotoAndPlay('document.body', 'stop');
}

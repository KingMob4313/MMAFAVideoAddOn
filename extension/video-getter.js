// JavaScript source code
document.body.textContent = "";

var jsonData = JSON.parse(getJsonFrom("window.playerConfig"));

//"progressive" node then "mime": "video/mp4" and then get "url": "https://vod-progressive.akamaized.net/..." is what you want!
let linkHeader = document.createElement('h1');
linkHeader.textContent = "Here is the url:";
document.body.appendChild(linkHeader);

function getJsonFrom(jsonInfo) {
    var xyz = window.playerConfig.request.files.progressive.filter(m => m.profile == "169");
    if (xyz.length > 0) {
        // attach the current document URL to the anchor element
        $("#tabPanelsDiv").attr("href", xyz[0].url);
        $("#alertBox").dialog({
            title: "Create duplicate tab ?",
            minWidth: 200
        });
    }
    return xyz;
}
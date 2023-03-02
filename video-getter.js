// JavaScript source code
document.body.textContent = "";

var jsonData = JSON.parse(getJsonFrom("window.playerConfig"));

//"progressive" node then "mime": "video/mp4" and then get "url": "https://vod-progressive.akamaized.net/..." is what you want!
let linkHeader = document.createElement('h1');
linkHeader.textContent = "Here is the url:";
document.body.appendChild(linkHeader);

function getJsonFrom(jsonInfo) {
    var videoUrl = "";
    console.log("getJsonCalled");
    for (var i = 0; i < jsonInfo.progressive.length; i++) {
        if (progressive.quality == "1080p") {
            var videoPackage = jsonData.progressive[i];
            console.log(videoPackage.url);
            videoUrl = videoPackage.url;
        }
    }
    return videoUrl;
}
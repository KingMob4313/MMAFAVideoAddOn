// JavaScript source code
browser.contextMenus.create({
    id: "get1080Video",
    title: "Get MMAFA Video"
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "get1080Video") {
        alert("lol");
        browser.tabs.executeScript({
            file: "video-getter.js"
        });
    }
});
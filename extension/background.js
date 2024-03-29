/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
    if (browser.runtime.lastError) {
        console.debug(`Error: ${browser.runtime.lastError}`);
    } else {
        console.debug("Item created successfully");
    }
    console.clear();
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
    console.debug("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
    console.debug(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.menus.create({
    id: "log-selection",
    title: browser.i18n.getMessage("menuItemSelectionLogger"),
    contexts: ["selection"]
}, onCreated);

browser.menus.create({
    id: "remove-me",
    title: browser.i18n.getMessage("menuItemRemoveMe"),
    contexts: ["all"]
}, onCreated);

browser.menus.create({
    id: "separator-1",
    type: "separator",
    contexts: ["all"]
}, onCreated);

browser.menus.create({
    id: "greenify",
    type: "radio",
    title: browser.i18n.getMessage("menuItemGreenify"),
    contexts: ["all"],
    checked: true,
    icons: {
        "16": "icons/paint-green-16.png",
        "32": "icons/paint-green-32.png"
    }
}, onCreated);

browser.menus.create({
    id: "bluify",
    type: "radio",
    title: browser.i18n.getMessage("menuItemBluify"),
    contexts: ["all"],
    checked: false,
    icons: {
        "16": "icons/paint-blue-16.png",
        "32": "icons/paint-blue-32.png"
    }
}, onCreated);

browser.menus.create({
    id: "getVideoLink",
    type: "radio",
    title: "Get Video Link",
    contexts: ["all"],
    checked: false,
    icons: {
        "16": "icons/paint-blue-16.png",
        "32": "icons/paint-blue-32.png"
    }
}, onCreated);

browser.menus.create({
    id: "separator-2",
    type: "separator",
    contexts: ["all"]
}, onCreated);

let checkedState = true;

browser.menus.create({
    id: "check-uncheck",
    type: "checkbox",
    title: browser.i18n.getMessage("menuItemUncheckMe"),
    contexts: ["all"],
    checked: checkedState
}, onCreated);

browser.menus.create({
    id: "open-sidebar",
    title: browser.i18n.getMessage("menuItemOpenSidebar"),
    contexts: ["all"],
    command: "_execute_sidebar_action"
}, onCreated);

browser.menus.create({
    id: "tools-menu",
    title: browser.i18n.getMessage("menuItemToolsMenu"),
    contexts: ["tools_menu"],
}, onCreated);

/*
Set a colored border on the document in the given tab.
Note that this only work on normal web pages, not special pages
like about:debugging.
*/
let blue = 'document.body.style.border = "5px solid blue"';
let green = 'document.body.style.border = "5px solid green"';

function borderify(tabId, color) {
    browser.tabs.executeScript(tabId, {
        code: color
    });
}

/*
Toggle checkedState, and update the menu item's title
appropriately.
Note that we should not have to maintain checkedState independently like
this, but have to because Firefox does not currently pass the "checked"
property into the event listener.
*/
function updateCheckUncheck() {
    checkedState = !checkedState;
    if (checkedState) {
        browser.menus.update("check-uncheck", {
            title: browser.i18n.getMessage("menuItemUncheckMe"),
        });
    } else {
        browser.menus.update("check-uncheck", {
            title: browser.i18n.getMessage("menuItemCheckMe"),
        });
    }
}

function getJsonFrom(jsonInfo) {
    var videoUrl = "";
    console.debug("getJsonCalled");
    for (var i = 0; i < jsonInfo.progressive.length; i++) {
        if (progressive.quality == "1080p") {
            var videoPackage = jsonData.progressive[i];
            console.debug(videoPackage.url);
            videoUrl = videoPackage.url;
        }
    }
    return videoUrl;
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "log-selection":
            console.debug(info.selectionText);
            break;
        case "remove-me":
            let removing = browser.menus.remove(info.menuItemId);
            removing.then(onRemoved, onError);
            break;
        case "bluify":
            borderify(tab.id, blue);
            break;
        case "greenify":
            borderify(tab.id, green);
            break;
        case "check-uncheck":
            updateCheckUncheck();
            break;
        case "open-sidebar":
            console.debug("Opening my sidebar");
            break;
        case "getVideoLink":
            console.debug("Getting Video Link");
            getJsonFrom(this.window.playerConfig);
        case "tools-menu":
            console.debug("Clicked the tools menu item");
            break;
    }
});

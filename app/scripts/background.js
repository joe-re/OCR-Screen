let id = 100;
let store = [];

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.captureVisibleTab(function(screenshotUrl) {
    let viewTabUrl = chrome.extension.getURL('ocr-screen.html?id=' + id);
    let targetId = null;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      if (tabId != targetId || changedProps.status != "complete")
        return;

      chrome.tabs.onUpdated.removeListener(listener);

      let views = chrome.extension.getViews();
      for (let i = 0; i < views.length; i++) {
        let view = views[i];
        if (view.location.href == viewTabUrl) {
          store.push({ id: id, url: screenshotUrl });
          id++;
          break;
        }
      }
    });

    chrome.tabs.create({url: viewTabUrl}, function(tab) {
      targetId = tab.id;
    });
  });
});

function saveToClipboard(str) {
    var textArea = document.createElement("textarea");
    textArea.style.cssText = "position:absolute;left:-100%";

    document.body.appendChild(textArea);

    textArea.value = str;
    textArea.select();
    document.execCommand("copy");

    document.body.removeChild(textArea);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.text) {
      console.log(request);
      saveToClipboard(request.text);
    }

    for (let item of store) {
      if (item.id === request) {
        sendResponse(item);
        return;
      }
    }
    sendResponse(null);
  }
);

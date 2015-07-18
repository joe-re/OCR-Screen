let id = 100;

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.captureVisibleTab(function(screenshotUrl) {
    let viewTabUrl = chrome.extension.getURL('ocr-screen.html?id=' + id++)
    let targetId = null;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      if (tabId != targetId || changedProps.status != "complete")
        return;

      chrome.tabs.onUpdated.removeListener(listener);

      let views = chrome.extension.getViews();
      for (let i = 0; i < views.length; i++) {
        let view = views[i];
        if (view.location.href == viewTabUrl) {
          view.setScreenshotUrl(screenshotUrl);
          break;
        }
      }
    });

    chrome.tabs.create({url: viewTabUrl}, function(tab) {
      targetId = tab.id;
    });
  });
});

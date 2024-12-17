chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.tabs.get(details.tabId, tab => {
        console.log(`URL: ${tab.url}`);
        chrome.runtime.sendMessage({ url: tab.url });
    });
});

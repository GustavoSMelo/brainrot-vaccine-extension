'use strict';

const blockerWebsite = (tabId: number) => {
    setTimeout(() => {
        chrome.tabs.remove(tabId);
    }, 1000);
};

export default blockerWebsite;

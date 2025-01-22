'use strict';

const blockerWebsite = (tabId: number) => {
    setTimeout(() => {
        chrome.tabs.remove(tabId);
    }, 500);
};

export default blockerWebsite;

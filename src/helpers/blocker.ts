'use strict';

const blockerWebsite = (tabId: number) => {
    chrome.tabs.remove(tabId);
};

export default blockerWebsite;

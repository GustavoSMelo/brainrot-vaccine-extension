'use strict';

const getCurrentTabURL = async (): Promise<{
    tabURL: string;
    tabId: number;
}> => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                reject("There is not active tab");

                return;
            }

            resolve({ tabURL: tabs[0].url ?? "", tabId: tabs[0].id ?? 999999 });
        });
    });
};

export default getCurrentTabURL;

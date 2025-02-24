import blockerWebsite from "../helpers/blocker";
import {
    adultContentInitialState,
    AiChatInitialState,
    betsInitialState,
    customWebsitesInitialState,
    socialMediasInitialState,
} from "../helpers/initialStates";
import { isURLBlocked } from "../helpers/websites";

const checkAndBlockWebsite = async (tabId: number, url: string) => {
    const isUrlBlocked = await isURLBlocked(url);
    if (isUrlBlocked) {
        blockerWebsite(tabId);
    }
};

// Listen for committed navigation (full page reload or navigation)
chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId === 0) {
        checkAndBlockWebsite(details.tabId, details.url);
    }
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (details.frameId === 0) {
        checkAndBlockWebsite(details.tabId, details.url);
    }
});

chrome.runtime.onInstalled.addListener(async () => {
    await chrome.storage.sync.set({
        socialMediasBlocked: [...socialMediasInitialState],
    });
    await chrome.storage.sync.set({
        adultContentBlocked: [...adultContentInitialState],
    });
    await chrome.storage.sync.set({
        betsBlocked: [...betsInitialState],
    });
    await chrome.storage.sync.set({
        AiChatBlocked: [...AiChatInitialState],
    });
    await chrome.storage.sync.set({
        customWebsites: [...customWebsitesInitialState],
    });
});

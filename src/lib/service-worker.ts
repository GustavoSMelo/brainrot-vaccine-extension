import blockerWebsite from "../helpers/blocker";
import getCurrentTabURL from "../helpers/getCurrentTab";
import {
    adultContentInitialState,
    betsInitialState,
    socialMediasInitialState,
} from "../helpers/initialStates";
import { isURLBlocked } from "../helpers/websites";

chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.tabs.get(details.tabId, async (tab) => {
        console.log(tab);
        const { tabURL, tabId }: { tabURL: string; tabId: number } =
            await getCurrentTabURL();

        console.log(`Vue URL: ${tabURL}`);
        console.log(`BlockedURL: ${isURLBlocked(tabURL)}`);

        if (isURLBlocked(tabURL)) {
            blockerWebsite(tabId);
        }

        console.log(`Passed`);
    });
});

chrome.runtime.onInstalled.addListener(async () => {
    // await chrome.storage.sync.set({ websites });
    await chrome.storage.sync.set({
        socialMediasBlocked: [...socialMediasInitialState],
    });
    await chrome.storage.sync.set({
        adultContentBlocked: [...adultContentInitialState],
    });
    await chrome.storage.sync.set({
        betsBlocked: [...betsInitialState],
    });
});

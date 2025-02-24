"use strict";

import { IRestricted, IRestrictedCustom } from "../interfaces/restricted";

const getSocialMediasBlocked = async (): Promise<Array<IRestricted>> => {
    const helper = await chrome.storage.sync.get("socialMediasBlocked");

    return helper.socialMediasBlocked as Array<IRestricted>;
};

const getAdultContentBlocked = async (): Promise<Array<IRestricted>> => {
    const helper = await chrome.storage.sync.get("adultContentBlocked");

    return helper.adultContentBlocked as Array<IRestricted>;
};

const getBetsBlocked = async (): Promise<Array<IRestricted>> => {
    const helper = await chrome.storage.sync.get("betsBlocked");

    return helper.betsBlocked as Array<IRestricted>;
};

const getAIChatBlocked = async (): Promise<Array<IRestricted>> => {
    const helper = await chrome.storage.sync.get("AiChatBlocked");

    return helper.AiChatBlocked as Array<IRestricted>;
};

const getCustomWebsitesBlocked = async (): Promise<Array<IRestrictedCustom>> => {
    const helper = await chrome.storage.sync.get("customWebsites") ?? [];

    return helper.customWebsites as Array<IRestrictedCustom>;
};

export {
    getSocialMediasBlocked,
    getAdultContentBlocked,
    getBetsBlocked,
    getAIChatBlocked,
    getCustomWebsitesBlocked,
};

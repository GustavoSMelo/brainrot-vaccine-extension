"use strict";

import { IRestricted } from "../interfaces/restricted";

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

export { getSocialMediasBlocked, getAdultContentBlocked, getBetsBlocked };

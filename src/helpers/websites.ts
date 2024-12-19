import TiktokLogo from "../assets/tiktok.svg";
import InstagramLogo from "../assets/instagram.svg";
import YoutubeLogo from "../assets/youtube.svg";
import TwitterLogo from "../assets/twitter.svg";
import TelegramLogo from "../assets/telegram.svg";

import XvideosLogo from "../assets/xvd.svg";
import PornhubLogo from "../assets/prnhb.svg";
import OnlyfansLogo from "../assets/onlyfans.svg";
import CameraPriveLogo from "../assets/cameraprive.jpg";
import EroMeLogo from "../assets/erome.svg";

import Bet365Logo from "../assets/bet365.png";
import BetfairLogo from "../assets/betfair.png";
import BetanoLogo from "../assets/betano.jpg";
import TigrinhoLogo from "../assets/tigrinho.jpg";
import KTOLogo from "../assets/TKO.png";
import BlazeLogo from "../assets/blaze.webp";

import {
    getAdultContentBlocked,
    getBetsBlocked,
    getSocialMediasBlocked,
} from "../helpers/getSyncStorageDatas";

import { ref } from "vue";
import { adultContentInitialState, betsInitialState, socialMediasInitialState } from "./initialStates";

const socialMediasBlockeds = ref([ ...socialMediasInitialState ]);
const adultContentBlocked = ref([ ...adultContentInitialState ]);
const betsBlocked = ref([ ...betsInitialState ]);

const startSyncData = async () => {
    const socialMediasHelper = await getSocialMediasBlocked();
    const adultMediasHelper = await getAdultContentBlocked();
    const betsBlockedHelper = await getBetsBlocked();

    console.log(socialMediasHelper);
    console.log(adultMediasHelper);
    console.log(betsBlockedHelper);

    socialMediasBlockeds.value = socialMediasHelper;
    adultContentBlocked.value = adultMediasHelper;
    betsBlocked.value = betsBlockedHelper;
};

const isRestrictedSocialMedia = (siteName: string) => {
    const site = socialMediasBlockeds.value.find(
        (site) => site.siteName === siteName
    );

    if (!site) {
        console.error("error");
        return false;
    }

    return site.restricted;
};

const isRestrictedBets = (siteName: string) => {
    const site = betsBlocked.value.find((site) => site.siteName === siteName);

    if (!site) {
        console.error("error");
        return false;
    }

    return site.restricted;
};

const isRestrictedAdultContent = (siteName: string) => {
    const site = adultContentBlocked.value.find(
        (site) => site.siteName === siteName
    );

    if (!site) {
        console.error("error");
        return false;
    }

    return site.restricted;
};

const handleChangeRestrictionSocialMedia = async (siteName: string) => {
    const site = socialMediasBlockeds.value.find(
        (site) => site.siteName === siteName
    );

    if (!site) {
        console.error("error");
        return;
    }

    site.restricted = !site.restricted;

    socialMediasBlockeds.value.find(
        (site) => site.siteName === siteName
    )!.restricted = site.restricted;

    await chrome.storage.sync.set({ socialMediasBlockeds });
};

const handleChangeRestrictionAdultContent = async (siteName: string) => {
    const site = adultContentBlocked.value.find(
        (site) => site.siteName === siteName
    );

    if (!site) {
        console.error("error");
        return;
    }

    site.restricted = !site.restricted;

    adultContentBlocked.value.find(
        (site) => site.siteName === siteName
    )!.restricted = site.restricted;
    await chrome.storage.sync.set({ adultContentBlocked });
};

const handleChangeRestrictionBets = async (siteName: string) => {
    const site = betsBlocked.value.find((site) => site.siteName === siteName);

    if (!site) {
        console.error("error");
        return;
    }

    site.restricted = !site.restricted;

    betsBlocked.value.find((site) => site.siteName === siteName)!.restricted =
        site.restricted;

    await chrome.storage.sync.set({ betsBlocked });
};

const isURLBlocked = (websiteURL: string): boolean => {
    let isBlocked = false;
    let helper = false;

    console.log(`websiteURL: ${websiteURL}`);

    helper = websites.adultContent.find((ac) => {
        return (
            websiteURL.toLowerCase().startsWith(ac.siteURL.toLowerCase()) &&
            isRestrictedAdultContent(ac.siteName)
        );
    })
        ? true
        : false;

    console.log(`helper02: ${helper}`);

    if (helper) isBlocked = true;

    helper = websites.bets.find((bet) => {
        return (
            websiteURL.toLowerCase().startsWith(bet.siteURL.toLowerCase()) &&
            isRestrictedBets(bet.siteName)
        );
    })
        ? true
        : false;

    console.log(`helper03: ${helper}`);

    if (helper) isBlocked = true;

    helper = websites.socialMedias.find((sm) => {
        return (
            websiteURL.toLowerCase().startsWith(sm.siteURL.toLowerCase()) &&
            isRestrictedSocialMedia(sm.siteName)
        );
    })
        ? true
        : false;

    console.log(`helper04: ${helper}`);

    if (helper) isBlocked = true;

    return isBlocked;
};

const websites = {
    socialMedias: [
        {
            siteName: "Tiktok",
            siteURL: "https://www.tiktok.com/",
            logo: TiktokLogo,
        },
        {
            siteName: "Instagram",
            siteURL: "https://www.instagram.com/",
            logo: InstagramLogo,
        },
        {
            siteName: "Instagram (reels)",
            siteURL: "https://www.instagram.com/reels/",
            logo: InstagramLogo,
        },
        {
            siteName: "Twitter / X",
            siteURL: "https://x.com/",
            logo: TwitterLogo,
        },
        {
            siteName: "Telegram",
            siteURL: "https://web.telegram.org/",
            logo: TelegramLogo,
        },
        {
            siteName: "Youtube (Shorts)",
            siteURL: "https://www.youtube.com/shorts/",
            logo: YoutubeLogo,
        },
    ],
    adultContent: [
        {
            siteName: "Xvideos",
            siteURL: "https://www.xvideos.com/",
            logo: XvideosLogo,
        },
        {
            siteName: "PornHub PT",
            siteURL: "https://pt.pornhub.com/",
            logo: PornhubLogo,
        },
        {
            siteName: "PornHub",
            siteURL: "https://www.pornhub.com/",
            logo: PornhubLogo,
        },
        {
            siteName: "CameraPrive",
            siteURL: "https://www.cameraprive.com/",
            logo: CameraPriveLogo,
        },
        {
            siteName: "OnlyFans",
            siteURL: "https://www.onlyfans.com/",
            logo: OnlyfansLogo,
        },
        {
            siteName: "EroMe",
            siteURL: "https://www.erome.com/",
            logo: EroMeLogo,
        },
    ],
    bets: [
        {
            siteName: "Bet365",
            siteURL: "https://www.bet365.com/",
            logo: Bet365Logo,
        },
        {
            siteName: "Betano BR",
            siteURL: "https://br.betano.com/",
            logo: BetanoLogo,
        },
        {
            siteName: "Betano",
            siteURL: "https://www.betano.com/",
            logo: BetanoLogo,
        },
        {
            siteName: "Tigrinho",
            siteURL: "https://www.cassinopix.com/",
            logo: TigrinhoLogo,
        },
        {
            siteName: "Betfair",
            siteURL: "https://www.betfair.com/",
            logo: BetfairLogo,
        },
        {
            siteName: "KTO",
            siteURL: "https://www.kto.com/",
            logo: KTOLogo,
        },
        {
            siteName: "Blaze",
            siteURL: "https://www.blaze.com/",
            logo: BlazeLogo,
        },
        {
            siteName: "Blaze Space1",
            siteURL: "https://blaze1.space/",
            logo: BlazeLogo,
        },
    ],
};

export {
    websites,
    isRestrictedSocialMedia,
    isRestrictedAdultContent,
    isRestrictedBets,
    handleChangeRestrictionAdultContent,
    handleChangeRestrictionBets,
    handleChangeRestrictionSocialMedia,
    isURLBlocked,
    startSyncData,
};

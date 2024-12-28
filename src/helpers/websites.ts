import TiktokLogo from "../assets/tiktok.svg";
import InstagramLogo from "../assets/instagram.svg";
import YoutubeLogo from "../assets/youtube.svg";
import TwitterLogo from "../assets/twitter.svg";
import TelegramLogo from "../assets/telegram.svg";
import TwitchLogo from '../assets/twitch.svg';
import RedditLogo from '../assets/reddit.svg';

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
import {
    adultContentInitialState,
    betsInitialState,
    socialMediasInitialState,
} from "./initialStates";

const socialMediasBlockeds = ref([...socialMediasInitialState]);
const adultContentBlocked = ref([...adultContentInitialState]);
const betsBlocked = ref([...betsInitialState]);

const startSyncData = async () => {
    const socialMediasHelper = await getSocialMediasBlocked();
    const adultMediasHelper = await getAdultContentBlocked();
    const betsBlockedHelper = await getBetsBlocked();

    socialMediasBlockeds.value = [...socialMediasHelper];
    adultContentBlocked.value = [...adultMediasHelper];
    betsBlocked.value = [...betsBlockedHelper];
};

const isRestrictedSocialMedia = async (siteName: string) => {
    await startSyncData();
    const site = socialMediasBlockeds.value.find(
        (site) => site.siteName === siteName && site.restricted
    );

    if (!site || site === null || site === undefined) {
        return false;
    }

    return site.restricted;
};

const isRestrictedBets = async (siteName: string) => {
    await startSyncData();
    const site = betsBlocked.value.find(
        (site) => site.siteName === siteName && site.restricted
    );

    if (!site || site === null || site === undefined) {
        return false;
    }

    return site.restricted;
};

const isRestrictedAdultContent = async (siteName: string) => {
    await startSyncData();
    const site = adultContentBlocked.value.find(
        (site) => site.siteName.toLowerCase() === siteName.toLowerCase() && site.restricted
    );

    if (!site || site === null || site === undefined) {
        return false;
    }

    return site.restricted;
};

const handleChangeRestrictionSocialMedia = async (siteName: string) => {
    const site = socialMediasBlockeds.value.find(
        (site) => site.siteName === siteName
    );

    if (!site || site === null || site === undefined) {
        console.error("error");
        return;
    }

    site.restricted = !site.restricted;

    socialMediasBlockeds.value.find(
        (site) => site.siteName === siteName
    )!.restricted = site.restricted;

    await chrome.storage.sync.set({
        socialMediasBlocked: [...socialMediasBlockeds.value],
    });
};

const handleChangeRestrictionAdultContent = async (siteName: string) => {
    const site = adultContentBlocked.value.find(
        (site) => site.siteName === siteName
    );

    if (!site || site === null || site === undefined) {
        console.error("error");
        return;
    }

    site.restricted = !site.restricted;

    adultContentBlocked.value.find(
        (site) => site.siteName === siteName
    )!.restricted = site.restricted;

    await chrome.storage.sync.set({
        adultContentBlocked: [...adultContentBlocked.value],
    });
};

const handleChangeRestrictionBets = async (siteName: string) => {
    const site = betsBlocked.value.find((site) => site.siteName === siteName);

    if (!site || site === null || site === undefined) {
        console.error("error");
        return;
    }

    site.restricted = !site.restricted;

    betsBlocked.value.find((site) => site.siteName === siteName)!.restricted =
        site.restricted;

    await chrome.storage.sync.set({ betsBlocked: [...betsBlocked.value] });
};

const isURLBlocked = async (websiteURL: string): Promise<boolean> => {
    for (const ac of websites.adultContent) {
        if (
            websiteURL.toLowerCase().startsWith(ac.siteURL.toLowerCase()) &&
            await isRestrictedAdultContent(ac.siteName)
        ) {
            return true;
        }
    }

    for (const bet of websites.bets) {
        if (
            websiteURL.toLowerCase().startsWith(bet.siteURL.toLowerCase()) &&
            await isRestrictedBets(bet.siteName)
        ) {
            return true;
        }
    }

    for (const sm of websites.socialMedias) {
        if (
            websiteURL.toLowerCase().startsWith(sm.siteURL.toLowerCase()) &&
            await isRestrictedSocialMedia(sm.siteName)
        ) {
            return true;
        }
    }

    return false;
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
        {
            siteName: "Youtube",
            siteURL: "https://www.youtube.com/",
            logo: YoutubeLogo
        },
        {
            siteName: "Twitch",
            siteURL: "https://www.twitch.tv",
            logo: TwitchLogo,
        },
        {
            siteName: "Reddit",
            siteURL: "https://www.reddit.com",
            logo: RedditLogo
        }
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
            siteURL: "https://cameraprive.com/",
            logo: CameraPriveLogo,
        },
        {
            siteName: "OnlyFans",
            siteURL: "https://onlyfans.com/",
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
            siteURL: "https://cassinopix.com/",
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
            siteURL: "https://blaze.com/",
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

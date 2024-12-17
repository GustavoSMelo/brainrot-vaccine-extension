import TiktokLogo from "../assets/tiktok.svg";
import InstagramLogo from "../assets/instagram.svg";
import YoutubeLogo from "../assets/youtube.svg";
import TwitterLogo from "../assets/twitter.svg";
import TelegramLogo from "../assets/telegram.svg";

import XvideosLogo from "../assets/xvd.svg";
import PornhubLogo from "../assets/prnhb.svg";
import OnlyfansLogo from "../assets/onlyfans.svg";

import Bet365Logo from "../assets/bet365.png";
import BetfairLogo from "../assets/betfair.png";
import BetanoLogo from "../assets/betano.jpg";
import TigrinhoLogo from "../assets/tigrinho.jpg";
import KTOLogo from "../assets/TKO.png";
import BlazeLogo from "../assets/blaze.webp";

import { ref } from "vue";

const socialMediasBlockeds = ref([
    { siteName: "Tiktok", restricted: true },
    { siteName: "Instagram", restricted: true },
    { siteName: "Instagram (reels)", restricted: true },
    { siteName: "Twitter / X", restricted: true },
    { siteName: "Telegram", restricted: true },
    { siteName: "Youtube (Shorts)", restricted: true },
]);

const adultContentBlocked = ref([
    { siteName: "Xvideos", restricted: true },
    { siteName: "PornHub", restricted: true },
    { siteName: "OnlyFans", restricted: true },
]);

const betsBlocked = ref([
    { siteName: "Bet365", restricted: true },
    { siteName: "Betano BR", restricted: true },
    { siteName: "Betano", restricted: true },
    { siteName: "Tigrinho", restricted: true },
    { siteName: "Betfair", restricted: true },
    { siteName: "KTO", restricted: true },
    { siteName: "Blaze", restricted: true },
    { siteName: "Blaze Space1", restricted: true },
]);

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

const handleChangeRestrictionSocialMedia = (siteName: string) => {
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
};

const handleChangeRestrictionAdultContent = (siteName: string) => {
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
};

const handleChangeRestrictionBets = (siteName: string) => {
    const site = betsBlocked.value.find((site) => site.siteName === siteName);

    if (!site) {
        console.error("error");
        return;
    }

    site.restricted = !site.restricted;

    betsBlocked.value.find((site) => site.siteName === siteName)!.restricted =
        site.restricted;
};

const websites = {
    socialMedias: [
        {
            siteName: "Tiktok",
            siteURL: "https://tiktok.com",
            logo: TiktokLogo,
        },
        {
            siteName: "Instagram",
            siteURL: "https://intagram.com",
            logo: InstagramLogo,
        },
        {
            siteName: "Instagram (reels)",
            siteURL: "https://instagram.com/reels",
            logo: InstagramLogo,
        },
        {
            siteName: "Twitter / X",
            siteURL: "https://x.com",
            logo: TwitterLogo,
        },
        {
            siteName: "Telegram",
            siteURL: "https://web.telegram.org",
            logo: TelegramLogo,
        },
        {
            siteName: "Youtube (Shorts)",
            siteURL: "https://youtube.com/shorts",
            logo: YoutubeLogo,
        },
    ],
    adultContent: [
        {
            siteName: "Xvideos",
            siteURL: "https://xvideos.com",
            logo: XvideosLogo,
        },
        {
            siteName: "PornHub",
            siteURL: "https://pornhub.com",
            logo: PornhubLogo,
        },
        {
            siteName: "OnlyFans",
            siteURL: "https://onlyfans.com",
            logo: OnlyfansLogo,
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
            siteURL: "https://br.betano.com",
            logo: BetanoLogo,
        },
        {
            siteName: "Betano",
            siteURL: "https://betano.com",
            logo: BetanoLogo,
        },
        {
            siteName: "Tigrinho",
            siteURL: "https://cassinopix.com",
            logo: TigrinhoLogo,
        },
        {
            siteName: "Betfair",
            siteURL: "https://betfair.com",
            logo: BetfairLogo,
        },
        {
            siteName: "KTO",
            siteURL: "https://kto.com",
            logo: KTOLogo,
        },
        {
            siteName: "Blaze",
            siteURL: "https://blaze.com",
            logo: BlazeLogo,
        },
        {
            siteName: "Blaze Space1",
            siteURL: "https://blaze1.space",
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
};

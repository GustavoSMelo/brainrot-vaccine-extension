import { IRestricted, IRestrictedCustom } from "../interfaces/restricted";

const betsInitialState = [
    { siteName: "Bet365", restricted: true },
    { siteName: "Betano BR", restricted: true },
    { siteName: "Betano", restricted: true },
    { siteName: "Tigrinho", restricted: true },
    { siteName: "Betfair", restricted: true },
    { siteName: "KTO", restricted: true },
    { siteName: "Blaze", restricted: true },
    { siteName: "Blaze Space1", restricted: true },
] as Array<IRestricted>;

const adultContentInitialState = [
    { siteName: "Xvideos", restricted: true },
    { siteName: "PornHub", restricted: true },
    { siteName: "PornHub PT", restricted: true },
    { siteName: "OnlyFans", restricted: true },
    { siteName: "CameraPrive", restricted: true },
    { siteName: "EroMe", restricted: true },
    { siteName: "Redtube", restricted: true },
    { siteName: "Redtube BR", restricted: true },
] as Array<IRestricted>;

const socialMediasInitialState = [
    { siteName: "Tiktok", restricted: true },
    { siteName: "Instagram", restricted: true },
    { siteName: "Instagram (reels)", restricted: true },
    { siteName: "Twitter / X", restricted: true },
    { siteName: "Telegram", restricted: true },
    { siteName: "Youtube (Shorts)", restricted: true },
    { siteName: "Facebook", restricted: true },
    { siteName: "Youtube", restricted: false },
    { siteName: "Twitch", restricted: false },
    { siteName: "Reddit", restricted: false },
] as Array<IRestricted>;

const AiChatInitialState = [
    { siteName: "Gemini", restricted: true },
    { siteName: "ChatGPT", restricted: true },
    { siteName: "DeepSeek", restricted: true },
    { siteName: "Blackbox AI", restricted: true },
    { siteName: "Meta AI", restricted: true },
    { siteName: "Copilot", restricted: true },
] as Array<IRestricted>;

const customWebsitesInitialState = [] as Array<IRestrictedCustom>;

export {
    betsInitialState,
    adultContentInitialState,
    socialMediasInitialState,
    customWebsitesInitialState,
    AiChatInitialState
};

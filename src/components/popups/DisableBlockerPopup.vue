<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import {
    handleChangeRestrictionAdultContent,
    handleChangeRestrictionBets,
    handleChangeRestrictionSocialMedia,
    handleChangeRestrictionAiChat
} from "../../helpers/websites";
import {
    getAdultContentBlocked,
    getBetsBlocked,
    getAIChatBlocked,
    getSocialMediasBlocked,
} from "../../helpers/getSyncStorageDatas";

const props = defineProps({
    siteName: { type: String, required: true },
    siteSessionName: { type: String, required: true },
    handleClearSiteSelected: { type: Function, required: true },
    handleRemountMainContent: { type: Function, required: true },
});

const timer = ref(30);
const intervalId = setInterval(async () => {
    timer.value = timer.value - 1;
    await nextTick();
}, 1000);

const isTimerEnded = (): boolean => (timer.value <= 0 ? true : false);

const handleDisableAll = async () => {
    const adultContent = await getAdultContentBlocked();
    const socialMedias = await getSocialMediasBlocked();
    const bets = await getBetsBlocked();
    const aiChat = await getAIChatBlocked();

    adultContent.forEach((ac) => (ac.restricted = false));
    socialMedias.forEach((sm) => (sm.restricted = false));
    bets.forEach((bet) => (bet.restricted = false));
    aiChat.forEach((ai) => (ai.restricted = false));

    await chrome.storage.sync.set({
        socialMediasBlocked: [...socialMedias],
        adultContentBlocked: [...adultContent],
        betsBlocked: [...bets],
        AiChatBlocked: [...aiChat]
    });

    props.handleRemountMainContent();
};

const handleDisableWebsiteRestriction = (): void => {
    switch (props.siteSessionName) {
        case "socialMedias":
            handleChangeRestrictionSocialMedia(props.siteName, false);
            break;
        case "adultContent":
            handleChangeRestrictionAdultContent(props.siteName, false);
            break;
        case "bettingHouse":
            handleChangeRestrictionBets(props.siteName, false);
            break;
        case "aiChat":
            handleChangeRestrictionAiChat(props.siteName, false);
            break;
        case "allContent":
            handleDisableAll();
            break;
        default:
            console.error("Error to set sessionName");
            break;
    }

    props.handleClearSiteSelected();
};

watch(timer, () => {
    if (isTimerEnded()) clearInterval(intervalId);
});
</script>

<template>
    <div class="popupContainer" @click="handleClearSiteSelected()">
        <section class="popup" @click.stop>
            <h2>Disable {{ siteName }}</h2>

            <p>
                For disable {{ siteName }} blocker, you should await
                {{ timer }} seconds...
            </p>

            <button
                v-if="isTimerEnded()"
                type="button"
                class="enabled"
                @click="handleDisableWebsiteRestriction()"
            >
                Disable page
            </button>
            <button v-else type="button" class="disabled">
                Await {{ timer }} seconds...
            </button>
        </section>
    </div>
</template>

<style src="../../styles/components/confirmPopup.style.scss" scoped />

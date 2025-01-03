<script setup lang="ts">
import { defineProps, nextTick, ref, watch } from "vue";
import {
    handleChangeRestrictionAdultContent,
    handleChangeRestrictionBets,
    handleChangeRestrictionSocialMedia,
} from "../helpers/websites";
const props = defineProps({
    siteName: { type: String, required: true },
    siteSessionName: { type: String, required: true },
    handleClearSiteSelected: { type: Function, required: true },
});

const timer = ref(5);
const intervalId = setInterval(async () => {
    timer.value = timer.value - 1;
    await nextTick();
}, 1000);

const isTimerEnded = (): boolean => {
    return timer.value <= 0 ? true : false;
};

const handleDisableWebsiteRestriction = (): void => {
    switch (props.siteSessionName) {
        case "socialMedias":
            handleChangeRestrictionSocialMedia(props.siteName);
            break;
        case "adultContent":
            handleChangeRestrictionAdultContent(props.siteName);
            break;
        case "bettingHouse":
            handleChangeRestrictionBets(props.siteName);
            break;
        default:
            console.error("Erro to set sessionName");
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

<style src="../styles/components/confirmPopup.style.scss" scoped />

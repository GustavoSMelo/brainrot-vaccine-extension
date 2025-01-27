<!-- eslint-disable no-undef -->

<script setup lang="ts">
import {
    getAdultContentBlocked,
    getBetsBlocked,
    getSocialMediasBlocked,
} from "../helpers/getSyncStorageDatas";

const props = defineProps({
    handleChangeSessionInformations: {
        type: Function,
        required: true,
    },
    handleRemountMainContent: {
        type: Function,
        required: true,
    },
    handleChangePopupMessage: {
        type: Function,
        required: true,
    },
    handleChangePopupStatus: {
        type: Function,
        required: true,
    },
    handleChangeShouldRenderPopupStatus: {
        type: Function,
        required: true,
    },
});

const handleDisableAll = () => {
    props.handleChangeSessionInformations("allContent", "All websites");
};
const handleEnableAll = async () => {
    const adultContent = await getAdultContentBlocked();
    const socialMedias = await getSocialMediasBlocked();
    const bets = await getBetsBlocked();

    adultContent.forEach((ac) => (ac.restricted = true));
    socialMedias.forEach((sm) => (sm.restricted = true));
    bets.forEach((bet) => (bet.restricted = true));

    await chrome.storage.sync.set({
        socialMediasBlocked: [...socialMedias],
        adultContentBlocked: [...adultContent],
        betsBlocked: [...bets],
    });

    props.handleRemountMainContent();
    props.handleChangePopupStatus("success");
    props.handleChangePopupMessage("All blockers enabled");
    props.handleChangeShouldRenderPopupStatus();
};

// const handleImportData = () => {};
// const handleExportData = () => {};
</script>
<template>
    <details>
        <summary>Advanced</summary>

        <article class="advancedContainer">
            <section class="row">
                <button
                    class="btnDisableAll"
                    type="button"
                    @click="handleDisableAll()"
                >
                    Disable all
                </button>
                <button
                    class="btnEnableAll"
                    type="button"
                    @click="handleEnableAll()"
                >
                    Enable all
                </button>
            </section>
            <section class="row">
                <button class="btnImport" type="button">Import</button>
                <button class="btnImport" type="button">Export</button>
            </section>
        </article>
    </details>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AdultContent from "./AdultContent.vue";
import BettingHouse from "./BettingHouse.vue";
import ExtensionIntroduction from "./ExtensionIntroduction.vue";
import FooterContent from "./FooterContent.vue";
import SocialMedias from "./SocialMedias.vue";
import ConfirmPopup from "./popups/ConfirmPopup.vue";
import HandleCustomBlocker from "./popups/HandleCustomBlocker.vue";
import StatusPopup from "./popups/StatusPopup.vue";
import { startSyncData } from "../helpers/websites";
import { IRestricted } from "../interfaces/restricted";
import { getCustomWebsitesBlocked } from "../helpers/getSyncStorageDatas";
import CustomWebsites from "./CustomWebsites.vue";

const siteSessionName = ref("");
const siteName = ref("");
const isRenderHandleCustomBlockerPopup = ref(false);
const popupStatus = ref<"success" | "error">("success");
const popupMessage = ref("");
const shouldRenderPopupStatus = ref(0);
const customWebsites = ref<Array<IRestricted>>([]);
const selectedCustomWebsiteName = ref('');
const selectedCustomWebsiteURL = ref('');
const selectedCustomWebsiteIndex = ref(-1);

const handleRenderHandleCustomBlocker = (): void => {
    isRenderHandleCustomBlockerPopup.value =
        !isRenderHandleCustomBlockerPopup.value;
};

const shouldRenderCreateCustomerBlock = (): boolean => {
    if (!isRenderHandleCustomBlockerPopup.value) return false;
    return true;
};
const shouldRenderConfirmPopup = (): boolean => {
    if (!siteSessionName.value || !siteName.value) return false;
    return true;
};
const handleChangeSessionInformations = (
    selectedSession: "socialMedias" | "adultContent" | "bettingHouse",
    selectedSiteName: string
): void => {
    siteName.value = selectedSiteName;
    siteSessionName.value = selectedSession;
};

const handleClearSiteSelected = (): void => {
    siteSessionName.value = "";
    siteName.value = "";
};
const handleChangeShouldRenderPopupStatus = (): void => {
    shouldRenderPopupStatus.value = 5;
};

const handleChangePopupMessage = (message: string) => {
    popupMessage.value = message;
};

const handleChangePopupStatus = (status: 'success' | 'error') => {
    popupStatus.value = status;
};

const checkIfShouldRenderPopupStatus = (): boolean =>
    shouldRenderPopupStatus.value <= 0 ? true : false;

setInterval(() => {
    if (shouldRenderPopupStatus.value > 0) {
        shouldRenderPopupStatus.value = 0;
    }
}, 5000);


onMounted(async () => {
    await startSyncData();
    const helper = await getCustomWebsitesBlocked();
    customWebsites.value = [...helper];
});
</script>

<template>
    <ConfirmPopup
        v-if="shouldRenderConfirmPopup()"
        :siteName="siteName"
        :siteSessionName="siteSessionName"
        :handleClearSiteSelected="handleClearSiteSelected"
    />

    <HandleCustomBlocker
        :handleChangePopupMessage="handleChangePopupMessage"
        :handleChangePopupStatus="handleChangePopupStatus"
        :handleChangeShouldRenderPopupStatus="
            handleChangeShouldRenderPopupStatus
        "
        :handleRenderHandleCustomBlocker="handleRenderHandleCustomBlocker"
        isEditOrCreation="create"
        :websiteIndex="selectedCustomWebsiteIndex"
        :choosedWebsiteName="selectedCustomWebsiteName"
        :choosedWebsiteURL="selectedCustomWebsiteURL"
        v-if="shouldRenderCreateCustomerBlock()"
    />
    <StatusPopup
        v-if="!checkIfShouldRenderPopupStatus()"
        :popupMessage="popupMessage"
        :popupStatus="popupStatus"
    />

    <main>
        <ExtensionIntroduction />

        <button
            type="button"
            class="btnAddWebsite"
            @click="handleRenderHandleCustomBlocker()"
        >
            <img src="../assets/plus.svg" alt="plus icon" />
            Add website
        </button>

        <SocialMedias
            :handleChangeSessionInformations="handleChangeSessionInformations"
        />
        <AdultContent
            :handleChangeSessionInformations="handleChangeSessionInformations"
        />
        <BettingHouse
            :handleChangeSessionInformations="handleChangeSessionInformations"
        />
        <CustomWebsites />
    </main>
    <FooterContent />
</template>

<style src="../styles/components/maincontent.style.scss" />

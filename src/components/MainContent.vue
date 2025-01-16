<script setup lang="ts">
import { onMounted, ref } from "vue";
import AdultContent from "./AdultContent.vue";
import BettingHouse from "./BettingHouse.vue";
import ExtensionIntroduction from "./ExtensionIntroduction.vue";
import FooterContent from "./FooterContent.vue";
import SocialMedias from "./SocialMedias.vue";
import DisableBlockerPopup from "./popups/DisableBlockerPopup.vue";
import HandleCustomBlocker from "./popups/HandleCustomBlocker.vue";
import StatusPopup from "./popups/StatusPopup.vue";
import { startSyncData } from "../helpers/websites";
import { IRestricted } from "../interfaces/restricted";
import { getCustomWebsitesBlocked } from "../helpers/getSyncStorageDatas";
import CustomWebsites from "./CustomWebsites.vue";
import ConfirmDeleteCustomPopup from "./popups/ConfirmDeleteCustomPopup.vue";

const siteSessionName = ref("");
const siteName = ref("");
const isRenderHandleCustomBlockerPopup = ref(false);
const isRenderHandleConfirmDeleteCustomPopup = ref(true);
const popupStatus = ref<"success" | "error">("success");
const popupMessage = ref("");
const shouldRenderPopupStatus = ref(0);
const customWebsites = ref<Array<IRestricted>>([]);
const selectedCustomWebsiteName = ref("");
const selectedCustomWebsiteURL = ref("");
const selectedCustomWebsiteIndex = ref(-1);

const handleRenderHandleCustomBlocker = (): void => {
    isRenderHandleCustomBlockerPopup.value =
        !isRenderHandleCustomBlockerPopup.value;
};

const shouldRenderConfirmDeleteCustomPopup = (): boolean => {
    if (!isRenderHandleConfirmDeleteCustomPopup.value) return false;

    return true;
};

const shouldRenderCreateCustomerBlock = (): boolean => {
    if (!isRenderHandleCustomBlockerPopup.value) return false;
    return true;
};
const shouldRenderDisableBlockerPopup = (): boolean => {
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

const handleChangePopupStatus = (status: "success" | "error") => {
    popupStatus.value = status;
};

const handleRenderConfirmDeleteCustomPopup = () => {
    isRenderHandleConfirmDeleteCustomPopup.value =
        !isRenderHandleConfirmDeleteCustomPopup.value;
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
    <DisableBlockerPopup
        v-if="shouldRenderDisableBlockerPopup()"
        :siteName="siteName"
        :siteSessionName="siteSessionName"
        :handleClearSiteSelected="handleClearSiteSelected"
    />

    <ConfirmDeleteCustomPopup
        v-if="shouldRenderConfirmDeleteCustomPopup()"
        :handleRenderConfirmDeleteCustomPopup="
            handleRenderConfirmDeleteCustomPopup
        "
        :handleChangePopupMessage="handleChangePopupMessage"
        :handleChangePopupStatus="handleChangePopupStatus"
        :handleChangeShouldRenderPopupStatus="
            handleChangeShouldRenderPopupStatus
        "
        :siteName="selectedCustomWebsiteName"
        :siteIndex="selectedCustomWebsiteIndex"
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
        <CustomWebsites
            :handleRenderConfirmDeleteCustomPopup="
                handleRenderConfirmDeleteCustomPopup
            "
        />
    </main>
    <FooterContent />
</template>

<style src="../styles/components/maincontent.style.scss" />

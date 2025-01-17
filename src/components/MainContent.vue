<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
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
import ConfirmDeletionCustomPopup from "./popups/ConfirmDeletionCustomPopup.vue";

const siteSessionName = ref("");
const siteName = ref("");
const isRenderHandleCustomBlockerPopup = ref(false);
const isRenderHandleConfirmDeletionCustomPopup = ref(false);
const remountCustomWebsites = ref(false);
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

const shouldRenderConfirmDeletionCustomPopup = (): boolean => {
    if (!isRenderHandleConfirmDeletionCustomPopup.value) return false;

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

const shouldRemountCustomWebsites = (): boolean => {
    if (!remountCustomWebsites.value) return true;
    return false;
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

const handleChangePopupMessage = (message: string): void => {
    popupMessage.value = message;
};

const handleChangePopupStatus = (status: "success" | "error"): void => {
    popupStatus.value = status;
};

const handleRenderConfirmDeletionCustomPopup = (
    websiteName: string,
    websiteIndex: number
): void => {
    selectedCustomWebsiteName.value = websiteName;
    selectedCustomWebsiteIndex.value = websiteIndex;

    isRenderHandleConfirmDeletionCustomPopup.value =
        !isRenderHandleConfirmDeletionCustomPopup.value;
};

const handleChangeSelectedCustomWebsiteName = (websiteName: string): void => {
    selectedCustomWebsiteName.value = websiteName;
};

const handleChangeSelectedCustomWebsiteIndex = (websiteIndex: number): void => {
    selectedCustomWebsiteIndex.value = websiteIndex;
};

const handleChangeSelectedCustomWebsiteURL = (websiteURL: string): void => {
    selectedCustomWebsiteURL.value = websiteURL;
};

const handleRemountCustomWebsites = (): void => {
    remountCustomWebsites.value = true;

    nextTick(() => {
        remountCustomWebsites.value = false;
    });
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

    <ConfirmDeletionCustomPopup
        v-if="shouldRenderConfirmDeletionCustomPopup()"
        :handleRenderConfirmDeletionCustomPopup="
            handleRenderConfirmDeletionCustomPopup
        "
        :handleChangePopupMessage="handleChangePopupMessage"
        :handleChangePopupStatus="handleChangePopupStatus"
        :handleChangeShouldRenderPopupStatus="
            handleChangeShouldRenderPopupStatus
        "
        :siteName="selectedCustomWebsiteName"
        :siteIndex="selectedCustomWebsiteIndex"
        :handleRemountCustomWebsites="handleRemountCustomWebsites"
    />

    <HandleCustomBlocker
        :handleChangePopupMessage="handleChangePopupMessage"
        :handleChangePopupStatus="handleChangePopupStatus"
        :handleChangeShouldRenderPopupStatus="
            handleChangeShouldRenderPopupStatus
        "
        :handleRenderHandleCustomBlocker="handleRenderHandleCustomBlocker"
        :handleRemountCustomWebsites="handleRemountCustomWebsites"
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
            v-if="shouldRemountCustomWebsites()"
            :handleRenderConfirmDeletionCustomPopup="
                handleRenderConfirmDeletionCustomPopup
            "
            :handleChangeSelectedCustomWebsiteName="
                handleChangeSelectedCustomWebsiteName
            "
            :handleChangeSelectedCustomWebsiteIndex="
                handleChangeSelectedCustomWebsiteIndex
            "
            :handleChangeSelectedCustomWebsiteURL="
                handleChangeSelectedCustomWebsiteURL
            "
        />
    </main>
    <FooterContent />
</template>

<style src="../styles/components/maincontent.style.scss" />

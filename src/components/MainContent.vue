<script setup lang="ts">
import AdultContent from "./AdultContent.vue";
import BettingHouse from "./BettingHouse.vue";
import ExtensionIntroduction from "./ExtensionIntroduction.vue";
import FooterContent from "./FooterContent.vue";
import SocialMedias from "./SocialMedias.vue";
import ConfirmPopup from "./ConfirmPopup.vue";
import { startSyncData } from "../helpers/websites";
import { onMounted, ref } from "vue";

const siteSessionName = ref("");
const siteName = ref("");

const shouldRenderConfirmPopup = (): boolean => {
    if (!siteSessionName.value || !siteName.value) return false;
    return true;
};
const handleChangeSessionInformations = (
    selectedSession: "socialMedias" | "adultContent" | "bettingHouse",
    selectedSiteName: string
): void => {
    console.log("teste");
    console.log(selectedSession);
    console.log(selectedSiteName);
    siteName.value = selectedSiteName;
    siteSessionName.value = selectedSession;
};

const handleClearSiteSelected = (): void => {
    siteSessionName.value = "";
    siteName.value = "";
};

onMounted(async () => {
    await startSyncData();
});
</script>

<template>
    <ConfirmPopup
        v-if="shouldRenderConfirmPopup()"
        :siteName="siteName"
        :siteSessionName="siteSessionName"
        :handleClearSiteSelected="handleClearSiteSelected"
    />

    <main>
        <ExtensionIntroduction />
        <SocialMedias
            :handleChangeSessionInformations="handleChangeSessionInformations"
        />
        <AdultContent
            :handleChangeSessionInformations="handleChangeSessionInformations"
        />
        <BettingHouse
            :handleChangeSessionInformations="handleChangeSessionInformations"
        />
    </main>
    <FooterContent />
</template>

<style src="../styles/components/maincontent.style.scss" />

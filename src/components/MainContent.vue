<script setup lang="ts">
import getCurrentTabURL from "../helpers/getCurrentTab";
import AdultContent from "./AdultContent.vue";
import BettingHouse from "./BettingHouse.vue";
import ExtensionIntroduction from "./ExtensionIntroduction.vue";
import FooterContent from "./FooterContent.vue";
import SocialMedias from "./SocialMedias.vue";

import { isURLBlocked } from "../helpers/websites.ts";
import blockerWebsite from "../helpers/blocker.ts";
import { onMounted } from "vue";

onMounted(async () => {
    const { tabURL, tabId }: { tabURL: string; tabId: number } =
        await getCurrentTabURL();

    console.log(`Vue URL: ${tabURL}`);
    console.log(`BlockedURL: ${isURLBlocked(tabURL)}`);

    if (isURLBlocked(tabURL)) {
        blockerWebsite(tabId);
    }

    console.log(`Passed`);
});
</script>

<template>
    <main>
        <ExtensionIntroduction />
        <SocialMedias />
        <AdultContent />
        <BettingHouse />
    </main>
    <FooterContent />
</template>

<style src="../styles/components/maincontent.style.scss" />

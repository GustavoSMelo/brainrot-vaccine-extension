<script setup lang="ts">
import AdultContent from './AdultContent.vue';
import BettingHouse from './BettingHouse.vue';
import ExtensionIntroduction from './ExtensionIntroduction.vue';
import FooterContent from './FooterContent.vue';
import SocialMedias from './SocialMedias.vue';
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

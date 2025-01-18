<script setup lang="ts">
const props = defineProps({
    popupStatus: {
        type: String,
        required: true
    },
    popupMessage: {
        type: String,
        required: true,
    },
})

const isPopupSuccess = (): boolean =>
    props.popupStatus === "success" ? true : false;
</script>

<template>
    <div v-if="isPopupSuccess()" class="popupSuccess">
        {{ popupMessage }}
    </div>

    <div v-else class="popupError">
        {{ popupMessage }}
    </div>
</template>

<style src="../../styles/components/statusPopup.style.scss" />

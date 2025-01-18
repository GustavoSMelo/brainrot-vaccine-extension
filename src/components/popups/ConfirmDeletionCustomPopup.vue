<script setup lang="ts">
import { getCustomWebsitesBlocked } from "../../helpers/getSyncStorageDatas";
import { handleChangeWebsiteCustom } from "../../helpers/websites";

const props = defineProps({
    handleRenderConfirmDeletionCustomPopup: {
        type: Function,
        required: true,
    },
    handleChangeShouldRenderPopupStatus: {
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
    handleRemountCustomWebsites: {
        type: Function,
        required: true,
    },
    siteName: {
        type: String,
        required: true,
    },
    siteIndex: {
        type: Number,
        required: true,
    },
});

const handleDeleteWebsite = async () => {
    try {
        const websites = await getCustomWebsitesBlocked();
        websites.splice(props.siteIndex, 1);

        await handleChangeWebsiteCustom(websites);
        props.handleChangePopupStatus("success");
        props.handleChangePopupMessage("Blocker deleted with success");
        props.handleChangeShouldRenderPopupStatus();
        props.handleRemountCustomWebsites();
        props.handleRenderConfirmDeletionCustomPopup();
    } catch (error) {
        console.error(error);
        props.handleChangePopupStatus("error");
        props.handleChangePopupMessage("Error to delete a blocker");
        props.handleChangeShouldRenderPopupStatus();
    }
};
</script>

<template>
    <div class="popupContainer" @click="props.handleRenderConfirmDeletionCustomPopup()">
        <section class="popup" @click.stop>
            <h1>Would you like to remove {{ props.siteName }} ?</h1>

            <span class="btnContainer">
                <button class="btnDelete" type="button" @click="handleDeleteWebsite()">
                    Delete
                </button>
                <button
                    class="btnCancel"
                    type="button"
                    @click="props.handleRenderConfirmDeletionCustomPopup()"
                >
                    Cancel
                </button>
            </span>
        </section>
    </div>
</template>

<style src="../../styles/components/confirmPopup.style.scss" scoped />

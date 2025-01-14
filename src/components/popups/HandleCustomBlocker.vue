<script setup lang="ts">
import { ref } from "vue";
import { getCustomWebsitesBlocked } from "../../helpers/getSyncStorageDatas";
import { IRestrictedCustom } from "../../interfaces/restricted";
import { handleChangeWebsiteCustom } from "../../helpers/websites";
const props = defineProps({
    handleRenderHandleCustomBlocker: {
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
    isEditOrCreation: {
        type: String, //edit | create
        required: true,
    },
    websiteIndex: {
        type: Number,
        required: true,
    },
    choosedWebsiteName: {
        type: String,
        required: true,
    },
    choosedWebsiteURL: {
        type: String,
        required: true
    }
});

const websiteName = ref(props.choosedWebsiteName ?? '');
const websiteURL = ref(props.choosedWebsiteURL ?? '');

const handleChangeWebsiteName = (siteName: string): void => {
    websiteName.value = siteName.trim();
};

const handleChangeWebsiteURL = (siteURL: string): void => {
    websiteURL.value = siteURL.trim();
};

const handleClickButton = async () => {
    const helper = await getCustomWebsitesBlocked();

    if (props.isEditOrCreation === "create") {
        try {
            const newWebsite: IRestrictedCustom = {
                siteName: websiteName.value,
                siteURL: websiteURL.value,
                restricted: true,
            };

            helper.push(newWebsite);

            await handleChangeWebsiteCustom(helper);

            props.handleChangePopupStatus("success");
            props.handleChangePopupMessage("Blocker created with success");
            props.handleChangeShouldRenderPopupStatus();
        } catch (error) {
            console.error(error);
            props.handleChangePopupStatus("error");
            props.handleChangePopupMessage("Error to create a blocker");
            props.handleChangeShouldRenderPopupStatus();
        }
    }

    else if (props.isEditOrCreation === 'edit') {
        try {
            helper[props.websiteIndex].siteName = websiteName.value;
            helper[props.websiteIndex].siteURL = websiteURL.value;

            await handleChangeWebsiteCustom(helper);

            props.handleChangePopupStatus("success");
            props.handleChangePopupMessage("Blocker edited with success");
            props.handleChangeShouldRenderPopupStatus();
        } catch (error) {
            console.error(error);
        }
    }
};
</script>

<template>
    <section
        class="createCustomerBlockerPopup"
        @click="props.handleRenderHandleCustomBlocker()"
    >
        <form class="createCustomerBlockerContainer" @click.stop>
            <h2>Create blocker</h2>

            <span>
                <label>Website name: </label>
                <input
                    type="text"
                    :value="websiteName"
                    @input="event => handleChangeWebsiteName((event.target as HTMLInputElement).value)"
                    placeholder="Website name"
                />

                <label>Website URL: </label>
                <input
                    type="text"
                    :value="websiteURL"
                    @input="event => handleChangeWebsiteURL((event.target as HTMLInputElement).value)"
                    placeholder="https://example.com"
                />
            </span>

            <button @click="handleClickButton()" type="button">
                {{ isEditOrCreation }} blocker
            </button>
        </form>
    </section>
</template>

<style scoped src="../../styles/components/createCustomBlocker.style.scss" />

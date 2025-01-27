<script setup lang="ts">
import Globe from "../assets/globe.svg";
import Ghost from "../assets/ghost.svg";

import { getCustomWebsitesBlocked } from "../helpers/getSyncStorageDatas";
import { onMounted, ref } from "vue";
import { IRestrictedCustom } from "../interfaces/restricted";

const props = defineProps({
    handleRenderConfirmDeletionCustomPopup: {
        type: Function,
        required: true,
    },
    handleChangeSelectedCustomWebsiteName: {
        type: Function,
        required: true,
    },
    handleChangeSelectedCustomWebsiteIndex: {
        type: Function,
        required: true,
    },
    handleChangeSelectedCustomWebsiteURL: {
        type: Function,
        required: true,
    },
    handleChangeEditOrCreateCustomWebsite: {
        type: Function,
        required: true,
    },
    handleRenderHandleCustomBlocker: {
        type: Function,
        required: true,
    },
});

const websites = ref<Array<IRestrictedCustom>>([]);
const websitesLimitLength = ref(0);

const handleClickEditCustomWebsite = (
    siteName: string,
    siteIndex: number,
    siteURL: string
) => {
    props.handleChangeSelectedCustomWebsiteName(siteName);
    props.handleChangeSelectedCustomWebsiteIndex(siteIndex);
    props.handleChangeSelectedCustomWebsiteURL(siteURL);
    props.handleChangeEditOrCreateCustomWebsite("edit");
    props.handleRenderHandleCustomBlocker();
};

const handleChangeRestriction = async (index: number) => {
    const helper = [...websites.value];

    helper[index].restricted = !helper[index].restricted;

    // eslint-disable-next-line no-undef
    await chrome.storage.sync.set({ customWebsites: [...helper] });
};

onMounted(async () => {
    const arrayOfWebsite = await getCustomWebsitesBlocked();

    websitesLimitLength.value = arrayOfWebsite.length;
    websites.value = [...arrayOfWebsite];
});
</script>

<template>
    <details open>
        <summary aria-controls="socialmedia-content">Customs</summary>

        <section v-if="websites.length > 0">
            <h2>Limit: {{ websitesLimitLength }}/20</h2>

            <div
                v-for="(website, index) in websites"
                :key="index"
                class="customWebsiteContainer"
            >
                <figure>
                    <img :src="Globe" alt="website custom logo" />

                    <figcaption>{{ website.siteName }}</figcaption>
                </figure>

                <span class="controlButtonContainer">
                    <button
                        class="btnDelete"
                        type="button"
                        @click="
                            props.handleRenderConfirmDeletionCustomPopup(
                                website.siteName,
                                index
                            )
                        "
                    >
                        Delete
                    </button>
                    <button
                        class="btnEdit"
                        type="button"
                        @click="
                            handleClickEditCustomWebsite(
                                website.siteName,
                                index,
                                website.siteURL
                            )
                        "
                    >
                        Edit
                    </button>
                    <label v-if="website.restricted" class="switch selected">
                        <input
                            class="btnSwitch"
                            type="checkbox"
                            @click="handleChangeRestriction(index)"
                        />
                    </label>
                    <label v-else class="switch">
                        <input
                            class="btnSwitch"
                            type="checkbox"
                            @click="handleChangeRestriction(index)"
                        />
                    </label>
                </span>
            </div>
        </section>
        <section v-else>
            <span class="emptyCustomWebsiteContainer">
                <figure>
                    <img :src="Ghost" alt="ghost" />

                    <figcaption>The list is empty... spooky</figcaption>
                </figure>
            </span>
        </section>
    </details>
</template>

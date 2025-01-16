<script setup lang="ts">
import Globe from "../assets/globe.svg";
import Ghost from "../assets/ghost.svg";
import { getCustomWebsitesBlocked } from "../helpers/getSyncStorageDatas";
import { onMounted, ref } from "vue";
import { IRestrictedCustom } from "../interfaces/restricted";

const props = defineProps({
    handleRenderConfirmDeleteCustomPopup: {
        type: Function,
        required: true
    }
});

const websites = ref<Array<IRestrictedCustom>>([]);

onMounted(async () => {
    const arrayOfWebsite = await getCustomWebsitesBlocked();

    websites.value = [...arrayOfWebsite];
});
</script>

<template>
    <details open>
        <summary aria-controls="socialmedia-content">Customs</summary>

        <section v-if="websites.length > 0">
            <div v-for="(website, index) in websites" :key="index" class="customWebsiteContainer">
                <figure>
                    <img :src="Globe" alt="website custom logo" />

                    <figcaption>{{ website.siteName }}</figcaption>
                </figure>

                <span class="controlButtonContainer">
                    <button class="btnDelete" type="button" @click="props.handleRenderConfirmDeleteCustomPopup()">Delete</button>
                    <button class="btnEdit" type="button">Edit</button>
                    <label class="switch selected">
                        <input class="btnSwitch" type="checkbox" />
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

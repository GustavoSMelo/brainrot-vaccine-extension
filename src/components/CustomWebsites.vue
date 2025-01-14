<script setup lang="ts">
import Globe from "../assets/globe.svg";
import Ghost from "../assets/ghost.svg";
import { getCustomWebsitesBlocked } from "../helpers/getSyncStorageDatas";
import { onMounted, ref } from "vue";
import { IRestrictedCustom } from "../interfaces/restricted";

const websites = ref<Array<IRestrictedCustom>>([]);

onMounted(async () => {
    const arrayOfWebsite = await getCustomWebsitesBlocked();

    websites.value = [...arrayOfWebsite];
});
</script>

<template>
    <details open>
        <summary aria-controls="socialmedia-content">Customs</summary>

        <section>
            <div class="customWebsiteContainer" v-if="websites.length > 0">
                <figure>
                    <img :src="Globe" alt="website custom logo" />

                    <figcaption>Teste</figcaption>
                </figure>

                <span class="controlButtonContainer">
                    <button class="btnDelete" type="button">Delete</button>
                    <button class="btnEdit" type="button">Edit</button>
                    <label class="switch selected">
                        <input class="btnSwitch" type="checkbox" />
                    </label>
                </span>
            </div>

            <span class="emptyCustomWebsiteContainer" v-else>
                <figure>
                    <img :src="Ghost" alt="ghost" />

                    <figcaption>The list is empty... spooky</figcaption>
                </figure>
            </span>
        </section>
    </details>
</template>

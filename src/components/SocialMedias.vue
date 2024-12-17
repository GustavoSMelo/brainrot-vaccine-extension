<script lang="ts">
import {
    websites,
    isRestrictedSocialMedia,
    handleChangeRestrictionSocialMedia,
} from "../helpers/websites";

export default {
    data() {
        return {
            websites,
            isRestrictedSocialMedia,
            handleChangeRestrictionSocialMedia,
        };
    },
};
</script>

<template>
    <details open>
        <summary aria-controls="socialmedia-content">Social Medias</summary>

        <section>
            <div v-for="(website, index) in websites.socialMedias" :key="index">
                <figure>
                    <img
                        :src="website.logo"
                        :alt="`${website.siteName} logo`"
                    />

                    <figcaption>{{ website.siteName }}</figcaption>
                </figure>

                <label
                    v-if="isRestrictedSocialMedia(website.siteName)"
                    class="switch selected"
                >
                    <input
                        class="btnSwitch"
                        type="checkbox"
                        @click="
                            handleChangeRestrictionSocialMedia(website.siteName)
                        "
                    />
                </label>
                <label v-else class="switch">
                    <input
                        class="btnSwitch"
                        type="checkbox"
                        @click="handleChangeRestrictionSocialMedia(website.siteName)"
                    />
                </label>
            </div>
        </section>
    </details>
</template>

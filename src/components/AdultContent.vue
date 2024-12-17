<script lang="ts">
import {
    isRestrictedAdultContent,
    websites,
    handleChangeRestrictionAdultContent,
} from "../helpers/websites";

export default {
    data() {
        return {
            websites,
            isRestrictedAdultContent,
            handleChangeRestrictionAdultContent,
        };
    },
};
</script>

<template>
    <details open>
        <summary aria-controls="adult-content">Adult Content</summary>

        <section>
            <div v-for="(website, index) in websites.adultContent" :key="index">
                <figure>
                    <img
                        :src="website.logo"
                        :alt="`${website.siteName} logo`"
                    />

                    <figcaption>{{ website.siteName }}</figcaption>
                </figure>

                <label
                    v-if="isRestrictedAdultContent(website.siteName)"
                    class="switch selected"
                >
                    <input
                        class="btnSwitch"
                        type="checkbox"
                        @click="
                            handleChangeRestrictionAdultContent(
                                website.siteName
                            )
                        "
                    />
                </label>
                <label v-else class="switch">
                    <input
                        class="btnSwitch"
                        type="checkbox"
                        @click="
                            handleChangeRestrictionAdultContent(
                                website.siteName
                            )
                        "
                    />
                </label>
            </div>
        </section>
    </details>
</template>

<script lang="ts">
import {
    isRestrictedAdultContent,
    websites,
    handleChangeRestrictionAdultContent,
} from "../helpers/websites";
import { ref, onMounted } from 'vue';
import { IRestricted } from '../interfaces/restricted';

export default {
    setup() {
        const websitesData = ref(websites);
        const adultContentRestrictionStates = ref<Array<IRestricted>>([]);

        const syncSocialMediasRestriction = (): void => {
            websitesData.value.adultContent.forEach(async ac => {
                const isRestricted = await isRestrictedAdultContent(ac.siteName);
                const objHelper = {
                    siteName: ac.siteName,
                    restricted: isRestricted
                };
                adultContentRestrictionStates.value.push(objHelper);
            });
        };

        const checkAdultContentIsRestricted = (siteName: string): boolean => {
            const finded = adultContentRestrictionStates.value.find((ac: IRestricted) =>
                ac.siteName === siteName
            ) ?? null;

            if (finded === null || !finded || finded === undefined) {
                return false;
            }

            return finded.restricted;
        };

        const handleChangeRestriction = (siteName: string) => {
            adultContentRestrictionStates.value.forEach((ac: IRestricted, index: number) => {
                if (ac.siteName === siteName) {
                    adultContentRestrictionStates.value[index].restricted = !ac.restricted;
                    handleChangeRestrictionAdultContent(siteName);
                }
            });
        };

        onMounted(syncSocialMediasRestriction);

        return {
            websites: websitesData,
            adultContentRestrictionStates,
            handleChangeRestriction,
            checkAdultContentIsRestricted
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
                    v-if="checkAdultContentIsRestricted(website.siteName)"
                    class="switch selected"
                >
                    <input
                        class="btnSwitch"
                        type="checkbox"
                        @click="
                            handleChangeRestriction(
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
                            handleChangeRestriction(
                                website.siteName
                            )
                        "
                    />
                </label>
            </div>
        </section>
    </details>
</template>

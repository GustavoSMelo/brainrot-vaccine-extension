<script lang="ts">
import {
    websites,
    isRestrictedSocialMedia,
    handleChangeRestrictionSocialMedia,
} from "../helpers/websites";
import { ref, onMounted } from 'vue';
import { IRestricted } from '../interfaces/restricted';

export default {
    props: {
        handleChangeSessionInformations: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const websitesData = ref(websites);
        const socialMediaRestrictionStates = ref<Array<IRestricted>>([]);

        const syncSocialMediasRestriction = (): void => {
            websitesData.value.socialMedias.forEach(async sm => {
                const isRestricted = await isRestrictedSocialMedia(sm.siteName);
                const objHelper = {
                    siteName: sm.siteName,
                    restricted: isRestricted
                };
                socialMediaRestrictionStates.value.push(objHelper);
            });
        };

        const checkSocialMediaIsRestricted = (siteName: string): boolean => {
            const finded = socialMediaRestrictionStates.value.find((sm: IRestricted) =>
                sm.siteName === siteName
            ) ?? null;

            if (finded === null || !finded || finded === undefined) {
                return false;
            }

            return finded.restricted;
        };

        const handleChangeRestriction = (siteName: string) => {
            socialMediaRestrictionStates.value.forEach((sm: IRestricted, index: number) => {
                if (sm.siteName === siteName) {
                    socialMediaRestrictionStates.value[index].restricted = !sm.restricted;
                    if (!socialMediaRestrictionStates.value[index].restricted) {
                        props.handleChangeSessionInformations('socialMedias', sm.siteName);
                    } else {
                        handleChangeRestrictionSocialMedia(sm.siteName);
                    }
                }
            });
        };

        onMounted(syncSocialMediasRestriction);

        return {
            websites: websitesData,
            socialMediaRestrictionStates,
            handleChangeRestriction,
            checkSocialMediaIsRestricted,
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
                    <img :src="website.logo" :alt="`${website.siteName} logo`" />

                    <figcaption>{{ website.siteName }}</figcaption>
                </figure>

                <label v-if="checkSocialMediaIsRestricted(website.siteName)" class="switch selected">
                    <input class="btnSwitch" type="checkbox" @click="
                        handleChangeRestriction(website.siteName)
                        " />
                </label>
                <label v-else class="switch">
                    <input class="btnSwitch" type="checkbox"
                        @click="handleChangeRestriction(website.siteName)" />
                </label>
            </div>
        </section>
    </details>
</template>

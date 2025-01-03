<script lang="ts">
import { websites, isRestrictedBets, handleChangeRestrictionBets } from '../helpers/websites';
import { ref, onMounted } from 'vue';
import { IRestricted } from '../interfaces/restricted';

export default {
    props: {
        handleChangeSessionInformations: {
            type: Function,
            required: true,
        }
    },
    setup(props) {
        const websitesData = ref(websites);
        const bettingHouseRestrictionStates = ref<Array<IRestricted>>([]);

        const syncSocialMediasRestriction = (): void => {
            websitesData.value.bets.forEach(async sm => {
                const isRestricted = await isRestrictedBets(sm.siteName);
                const objHelper = {
                    siteName: sm.siteName,
                    restricted: isRestricted
                };
                bettingHouseRestrictionStates.value.push(objHelper);
            });
        };

        const checkBettingHouseIsRestricted = (siteName: string): boolean => {
            const finded = bettingHouseRestrictionStates.value.find((sm: IRestricted) =>
                sm.siteName === siteName
            ) ?? null;

            if (finded === null || !finded || finded === undefined) {
                return false;
            }

            return finded.restricted;
        };

        const handleChangeRestriction = (siteName: string) => {
            bettingHouseRestrictionStates.value.forEach((bet: IRestricted, index: number) => {
                if (bet.siteName === siteName) {
                    bettingHouseRestrictionStates.value[index].restricted = !bet.restricted;
                    if (!bettingHouseRestrictionStates.value[index].restricted) {
                        props.handleChangeSessionInformations('bettingHouse', bet.siteName);
                    } else {
                        handleChangeRestrictionBets(bet.siteName);
                    }
                }
            });
        };

        onMounted(syncSocialMediasRestriction);

        return {
            websites: websitesData,
            bettingHouseRestrictionStates,
            handleChangeRestriction,
            checkBettingHouseIsRestricted,
        };
    },
};
</script>

<template>
    <details open>
        <summary aria-controls="bets-content">Betting houses (bets)</summary>

        <section>
            <div v-for="(website, index) in websites.bets" :key="index">
                <figure>
                    <img :src="website.logo" :alt="`${website.siteName} logo`" />

                    <figcaption>{{ website.siteName }}</figcaption>
                </figure>

                <label v-if="checkBettingHouseIsRestricted(website.siteName)" class="switch selected">
                    <input class="btnSwitch" type="checkbox" @click="handleChangeRestriction(website.siteName)" />
                </label>

                <label v-else class="switch">
                    <input class="btnSwitch" type="checkbox" @click="handleChangeRestriction(website.siteName)" />
                </label>
            </div>
        </section>
    </details>
</template>

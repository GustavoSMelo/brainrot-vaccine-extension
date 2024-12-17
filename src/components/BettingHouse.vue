<script lang="ts">
import { websites, isRestrictedBets, handleChangeRestrictionBets } from '../helpers/websites';

export default {
    data(){
        return {
            websites,
            isRestrictedBets,
            handleChangeRestrictionBets
        }
    }
}
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

                <label v-if="isRestrictedBets(website.siteName)" class="switch selected">
                    <input class="btnSwitch" type="checkbox" @click="handleChangeRestrictionBets(website.siteName)" />
                </label>

                <label v-else class="switch">
                    <input class="btnSwitch" type="checkbox" @click="handleChangeRestrictionBets(website.siteName)" />
                </label>
            </div>
        </section>
    </details>
</template>

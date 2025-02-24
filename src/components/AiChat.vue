<script lang="ts">
import {
    handleChangeRestrictionAiChat,
    isRestictedAiChat,
    websites,
} from "../helpers/websites";
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
        const AiChatRestrictionState = ref<Array<IRestricted>>([]);

        const syncAiRestriction = (): void => {
            websitesData.value.AiChat.forEach(async ai => {
                const isRestricted = await isRestictedAiChat(ai.siteName);
                const objHelper = {
                    siteName: ai.siteName,
                    restricted: isRestricted
                };
                AiChatRestrictionState.value.push(objHelper);
            });
        };

        const checkAIChatIsRestricted = (siteName: string): boolean => {
            const finded = AiChatRestrictionState.value.find((ai: IRestricted) =>
            ai.siteName === siteName
            ) ?? null;

            if (finded === null || !finded || finded === undefined) {
                return false;
            }

            return finded.restricted;
        };

        const handleChangeRestriction = (siteName: string) => {
            AiChatRestrictionState.value.forEach((ai: IRestricted, index: number) => {
                if (ai.siteName === siteName) {
                    AiChatRestrictionState.value[index].restricted = !ai.restricted;
                    if (!AiChatRestrictionState.value[index].restricted) {
                        props.handleChangeSessionInformations('aiChat', ai.siteName);
                    } else {
                        handleChangeRestrictionAiChat(ai.siteName, true);
                    }
                }
            });
        };

        onMounted(syncAiRestriction);

        return {
            websites: websitesData,
            AiChatRestrictionState,
            handleChangeRestriction,
            checkAIChatIsRestricted,
        };
    },
};
</script>

<template>
    <details open>
        <summary aria-controls="artificial-intelligence">Artificial Intelligence</summary>

        <section>
            <div v-for="(website, index) in websites.AiChat" :key="index">
                <figure>
                    <img :src="website.logo" :alt="`${website.siteName} logo`" />

                    <figcaption>{{ website.siteName }}</figcaption>
                </figure>

                <label v-if="checkAIChatIsRestricted(website.siteName)" class="switch selected">
                    <input class="btnSwitch" type="checkbox" @click="
                        handleChangeRestriction(
                            website.siteName
                        )
                        " />
                </label>
                <label v-else class="switch">
                    <input class="btnSwitch" type="checkbox" @click="
                        handleChangeRestriction(
                            website.siteName
                        )
                        " />
                </label>
            </div>
        </section>
    </details>
</template>
